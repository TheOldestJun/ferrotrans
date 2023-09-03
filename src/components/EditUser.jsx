import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Stack,
  Button,
  Autocomplete,
} from "@mui/material";

import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const EditUser = ({
  firstName,
  lastName,
  email,
  roleId,
  roles,
  avatarUrl,
  onConfirm,
  onCancel,
}) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPassword, setNewPassword] = useState("");
  const [newRoleId, setNewRoleId] = useState(roleId);
  const [newAvatarUrl, setNewAvatarUrl] = useState(avatarUrl);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      newFirstName,
      newLastName,
      newPassword,
      newRoleId,
      newAvatarUrl
    );
    onConfirm({
      firstName: newFirstName,
      lastName: newLastName,
      email: email,
      password: newPassword,
      roleId: newRoleId,
      avatarUrl: newAvatarUrl,
    });
    onCancel();
  };
  return (
    <Modal open={true} aria-label="modal-info" aria-description="info">
      <Box sx={style}>
        <Typography
          component="h1"
          variant="h5"
          textAlign={"center"}
          color={"primary"}
        >
          {"Edit user..."}
        </Typography>
        <Divider sx={{ mb: 2, pb: 2 }} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label={email} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={"New password"}
                autoFocus
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={"New first name"}
                autoFocus
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={"New last name"}
                autoFocus
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                sx={{ mt: 1 }}
                options={roles}
                renderInput={(params) => <TextField {...params} label="Role" />}
                value={newRoleId}
                onChange={(e, value) => setNewRoleId(value.value)}
                inputValue={newRoleId}
                onInputChange={(e, value) => setNewRoleId(value.inputValue)}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack direction="row" spacing={2} justifyContent={"center"} mt={2}>
            <Button variant="outlined" type="submit">
              {"Confirm"}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              {"Cancel"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUser;
