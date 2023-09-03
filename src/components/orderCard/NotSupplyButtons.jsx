import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import Confirm from "@/components/Confirm";
import main from "@/localization/main";
import orderCombo from "@/localization/orderCombo";

import { useSelector } from "react-redux";
import EditOrder from "../EditOrder";

const NotSupplyButtons = ({
  ordered,
  done,
  pending,
  disabled,
  onDelete,
  id,
  units,
  product,
  quantity,
  onEditAmount,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const lang = useSelector((state) => state.lang.lang);

  const handleEditAmount = (quantity) => {
    onEditAmount({ id: id, amount: quantity });
    setShowEdit(false);
  };
  const handleCancelEditAmount = () => {
    setShowEdit(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Tooltip title={main[lang].edit} placement="top" arrow>
        <span>
          <IconButton
            aria-label="edit"
            disabled={disabled || ordered || pending || done}
            onClick={() => setShowEdit(true)}
          >
            <EditNoteIcon fontSize="large" color="warning" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={main[lang].delete} placement="top" arrow>
        <span>
          <IconButton
            aria-label="delete"
            disabled={disabled}
            onClick={() => setShowConfirm(true)}
          >
            <DeleteForeverIcon fontSize="large" color="error" />
          </IconButton>
        </span>
      </Tooltip>
      {showConfirm && (
        <Confirm
          message={main[lang].confirmMessage}
          confirm={main[lang].confirm}
          cancel={main[lang].cancel}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {showEdit && (
        <EditOrder
          message={main[lang].editMessage}
          cancel={main[lang].cancel}
          confirm={main[lang].confirm}
          label={orderCombo[lang].amount}
          onConfirm={handleEditAmount}
          onCancel={handleCancelEditAmount}
          units={units}
          product={product}
          quantity={quantity}
        />
      )}
    </>
  );
};

export default NotSupplyButtons;
