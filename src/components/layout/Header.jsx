import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import main from "@/localization/main";
import { useSelector } from "react-redux";

const Header = () => {
  const lang = useSelector((state) => state.lang.lang);
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const avatarUrl = useSelector((state) => state.login.avatarUrl);
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {lang ? main[lang].scm : main.en.scm}
          </Typography>
          <Typography variant="h6" align="center">
            {`${firstName ? firstName : ""} ${lastName ? lastName : ""}`}
          </Typography>
          {avatarUrl ? (
            <Avatar src={avatarUrl} sx={{ ml: 2 }} />
          ) : (
            <Avatar sx={{ ml: 2 }}>{`${firstName[0]}${lastName[0]}`}</Avatar>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
