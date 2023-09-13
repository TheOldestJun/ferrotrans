import { Container } from "@mui/material";
import OrderTable from "./OrderTable";
import { useQuery } from "react-query";
import Info from "./Info";
import main from "../localization/main";
import { getAllByUserId } from "@/services/orders";

const SupplyTable = ({ lang, userRole, applicantId }) => {
  const {
    data: ordersRaw,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["orders", applicantId],
    queryFn: () => getAllByUserId(applicantId),
  });
  return (
    <Container>
      {isLoadingOrders && <Info />}
      {ordersRaw && (
        <OrderTable
          data={ordersRaw}
          lang={lang}
          userRole={userRole}
          userId={applicantId}
        />
      )}
    </Container>
  );
};

export default SupplyTable;
