import { Box } from "@mui/material";

import SupplyButtons from "./SupplyButtons";
import NotSupplyButtons from "./NotSupplyButtons";

const OrderCardButtons = ({
  ordered,
  orderAmount,
  done,
  pending,
  role,
  onDelete,
  onEditAmount,
  onEditOrdered,
  onEditDone,
  id,
  productId,
  productType,
  units,
  product,
  quantity,
  onAccept,
}) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, mt: "auto" }}
    >
      <SupplyButtons
        ordered={ordered}
        orderAmount={orderAmount}
        done={done}
        pending={pending}
        disabled={role !== "supply" ? true : false}
        id={id}
        productId={productId}
        onEditOrdered={onEditOrdered}
        onEditDone={onEditDone}
        units={units}
        product={product}
        quantity={quantity}
        productType={productType}
      />
      <NotSupplyButtons
        ordered={ordered}
        done={done}
        pending={pending}
        disabled={role === "supply" ? true : false}
        onDelete={onDelete}
        onEditAmount={onEditAmount}
        id={id}
        units={units}
        product={product}
        quantity={quantity}
        onAccept={onAccept}
      />
    </Box>
  );
};

export default OrderCardButtons;
