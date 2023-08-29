import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLang } from "@/store/langSlice";
import { useState } from "react";

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

const LangOptions = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [welcome, setWelcome] = useState("Please select your language");

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            {welcome}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              variant="text"
              aria-label="language selection buttons"
              size="large"
              gap="1px"
            >
              <Button
                sx={{ mx: "10px" }}
                aria-label="ukrainian language"
                onClick={() => {
                  dispatch(setLang("ua"));
                  setOpen(false);
                }}
                onMouseEnter={() => {
                  setWelcome("Оберіть мову");
                }}
              >
                UA
              </Button>
              <Button
                sx={{ mx: "10px" }}
                aria-label="english language"
                onClick={() => {
                  dispatch(setLang("en"));
                  setOpen(false);
                }}
                onMouseEnter={() => {
                  setWelcome("Select your language");
                }}
              >
                EN
              </Button>
              <Button
                sx={{ mx: "10px" }}
                aria-label="russian language"
                onClick={() => {
                  dispatch(setLang("ru"));
                  setOpen(false);
                }}
                onMouseEnter={() => {
                  setWelcome("Выберите язык");
                }}
              >
                RU
              </Button>
              <Button
                sx={{ mx: "10px" }}
                aria-label="polish language"
                onClick={() => {
                  dispatch(setLang("pl"));
                  setOpen(false);
                }}
                onMouseEnter={() => {
                  setWelcome("Wybierz język");
                }}
              >
                PL
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LangOptions;
