import prisma from "../../../../prisma";

const GetAllUsers = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleId: true,
        avatarUrl: true,
        role: {
          select: {
            title: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default GetAllUsers;
