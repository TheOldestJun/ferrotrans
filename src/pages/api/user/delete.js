import prisma from "../../../../prisma";

const Delete = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const result = await prisma.user.delete({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export default Delete;
