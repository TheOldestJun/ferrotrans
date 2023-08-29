import { Box, Typography } from "@mui/material";
import { VERSION } from "@/utilities/constants";
import main from "@/localization/main";
import { useSelector } from "react-redux";

const Footer = () => {
  const lang = useSelector((state) => state.lang.lang);
  return (
    <>
      <Box component="footer" p={1} bgcolor="primary.main">
        <Typography variant="body2" textAlign="center" color="white">
          {new Date().getFullYear()} &copy; T.O.J. Team <br />
          {lang ? main[lang].version : main.en.version} {VERSION}
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
