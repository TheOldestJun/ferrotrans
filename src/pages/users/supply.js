import {
  Box,
  Tab,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllKitchen } from "../../services/product";
import supply from "@/localization/supply";
import prisma from "../../../prisma";
import SupplyTable from "@/components/SupplyTable";
import Oops from "@/components/Oops";
import DebitTable from "@/components/DebitTable";

const Supply = ({ appsNames }) => {
  const lang = useSelector((state) => state.lang.lang);
  const userRole = useSelector((state) => state.login.role);
  const login = useSelector((state) => state.login.login);
  const [orderTable, showOrdersTable] = useState(false);
  const [tab, setTab] = useState("1");
  const [applicantId, setApplicantId] = useState("");
  const [applicantRole, setApplicantRole] = useState("");
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllKitchen,
  });
  if (!login) {
    return <Oops />;
  }
  const cards = appsNames.map((app) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
        <CardActionArea
          onClick={() => {
            setApplicantId(app.id);
            setApplicantRole(app.role.title);
            showOrdersTable(true);
          }}
        >
          <Card variant="outlined" sx={{ ":hover": { boxShadow: 5 } }}>
            <CardContent>
              <Typography variant="h4" align="center">
                {app.lastName}
              </Typography>
              <Typography variant="h5" align="center">
                {app.firstName}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
              >{`${supply[lang]["total"]} ${app.orderCount} ${supply[lang]["orders"]}`}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    );
  });
  return (
    <Container>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, BorderColor: "divider" }}>
          <TabList
            aria-label="tasks selector"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={supply[lang].order} value="1" />
            <Tab label={supply[lang].debit} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {orderTable ? (
            <>
              <Stack spacing={4}>
                <Button
                  size="large"
                  onClick={() => {
                    showOrdersTable(false);
                  }}
                >
                  {supply[lang]["back"]}
                </Button>
                <SupplyTable
                  lang={lang}
                  userRole={userRole}
                  applicantId={applicantId}
                />
              </Stack>
            </>
          ) : (
            <Grid container spacing={2}>
              {cards}
            </Grid>
          )}
        </TabPanel>
        <TabPanel value="2">
          <DebitTable data={products} lang={lang} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default Supply;

export const getServerSideProps = async () => {
  const applicants = await prisma.order.groupBy({
    by: ["applicantId"],
    _count: {
      productId: true,
    },
  });

  let appsNames = [];
  for (let app of applicants) {
    const name = await prisma.user.findUnique({
      where: {
        id: app.applicantId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: {
          select: {
            title: true,
          },
        },
      },
    });
    name.orderCount = app._count.productId;
    appsNames.push(name);
  }

  return {
    props: {
      appsNames,
    },
  };
};
