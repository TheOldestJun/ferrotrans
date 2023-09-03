import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

const EditUser = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  let { firstName, lastName, email, password, roleId, avatarUrl } = req.body;

  try {
    let result = {};
    if (!password) {
      result = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          avatarUrl: avatarUrl || null,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      });
    } else {
      result = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          password: bcrypt.hashSync(password, 10),
          avatarUrl: avatarUrl || null,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default EditUser;
