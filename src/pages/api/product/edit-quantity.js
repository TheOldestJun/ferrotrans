import prisma from "../../../../prisma";

const EditQuantity = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { id, amount } = req.query;
  const quantity = parseFloat(amount.replace(/,/, "."));
  try {
    const result = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default EditQuantity;
