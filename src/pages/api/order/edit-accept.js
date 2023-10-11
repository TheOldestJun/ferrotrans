import prisma from "../../../../prisma";
import { storeCorrectDate } from "@/utilities/helpers";

const EditAccept = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { id, acceptedBy } = req.body;
  const today = new Date();
  const doneAt = storeCorrectDate(today);

  try {
    const result = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        acceptedBy: acceptedBy,
        done: true,
        doneAt: doneAt,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default EditAccept;
