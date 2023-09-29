import OrderCard from "./orderCard/OrderCard";
import { Container, Grid } from "@mui/material";
import { formatDate } from "@/utilities/helpers";
import {
  deleteOder,
  updateOrderAmount,
  updateOrderDone,
  updateOrderOrdered,
} from "@/services/orders";

import { useMutation, useQueryClient } from "react-query";
import toastLocals from "@/localization/toast";
import { toast } from "react-hot-toast";

const OrderTable = ({ data, lang, userRole, userId }) => {
  const queryClient = useQueryClient();

  const { mutate: removeOrder } = useMutation({
    mutationFn: (id) => deleteOder(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userId]);
      toast.success(toastLocals[lang].removeOrder);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });

  const { mutate: updateAmount } = useMutation({
    mutationFn: ({ id, amount }) => updateOrderAmount(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userId]);
      toast.success(toastLocals[lang].updateAmount);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });

  const { mutate: updateOrdered } = useMutation({
    mutationFn: ({ id, ordered, orderAmount, orderedBy }) =>
      updateOrderOrdered(id, ordered, orderAmount, orderedBy),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userId]);
      toast.success(toastLocals[lang].updateOrdered);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });

  const { mutate: updateDone } = useMutation({
    mutationFn: ({ id, productType, productId, amount, doneBy }) =>
      updateOrderDone(id, productType, productId, amount, doneBy),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userId]);
      queryClient.invalidateQueries(["products"]);
      toast.success(toastLocals[lang].updateDone);
    },
    onError: () => {
      toast.error(toastLocals[lang].error);
    },
  });
  const orderCards = data.map((order) => {
    if (!order.done) {
      return (
        <Grid item xs={12} sm={6} md={4} key={order.id}>
          <OrderCard
            key={order.id}
            id={order.id}
            amount={order.amount}
            description={order.description}
            doneAmount={order.doneAmount}
            orderAmount={order.orderAmount}
            done={order.done}
            pending={order.pending}
            doneAt={formatDate(order.doneAt, lang)}
            ordered={order.ordered}
            orderedAt={formatDate(order.orderedAt, lang)}
            product={order.product.name}
            title={formatDate(order.title, lang)}
            productId={order.product.id}
            productType={order.product.type}
            units={order.units[lang]}
            role={userRole}
            onDelete={removeOrder}
            onEditAmount={updateAmount}
            onEditOrdered={updateOrdered}
            onEditDone={updateDone}
          />
        </Grid>
      );
    }
  });
  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {orderCards}
    </Grid>
  );
};

export default OrderTable;
