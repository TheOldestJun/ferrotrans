import prisma from "../../../../prisma";
import moment from "moment";
import { MAX_PERIOD } from "@/utilities/constants";

const getAllByUserId = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { id } = req.query;
  const lastDate = moment().subtract(MAX_PERIOD, "days");
  try {
    await prisma.order.deleteMany({
      where: {
        createdAt: {
          lt: lastDate,
        },
      },
    });
    const result = await prisma.order.findMany({
      where: {
        applicantId: id,
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
        ordered: true,
        done: true,
        pending: true,
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

export default getAllByUserId;
