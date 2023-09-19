import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from "@mui/material";
import main from "@/localization/main";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Confirm from "../Confirm";
import { setLogout } from "@/store/loginSlice";

const Header = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.lang);
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const avatarUrl = useSelector((state) => state.login.avatarUrl);

  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };
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
          <Tooltip
            title={lang ? main[lang].logout : main.en.logout}
            placement="bottom"
            arrow
          >
            <IconButton
              onClick={() => {
                setShowDialog(true);
              }}
            >
              {avatarUrl ? (
                <Avatar src={avatarUrl} sx={{ ml: 2 }} />
              ) : (
                <Avatar
                  sx={{ ml: 2 }}
                >{`${firstName[0]}${lastName[0]}`}</Avatar>
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {showDialog && (
        <Confirm
          message={main[lang].confirmMessage}
          confirm={main[lang].confirm}
          cancel={main[lang].cancel}
          onConfirm={handleLogout}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Header;
