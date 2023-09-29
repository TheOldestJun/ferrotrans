import { useQuery } from "react-query";
import { getAllOther } from "../../services/product";
import { getAllByUserId } from "@/services/orders";
import ProductComboBox from "@/components/ProductComboBox";
import OrderTable from "@/components/OrderTable";
import DoneOrderTable from "@/components/DoneOrderTable";
import prisma from "../../../prisma";
import Info from "@/components/Info";
import ceo from "@/localization/ceo";
import { Box, Tab, Container } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Type } from "@prisma/client";
import Oops from "@/components/Oops";

const CEO = ({ units }) => {
  const login = useSelector((state) => state.login.login);
  const lang = useSelector((state) => state.lang.lang);
  const userId = useSelector((state) => state.login.userId);
  const userRole = useSelector((state) => state.login.role);
  const [tab, setTab] = useState("1");
  // products that are not for kitchen use
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllOther,
  });
  // orders not for kitchen use
  const {
    data: ordersRaw,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getAllByUserId(userId),
  });

  if (!login) {
    return <Oops />;
  }
  return (
    <Container>
      {isLoading && <Info />}

      {isLoadingOrders && <Info />}

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, BorderColor: "divider" }}>
          <TabList
            aria-label="tasks selector"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={ceo[lang].createOrder} value="1" />
            <Tab label={ceo[lang].doneOrders} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {products && (
            <ProductComboBox
              data={products}
              units={units}
              type={Type.OTHER}
              lang={lang}
            />
          )}
          {ordersRaw && (
            <OrderTable
              data={ordersRaw}
              lang={lang}
              userRole={userRole}
              userId={userId}
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {ordersRaw && (
            <DoneOrderTable
              data={ordersRaw}
              lang={lang}
              userRole={userRole}
              userId={userId}
            />
          )}
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default CEO;

export const getServerSideProps = async () => {
  const units = await prisma.unit.findMany();
  return {
    props: {
      units,
    },
  };
};
