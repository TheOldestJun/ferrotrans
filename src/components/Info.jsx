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
        }}
      >
        <CircularProgress />
      </Modal>
    </>
  );
};

export default Info;
