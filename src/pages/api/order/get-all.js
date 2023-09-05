import prisma from "../../../../prisma";

const getAll = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const result = await prisma.order.findMany({
      select: {
        id: true,
        title: true,
        amount: true,
        ordered: true,
        done: true,
        doneAt: true,
        orderedAt: true,
        units: {
          select: {
            title: true,
            ua: true,
            ru: true,
            en: true,
            pl: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
        {
          product: {
            name: "asc",
          },
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return;
};

export default getAll;
