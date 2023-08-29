import { Box, Card } from "@mui/material";
import OrderCardContent from "./OrderCardContent";
import OrderCardButtons from "./OrdersCardButtons";

const OrderCard = ({
  title,
  amount,
  doneAmount,
  units,
  product,
  productId,
  productType,
  ordered,
  orderedAt,
  done,
  doneAt,
  pending,
  role,
  onDelete,
  id,
  onEditAmount,
  onEditOrdered,
  onEditDone,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        "&:hover": { boxShadow: 8 },
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <OrderCardContent
          product={product}
          amount={amount}
          doneAmount={doneAmount}
          units={units}
          title={title}
          done={done}
          doneAt={doneAt}
          ordered={ordered}
          orderedAt={orderedAt}
        />
      </Box>

      <OrderCardButtons
        ordered={ordered}
        done={done}
        pending={pending}
        role={role}
        onDelete={onDelete}
        onEditAmount={onEditAmount}
        onEditOrdered={onEditOrdered}
        onEditDone={onEditDone}
        id={id}
        productId={productId}
        productType={productType}
        units={units}
        product={product}
        quantity={amount}
      />
    </Card>
  );
};

export default OrderCard;
