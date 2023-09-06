import prisma from "../../../../prisma";
import { storeCorrectDate } from "@/utilities/helpers";

const addOrder = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { productId, unitId, amount, applicantId } = req.body;
  const today = new Date();
  const title = storeCorrectDate(today);
  const newAmount = parseFloat(amount.replace(/,/, "."));

  try {
    const result = await prisma.order.create({
      data: {
        productId,
        unitId,
        amount: newAmount,
        applicantId,
        title,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default addOrder;
