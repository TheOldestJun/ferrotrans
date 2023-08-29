import Header from "./Header";
import Footer from "./Footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Container } from "@mui/material";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const [animationParent] = useAutoAnimate();
  return (
    <>
      <Toaster position="bottom-center" duration={4000} />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />
        <Box component="main" flexGrow={1} ref={animationParent}>
          {children}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
