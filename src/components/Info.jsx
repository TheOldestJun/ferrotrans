import { Container, Modal, Box, CircularProgress } from "@mui/material";

const Info = ({ message }) => {
  return (
    <Container>
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 10,
          opacity: 0.5,
        }}
      />
    </Container>
  );
};

export default Info;
