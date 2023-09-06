import prisma from "../../../../prisma";
import { getPeriodData, countAverage } from "@/utilities/helpers";

const AddPrice = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { amount, productId } = req.body;
  const newAmount = parseFloat(amount.replace(/,/, "."));

  if (!amount) {
    res.status(400).json({ error: "No amount" });
    return;
  }
  if (!productId) {
    res.status(400).json({ error: "No product id" });
    return;
  }

  try {
    await prisma.price.create({
      data: {
        amount: newAmount,
        productId: productId,
      },
    });
    const prices = await prisma.price.findMany({
      where: {
        productId,
      },
    });
    let average;
    //get only needed data in period days
    const currentPrices = getPeriodData(prices);
    currentPrices.length !== 0
      ? (average = countAverage(currentPrices))
      : (average = 0.0);

    const result = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        currentPrice: parseFloat(amount),
        average: average,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default AddPrice;
