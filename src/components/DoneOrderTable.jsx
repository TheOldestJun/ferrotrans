import DoneOrderCard from "./orderCard/DoneOrderCard";
import { Grid } from "@mui/material";
import { formatDate } from "@/utilities/helpers";
import { deleteOder } from "@/services/orders";

import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import toastLocals from "@/localization/toast";

const DoneOrderTable = ({ data, lang, userId }) => {
  const queryClient = useQueryClient();
  const { mutate: removeOrder } = useMutation({
    mutationFn: (id) => deleteOder(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["doneOrders"]);
      queryClient.invalidateQueries(["orders", userId]);
      toast.success(toastLocals[lang].removeOrder);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });
  const doneOrderCards = data.map((order) => {
    if (order.done) {
      return (
        <Grid item xs={12} key={order.id}>
          <DoneOrderCard
            firstName={order.applicant.firstName}
            lastName={order.applicant.lastName}
            lang={lang}
            id={order.id}
            title={formatDate(order.title, lang)}
            orderedAt={formatDate(order.orderedAt, lang)}
            doneAt={formatDate(order.doneAt, lang)}
            product={order.product.name}
            description={order.description}
            amount={order.amount}
            orderAmount={order.orderAmount}
            doneAmount={order.doneAmount}
            orderBy={order.orderedBy}
            doneBy={order.doneBy}
            acceptedBy={order.acceptedBy}
            onDelete={removeOrder}
            units={order.units[lang]}
          />
        </Grid>
      );
    }
  });
  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {doneOrderCards}
    </Grid>
  );
};

export default DoneOrderTable;
