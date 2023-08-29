import prisma from "../../../../prisma";

const getAll = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const result = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        unitId: true,
        units: {
          select: {
            ua: true,
            ru: true,
            en: true,
            pl: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAll;
