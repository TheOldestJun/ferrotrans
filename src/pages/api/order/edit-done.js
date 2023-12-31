import prisma from "../../../../prisma";
import { storeCorrectDate } from "@/utilities/helpers";

const EditDone = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { id, productType, productId, amount, doneBy } = req.body;
  const today = new Date();
  const doneAt = storeCorrectDate(today);
  //  const newAmount = parseFloat(amount.replace(/,/, "."));
  try {
    if (productType === "KITCHEN") {
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          quantity: {
            increment: amount,
          },
        },
      });
    }

    let result = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        doneAmount: {
          increment: amount,
        },
      },
    });
    if (result.doneAmount < result.amount) {
      result = await prisma.order.update({
        where: {
          id: id,
        },
        data: {
          pending: true,
          done: false,
          doneBy: doneBy,
        },
      });
    } else {
      result = await prisma.order.update({
        where: {
          id: id,
        },
        data: {
          pending: false,
          done: true,
          doneAt: doneAt,
          doneBy: doneBy,
        },
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default EditDone;
