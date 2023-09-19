import { IconButton, Tooltip } from "@mui/material";
//order icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
//done icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import { useSelector } from "react-redux";
import { useState } from "react";

import main from "@/localization/main";
import OrderDialog from "../executionDialog/OrderDialog";
import DoneDialog from "../executionDialog/DoneDialog";
import Confirm from "../Confirm";
import toastLocals from "@/localization/toast";

const SupplyButtons = ({
  ordered,
  orderAmount,
  pending,
  done,
  disabled,
  product,
  productType,
  units,
  onEditOrdered,
  onEditDone,
  quantity,
  id,
  productId,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    setShowDialog(false);
  };
  const handleCancelDone = () => {
    setShowConfirm(false);
  };

  const lang = useSelector((state) => state.lang.lang);
  return (
    <>
      <Tooltip title={main[lang].ordered} placement="top" arrow>
        <span>
          <IconButton
            aria-label="order"
            disabled={disabled || done}
            onClick={() => setShowDialog(true)}
          >
            {ordered ? (
              <AccessTimeFilledIcon fontSize="large" color="success" />
            ) : (
              <AccessTimeIcon fontSize="large" color="success" />
            )}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={main[lang].done} placement="top" arrow>
        <span>
          <IconButton
            aria-label="done"
            disabled={disabled || done || !ordered}
            onClick={() => setShowConfirm(true)}
          >
            {done ? (
              <CheckCircleIcon fontSize="large" color="success" />
            ) : pending ? (
              <PublishedWithChangesIcon fontSize="large" color="warning" />
            ) : (
              <CheckCircleOutlineIcon fontSize="large" color="primary" />
            )}
          </IconButton>
        </span>
      </Tooltip>
      {showDialog && (
        <OrderDialog
          productName={product}
          defaultUnits={units}
          defaultQuantity={quantity}
          confirm={main[lang].confirm}
          cancel={main[lang].cancel}
          amountLabel={main[lang].amountLabel}
          priceLabel={main[lang].priceLabel}
          onCancel={handleCancel}
          onConfirm={onEditOrdered}
          id={id}
          productId={productId}
          error={toastLocals[lang].errorNoNumber}
        />
      )}
      {showConfirm && (
        <DoneDialog
          productName={product}
          productId={productId} // id of the product
          productType={productType} // type of product KITCHEN or OTHER
          defaultUnits={units}
          orderAmount={orderAmount}
          confirm={main[lang].confirm}
          cancel={main[lang].cancel}
          amountLabel={main[lang].amountLabel}
          priceLabel={main[lang].priceLabel}
          onCancel={handleCancelDone}
          onConfirm={onEditDone}
          id={id} //order id
        />
      )}
    </>
  );
};

export default SupplyButtons;
