import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import main from "@/localization/main";
import toastLocals from "@/localization/toast";
import { useState } from "react";
import { auth } from "@/services/users";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  setLogin,
  setUserFirstName,
  setUserLastName,
  setUserRole,
  setUserId,
  setUserAvatarUrl,
} from "@/store/loginSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ForkRight } from "@mui/icons-material";

const Login = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const { push } = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await auth(email, password);
    if (!user.error) {
      dispatch(setLogin());
      dispatch(setUserFirstName(user.firstName));
      dispatch(setUserLastName(user.lastName));
      dispatch(setUserRole(user.role.title));
      dispatch(setUserId(user.id));
      dispatch(setUserAvatarUrl(user.avatarUrl));
      push(`/users/${user.role.title}`);
    } else {
      toast.error(toastLocals[lang].error);
    }
  };
  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();
    const user = await axios.put("/api/user/reset-password", {
      email,
      password: newPassword,
    });
    if (user.data.error) {
      toast.error(toastLocals[lang].error);
    } else {
      toast.success(toastLocals[lang].success);
    }
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {main[lang].signIn}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={main[lang].email}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={main[lang].password}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {main[lang].signIn}
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {main[lang].forgotPassword}
          </Link>
        </Box>
        {showPassword && (
          <Box component="form" onSubmit={handleSubmitNewPassword}>
            <TextField
              size="small"
              variant="standard"
              margin="normal"
              required
              id="email"
              label={main[lang].email}
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ ml: 6 }}
              size="small"
              variant="standard"
              margin="normal"
              required
              name="password"
              label={main[lang].newPasswordLabel}
              type="password"
              id="password"
              autoComplete="current-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              {main[lang].newPassword}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;
