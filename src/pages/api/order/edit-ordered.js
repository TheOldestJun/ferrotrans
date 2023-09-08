import prisma from "../../../../prisma";
import { storeCorrectDate } from "@/utilities/helpers";

const EditOrdered = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { id, ordered, orderAmount } = req.body;
  const today = new Date();
  const orderedAt = storeCorrectDate(today);
  try {
    const result = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        ordered: ordered,
        orderedAt: orderedAt,
        orderAmount: {
          increment: orderAmount,
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default EditOrdered;
