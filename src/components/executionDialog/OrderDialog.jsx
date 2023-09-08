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

import axios from "axios";

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
}) => {
  const [amount, setAmount] = useState(defaultQuantity);
  const [price, setPrice] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(typeof price, typeof amount);
    const newPrice = parseFloat(price.replace(/,/, "."));
    let newAmount;
    if (typeof amount !== "number") {
      newAmount = parseFloat(amount.replace(/,/, "."));
    } else {
      newAmount = amount;
    }
    const resultPrice = (newPrice / newAmount).toFixed(2);
    try {
      await axios.post("/api/price/add", {
        amount: resultPrice,
        productId: productId,
      });
      onConfirm({ id: id, ordered: true, orderAmount: newAmount });
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
