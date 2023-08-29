import axios from "axios";
import toast from "react-hot-toast";

export const getAllOrders = async () => {
  try {
    const result = await axios.get("/api/order/get-all");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getAllByUserId = async (userId) => {
  try {
    const result = await axios.get(
      `/api/order/get-all-by-user-id/?id=${userId}`
    );
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createOrder = async (productId, unitId, amount, applicantId) => {
  try {
    const result = await axios.post("/api/order/add", {
      productId,
      unitId,
      amount,
      applicantId,
    });
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteOder = async (id) => {
  try {
    const result = await axios.delete(`/api/order/delete/?id=${id}`);
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateOrderAmount = async (id, amount) => {
  try {
    const result = await axios.put(
      `/api/order/edit-amount/?id=${id}&amount=${amount}`
    );
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateOrderOrdered = async (id, ordered) => {
  try {
    const result = await axios.put(`/api/order/edit-ordered/`, {
      id,
      ordered,
    });
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateOrderDone = async (id, productType, productId, amount) => {
  try {
    const result = await axios.put(`/api/order/edit-done/`, {
      id,
      productType,
      productId,
      amount,
    });
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};
