import prisma from "../../../../prisma";
import { Type } from "@prisma/client";
const getAll = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const result = await prisma.order.findMany({
      where: {
        product: {
          type: Type.OTHER,
        },
      },
      select: {
        id: true,
        title: true,
        amount: true,
        description: true,
        doneAmount: true,
        doneBy: true,
        orderAmount: true,
        orderedBy: true,
        acceptedBy: true,
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
        applicant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
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
};

export default getAll;
