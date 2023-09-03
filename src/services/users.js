import axios from "axios";
import toast from "react-hot-toast";

export const auth = async (email, password) => {
  const result = await axios.post("/api/user/auth", {
    email: email,
    password: password,
  });
  if (result.data.error === "Invalid email") {
    toast.error("Invalid email");
  }
  if (result.data.error === "Invalid password") {
    toast.error("Invalid password");
  }
  return result.data;
};

export const editUser = async (
  firstName = "Неизвестный",
  lastName = "Пользователь",
  email,
  password,
  roleId,
  avatarUrl = "/img/user.png"
) => {
  if (!email) {
    toast.error("Invalid email");
    return;
  }
  const result = await axios.put("/api/user/edit", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    roleId: roleId,
    avatarUrl: avatarUrl,
  });
  !result ? toast.error("Error") : toast.success("User edited");
  return result.data;
};
export const resetPassword = async (email, password) => {
  const result = await axios.post("/api/user/reset-password", {
    email: email,
    password: password,
  });
  if (result.data.error === "User not found") {
    toast.error("Invalid email");
  }
  return result.data;
};

export const register = async (
  email,
  password,
  roleId,
  firstName,
  lastName
) => {
  const result = await axios.post("/api/user/register", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    roleId: roleId,
  });
  if (result.data.error === "Invalid data") {
    toast.error("Data error!");
  }
  return result.data;
};

export const getAllUsers = async () => {
  try {
    const result = await axios.get("/api/user/get-all");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await axios.delete(`/api/user/delete/?id=${id}`);
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};
