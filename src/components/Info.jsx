import { Typography, Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Info = ({ message }) => {
  return (
    <>
      <Modal open={true} aria-label="modal-info" aria-description="info">
        <Box sx={style}>
          <Typography
            id="modal-info"
            variant="h6"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {message}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Info;
