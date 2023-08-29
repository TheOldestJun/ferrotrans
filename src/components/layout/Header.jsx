import { AppBar, Toolbar, Typography } from "@mui/material";
import main from "@/localization/main";
import { useSelector } from "react-redux";

const Header = () => {
  const lang = useSelector((state) => state.lang.lang);
  return (
    <>
      <AppBar position="relative">
        <Toolbar align="center">
          <Typography variant="h6" align="center">
            {lang ? main[lang].scm : main.en.scm}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
