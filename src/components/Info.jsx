import { Modal, CircularProgress } from "@mui/material";

const Info = ({ message }) => {
  return (
    <>
      <Modal
        open={true}
        aria-label="modal-info"
        aria-description="info"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#d2d6d3",
          opacity: "0.2",
        }}
      >
        <CircularProgress />
      </Modal>
    </>
  );
};

export default Info;
