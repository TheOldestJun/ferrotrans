import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

const Login = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true,
        avatarUrl: true,
        role: {
          select: {
            title: true,
          },
        },
      },
    });
    if (!user) {
      res.json({ error: "Invalid email" });
      return;
    }
    let passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.json({ error: "Invalid password" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default Login;
