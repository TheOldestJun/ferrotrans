import { useMutation, useQueryClient } from "react-query";
import { deleteUser, register, editUser } from "@/services/users";
import { useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Confirm from "./Confirm";
import EditUser from "./EditUser";
import toast from "react-hot-toast";

const AdminPanel = ({ data, rolesData }) => {
  //delete
  const [showConfirm, setShowConfirm] = useState(false); //confirm delete modal
  const [id, setId] = useState(""); //id of user for deleting
  //new user
  const [email, setEmail] = useState(); //email of new user
  const [roleId, setRoleId] = useState(""); //role of new user
  const [password, setPassword] = useState(); //password of new user
  const [showNewUser, setShowNewUser] = useState(false); //new user combo box
  //edit user data
  const [showEditUser, setShowEditUser] = useState(false); //show edit user modal
  const [firstName, setFirstName] = useState(); //first name of user to edit
  const [lastName, setLastName] = useState(); //last name of user to edit
  const [emailEdit, setEmailEdit] = useState(); //email of user to edit
  const [avatarUrl, setAvatarUrl] = useState(); //avatar url of user to edit
  const [roleIdEdit, setRoleIdEdit] = useState(); //role id of user to edit
  const queryClient = useQueryClient();

  const { mutate: removeUser } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const { mutate: addUser } = useMutation({
    mutationFn: ({ email, password, roleId }) =>
      register(email, password, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User added");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const { mutate: editUserData } = useMutation({
    mutationFn: ({ firstName, lastName, email, password, roleId, avatarUrl }) =>
      editUser(firstName, lastName, email, password, roleId, avatarUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User edited");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const users = data.map((user) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={user.id}>
        <Card
          sx={{
            display: "flex",
            "&:hover": { boxShadow: 8 },
            flexDirection: "column",
            height: "100%",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography>{user.firstName}</Typography>
            <Typography>{user.lastName}</Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setShowEditUser(true);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setAvatarUrl(user.avatarUrl);
                setRoleIdEdit(user.roleId);
                setEmailEdit(user.email);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setShowConfirm(true);
                setId(user.id);
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  const roles = rolesData.map((role) => {
    return { label: role.title, value: role.id };
  });
  const handleCreateUser = () => {
    addUser({ email: email, password: password, roleId: roleId });
  };
  return (
    <Container sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        onClick={() => setShowNewUser(!showNewUser)}
        sx={{ width: "100%", mt: 2, mb: 2 }}
      >
        Create new user?
      </Button>
      {showNewUser && (
        <Grid item xs={12}>
          <Card
            sx={{
              display: "flex",
              "&:hover": { boxShadow: 8 },
              flexDirection: "column",
              height: "100%",
              mb: 2,
            }}
          >
            <CardContent>
              <Typography>{"New user"}</Typography>
              <TextField
                label="Email"
                fullWidth
                sx={{ mt: 1 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                sx={{ mt: 1 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Autocomplete
                sx={{ mt: 1 }}
                disablePortal
                options={roles}
                renderInput={(params) => <TextField {...params} label="Role" />}
                value={roleId}
                onChange={(e, value) => setRoleId(value.value)}
                inputValue={roleId}
                onInputChange={(e, value) => setRoleId(value.inputValue)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                onClick={handleCreateUser}
              >
                Create
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
      <Grid container spacing={2}>
        {users}
      </Grid>
      {showConfirm && (
        <Confirm
          message={"Are you sure you want to delete this user?"}
          confirm={"Delete"}
          cancel={"Cancel"}
          onConfirm={() => {
            removeUser(id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showEditUser && (
        <EditUser
          firstName={firstName}
          lastName={lastName}
          email={emailEdit}
          roleId={roleIdEdit}
          avatarUrl={avatarUrl}
          onCancel={() => setShowEditUser(false)}
          onConfirm={editUserData}
          roles={roles}
        />
      )}
    </Container>
  );
};

export default AdminPanel;
