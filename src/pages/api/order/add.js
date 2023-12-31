import prisma from "../../../../prisma";
import { storeCorrectDate } from "@/utilities/helpers";

const addOrder = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { productId, unitId, amount, description, applicantId } = req.body;
  const today = new Date();
  const title = storeCorrectDate(today);

  try {
    const result = await prisma.order.create({
      data: {
        productId,
        unitId,
        amount,
        applicantId,
        title,
        description,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default addOrder;
