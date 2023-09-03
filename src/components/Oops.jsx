import { Typography, Box, Modal } from "@mui/material";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

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
  textAlign: "center",
};

const Oops = () => {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 3000);
  });

  return (
    <>
      <Modal
        open={true}
        aria-label="modal-logged-out"
        aria-description="you logged out"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Looks like you logged out!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Redirecting to <Link href="/">login page</Link>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Oops;
