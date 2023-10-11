import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useState } from "react";
import Confirm from "@/components/Confirm";
import main from "@/localization/main";
import toastLocals from "@/localization/toast";
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
  onAccept,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const lang = useSelector((state) => state.lang.lang);
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const fullName = `${firstName} ${lastName}`;

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

  const handleConfirmAccept = () => {
    onAccept({ id: id, acceptedBy: fullName });
    setShowAccept(false);
  };

  const handleCancelAccept = () => {
    setShowAccept(false);
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
      {pending && (
        <Tooltip title={main[lang].accept} placement="top" arrow>
          <span>
            <IconButton
              aria-label="accept"
              disabled={disabled}
              onClick={() => setShowAccept(true)}
              hidden={true}
            >
              <TaskAltIcon fontSize="large" color="secondary" />
            </IconButton>
          </span>
        </Tooltip>
      )}
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
          error={toastLocals[lang].errorNoNumber}
        />
      )}
      {showAccept && (
        <Confirm
          message={main[lang].confirmMessage}
          confirm={main[lang].confirm}
          cancel={main[lang].cancel}
          onConfirm={handleConfirmAccept}
          onCancel={handleCancelAccept}
        />
      )}
    </>
  );
};

export default NotSupplyButtons;
