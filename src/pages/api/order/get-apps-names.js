import prisma from "../../../../prisma";

const getAppsNames = async (req, res) => {
  try {
    const applicants = await prisma.order.groupBy({
      by: ["applicantId"],
      where: {
        done: false,
      },
      _count: {
        productId: true,
      },
    });

    let appsNames = [];
    for (let app of applicants) {
      const name = await prisma.user.findUnique({
        where: {
          id: app.applicantId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: {
            select: {
              title: true,
            },
          },
        },
      });
      name.orderCount = app._count.productId;
      appsNames.push(name);
    }
    return res.status(200).json(appsNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAppsNames;
