import prisma from "../../../../prisma";

const addProduct = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, unitId, type } = req.body;
  if (!name) {
    res.status(400).json({ error: "Missing name" });
    return;
  }
  if (!unitId) {
    res.status(400).json({ error: "Missing unitId" });
    return;
  }
  if (!type) {
    res.status(400).json({ error: "Missing type" });
    return;
  }

  try {
    const result = await prisma.product.create({
      data: req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default addProduct;
