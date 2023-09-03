import axios from "axios";
import toast from "react-hot-toast";

export const getAll = async () => {
  try {
    const result = await axios.get("/api/product/get-all");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getAllKitchen = async () => {
  try {
    const result = await axios.get("/api/product/get-all-kitchen");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getAllOther = async () => {
  try {
    const result = await axios.get("/api/product/get-all-other");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createProduct = async (name, unitId, type) => {
  try {
    const result = await axios.post("/api/product/add", {
      name,
      unitId,
      type,
    });
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const editQuantity = async (id, amount) => {
  try {
    const result = await axios.put(
      `/api/product/edit-quantity/?id=${id}&amount=${amount}`
    );
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};
