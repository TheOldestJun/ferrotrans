import {
  Typography,
  Box,
  Modal,
  Button,
  Stack,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
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

const OrderDialog = ({
  productName,
  defaultUnits,
  defaultQuantity,
  amountLabel,
  priceLabel,
  onCancel,
  onConfirm,
  confirm,
  cancel,
  id,
  productId,
  error,
}) => {
  const [amount, setAmount] = useState(parseFloat(defaultQuantity));
  const [price, setPrice] = useState(0.0);
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const fullName = `${firstName} ${lastName}`;
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newPrice;
    if (typeof price !== "number") {
      newPrice = parseFloat(price.replace(/,/, "."));
      if (!newPrice) {
        onCancel();
        toast.error(error);
        return;
      }
    } else {
      newPrice = amount;
    }

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
    const resultPrice = (newPrice / newAmount).toFixed(2);
    try {
      await axios.post("/api/price/add", {
        amount: resultPrice,
        productId: productId,
      });
      onConfirm({
        id: id,
        ordered: true,
        orderAmount: newAmount,
        orderedBy: fullName,
      });
    } catch (error) {
      alert(error.message);
    }
    onCancel();
  };

  return (
    <>
      <Modal open={true} aria-label="modal-info" aria-description="info">
        <Box sx={style}>
          <Typography
            component="h1"
            variant="h5"
            textAlign={"center"}
            color={"primary"}
          >
            {productName}
          </Typography>
          <Divider sx={{ mb: 2, pb: 2 }} />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <TextField fullWidth label={defaultUnits} disabled />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label={amountLabel}
                  autoFocus
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={priceLabel}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Stack direction="row" spacing={2} justifyContent={"center"} mt={2}>
              <Button variant="outlined" type="submit">
                {confirm}
              </Button>
              <Button variant="outlined" onClick={onCancel}>
                {cancel}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OrderDialog;
