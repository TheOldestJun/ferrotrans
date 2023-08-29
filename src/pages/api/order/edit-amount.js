import prisma from "../../../../prisma";

const EditAmount = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { amount, id } = req.query;
  try {
    const result = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        amount: parseFloat(amount),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default EditAmount;
