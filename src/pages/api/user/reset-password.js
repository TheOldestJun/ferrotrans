import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

const ResetPassword = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { email, password } = req.body;
  try {
    let result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!result) {
      res.json({ error: "User not found" });
      return;
    }
    result = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: bcrypt.hashSync(password, 10),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default ResetPassword;
