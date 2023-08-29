import { useQuery } from "react-query";
import { getAll } from "@/services/product";
import { getAllOrders } from "@/services/orders";
import Info from "@/components/Info";
import admin from "@/localization/admin";
import main from "@/localization/main";
import { Box, Tab, Container, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useState } from "react";

const AdminPanel = () => {
  const lang = useSelector((state) => state.lang.lang);
  const userId = useSelector((state) => state.login.userId);
  const userRole = useSelector((state) => state.login.role);
  const [tab, setTab] = useState("1");
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAll,
  });
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  return (
    <Container>
      {isLoadingProducts && <Info message={main[lang].loading} />}
      {isErrorProducts && <Info message={main[lang].error} />}
      {isLoadingOrders && <Info message={main[lang].loading} />}
      {isErrorOrders && <Info message={main[lang].error} />}
      <Typography
        variant="h5"
        align="center"
        color={"error"}
        sx={{ mt: 2, mb: 2 }}
      >
        {admin[lang]["adminMessage"]}
      </Typography>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, BorderColor: "divider" }}>
          <TabList
            aria-label="tasks selector"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={admin[lang]["editProducts"]} value="1" />
            <Tab label={admin[lang]["editOrders"]} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">PRODUCT TABLE</TabPanel>
        <TabPanel value="2">ORDERS TABLE</TabPanel>
      </TabContext>
    </Container>
  );
};

export default AdminPanel;
