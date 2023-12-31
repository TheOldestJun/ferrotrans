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

export const getAppsNames = async () => {
  try {
    const result = await axios.get("/api/order/get-apps-names");
    return result.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createOrder = async (
  productId,
  unitId,
  amount,
  description,
  applicantId
) => {
  try {
    const result = await axios.post("/api/order/add", {
      productId,
      unitId,
      amount,
      description,
      applicantId,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteOder = async (id) => {
  try {
    const result = await axios.delete(`/api/order/delete/?id=${id}`);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrderAmount = async (id, amount) => {
  try {
    const result = await axios.put(
      `/api/order/edit-amount/?id=${id}&amount=${amount}`
    );
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrderOrdered = async (
  id,
  ordered,
  orderAmount,
  orderedBy
) => {
  try {
    const result = await axios.put(`/api/order/edit-ordered/`, {
      id,
      ordered,
      orderAmount,
      orderedBy,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrderDone = async (
  id,
  productType,
  productId,
  amount,
  doneBy
) => {
  try {
    const result = await axios.put(`/api/order/edit-done/`, {
      id,
      productType,
      productId,
      amount,
      doneBy,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAccepted = async (id, acceptedBy) => {
  try {
    const result = await axios.put(`/api/order/edit-accept/`, {
      id,
      acceptedBy,
    });
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
