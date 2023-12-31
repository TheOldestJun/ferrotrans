import {
  Typography,
  Box,
  Modal,
  Button,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";

import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditOrder = ({
  message,
  confirm,
  cancel,
  onConfirm,
  onCancel,
  units,
  product,
  label,
  quantity,
  error,
}) => {
  const [amount, setAmount] = useState(quantity);

  const updateAmount = () => {
    let newAmount;
    if (typeof amount !== "number") {
      newAmount = parseFloat(amount.replace(/,/, "."));
      if (!newAmount) {
        onCancel();
        toast.error(error);
        return;
      }
    } else {
      newAmount = amount;
    }
    onConfirm(newAmount);
  };
  return (
    <>
      <Modal open={true} aria-label="modal-info" aria-description="info">
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h5"
            color={"info.dark"}
          >
            {message}
          </Typography>
          <Divider sx={{ mb: 2, pb: 2 }} />
          <Typography
            sx={{ textAlign: "center" }}
            variant="h5"
            color={"info.light"}
          >
            {product} - {units}
          </Typography>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="amount"
            value={amount}
            onChange={(e) => {
              e.preventDefault();
              setAmount(e.target.value);
            }}
            label={label}
            type="text"
            variant="standard"
          />
          <Stack direction="row" spacing={2} justifyContent={"center"} mt={2}>
            <Button variant="outlined" onClick={updateAmount}>
              {confirm}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              {cancel}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default EditOrder;
