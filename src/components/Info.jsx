import { Container, Modal, Box, CircularProgress } from "@mui/material";

const Info = ({ message }) => {
  return (
    <CircularProgress
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 10,
      }}
    />
  );
};

export default Info;
