import prisma from "../../../../prisma";
import { Type } from "@prisma/client";

const GetAllKitchen = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const result = await prisma.product.findMany({
      where: {
        type: Type.KITCHEN,
      },
      select: {
        id: true,
        name: true,
        unitId: true,
        average: true,
        currentPrice: true,
        quantity: true,
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

export default GetAllKitchen;
