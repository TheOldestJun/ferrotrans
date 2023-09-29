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
import { getAppsNames, getAllOrders } from "@/services/orders";
import supply from "@/localization/supply";
import SupplyTable from "@/components/SupplyTable";
import Oops from "@/components/Oops";
import DebitTable from "@/components/DebitTable";
import DoneOrderTable from "@/components/DoneOrderTable";
import Info from "@/components/Info";

const Supply = () => {
  const lang = useSelector((state) => state.lang.lang);
  const userRole = useSelector((state) => state.login.role);
  const login = useSelector((state) => state.login.login);
  const [orderTable, showOrdersTable] = useState(false);
  const [tab, setTab] = useState("1");
  const [applicantId, setApplicantId] = useState("");
  const [applicantRole, setApplicantRole] = useState("");
  const [applicantName, setApplicantName] = useState("");

  const {
    data: appsNames,
    isLoading: appsLoading,
    isError: appsError,
  } = useQuery({
    queryKey: ["appsNames"],
    queryFn: getAppsNames,
  });

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllKitchen,
  });

  const { data: doneOrders } = useQuery({
    queryKey: ["doneOrders"],
    queryFn: getAllOrders,
  });

  if (!login) {
    return <Oops />;
  }
  let cards = [];
  if (appsNames) {
    cards = appsNames.map((app) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
          <CardActionArea
            onClick={() => {
              setApplicantId(app.id);
              setApplicantRole(app.role.title);
              setApplicantName(`${app.firstName} ${app.lastName}`);
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
  }

  return (
    <Container>
      {appsLoading && <Info />}

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
            <Tab label={supply[lang].dones} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {orderTable ? (
            <>
              <Typography
                variant="h4"
                align="center"
                color="primary.dark"
                sx={{ mb: 2 }}
              >
                {applicantName}
              </Typography>
              <Stack spacing={4}>
                <Button
                  size="large"
                  variant="outlined"
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
        <TabPanel value="3">
          <DoneOrderTable data={doneOrders} lang={lang} userRole={userRole} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default Supply;
