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

const DebitDialog = ({
  productId,
  debitQuestion,
  confirm,
  cancel,
  editLabel,
  onCancel,
  onEdit,
}) => {
  const [amount, setAmount] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit({
      id: productId,
      amount: amount,
    });
    onCancel();
  };
  return (
    <Modal open={true} aria-label="modal-info" aria-description="info">
      <Box sx={style}>
        <Typography
          component="h1"
          variant="h5"
          textAlign={"center"}
          color={"primary"}
        >
          {debitQuestion}
        </Typography>
        <Divider sx={{ mb: 2, pb: 2 }} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label={editLabel}
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

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
  );
};

export default DebitDialog;
