import { useQuery } from "react-query";
import { getAllKitchen } from "../../services/product";
import { getAllByUserId } from "@/services/orders";
import ProductComboBox from "@/components/ProductComboBox";
import OrderTable from "@/components/OrderTable";
import DebitTable from "@/components/DebitTable";
import prisma from "../../../prisma";
import Info from "@/components/Info";
import main from "@/localization/main";
import kitchen from "@/localization/kitchen";
import {
  Box,
  Tab,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Type } from "@prisma/client";
import Oops from "@/components/Oops";

const Kitchen = ({ units, prods }) => {
  const login = useSelector((state) => state.login.login);
  const lang = useSelector((state) => state.lang.lang);
  const userId = useSelector((state) => state.login.userId);
  const userRole = useSelector((state) => state.login.role);
  const [tab, setTab] = useState("1");
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllKitchen,
  });
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
  const productTable = prods.map((product) => {
    if (product.quantity > 0) {
      return (
        <TableRow
          key={product.id}
          sx={{ ":hover": { boxShadow: 1, bgcolor: "#dcedf5" } }}
        >
          <TableCell>{product.name}</TableCell>
          <TableCell align="center">{product.units[lang]}</TableCell>
          <TableCell align="center">{product.currentPrice}</TableCell>
          <TableCell align="center">{product.average}</TableCell>
          <TableCell align="center">{product.quantity}</TableCell>
        </TableRow>
      );
    }
  });

  return (
    <Container>
      {isLoading && <Info message={main[lang].loading} />}
      {isError && <Info message={main[lang].error} />}
      {isLoadingOrders && <Info message={main[lang].loading} />}
      {isErrorOrders && <Info message={main[lang].error} />}
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, BorderColor: "divider" }}>
          <TabList
            aria-label="tasks selector"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={kitchen[lang].createOrder} value="1" />
            <Tab label={kitchen[lang].myOrders} value="2" />
            <Tab label={kitchen[lang].allProducts} value="3" />
            <Tab label={kitchen[lang].debit} value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {products && (
            <ProductComboBox
              data={products}
              units={units}
              type={Type.KITCHEN}
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
            <OrderTable
              data={ordersRaw}
              lang={lang}
              userRole={userRole}
              userId={userId}
            />
          )}
        </TabPanel>
        <TabPanel value="3">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{kitchen[lang].name}</TableCell>
                  <TableCell align="center">{kitchen[lang].units}</TableCell>
                  <TableCell align="center">
                    {kitchen[lang].currentPrice}
                  </TableCell>
                  <TableCell align="center">
                    {kitchen[lang].averagePrice}
                  </TableCell>
                  <TableCell align="center">{kitchen[lang].quantity}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{productTable}</TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="4">
          <DebitTable data={products} lang={lang} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default Kitchen;

export const getServerSideProps = async () => {
  const units = await prisma.unit.findMany();
  const prods = await prisma.product.findMany({
    where: {
      type: Type.KITCHEN,
    },
    select: {
      id: true,
      name: true,
      average: true,
      currentPrice: true,
      quantity: true,
      units: {
        select: {
          ua: true,
          ru: true,
          en: true,
          pl: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return {
    props: {
      units,
      prods,
    },
  };
};
