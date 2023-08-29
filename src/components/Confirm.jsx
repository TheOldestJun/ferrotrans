import { Typography, Box, Modal, Button, Stack, Divider } from "@mui/material";

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

const Confirm = ({ message, confirm, cancel, onConfirm, onCancel }) => {
  return (
    <>
      <Modal open={true} aria-label="modal-info" aria-description="info">
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ textAlign: "center" }}
            variant="h5"
            color={"error"}
          >
            {message}
          </Typography>
          <Divider sx={{ mb: 3, pb: 2 }} />
          <Stack direction="row" spacing={2} justifyContent={"center"} mt={2}>
            <Button variant="outlined" onClick={onConfirm}>
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

export default Confirm;
