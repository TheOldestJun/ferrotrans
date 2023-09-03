import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

const Register = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  let {
    firstName = "Неизвестный",
    lastName = "Пользователь",
    email,
    password,
    roleId,
  } = req.body;
  if (!email || !password || !roleId) {
    res.json({ error: "Invalid data" });
    return;
  }

  try {
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        avatarUrl: "/img/user.png",
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export default Register;
