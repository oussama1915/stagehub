import prisma from "../config/prismaClient.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCompanies = await prisma.company.count();
    const totalOffers = await prisma.internshipOffer.count();
    const totalApplications = await prisma.application.count();

    const pendingApplications = await prisma.application.count({
      where: {
        status: "PENDING",
      },
    });

    const acceptedApplications = await prisma.application.count({
      where: {
        status: "ACCEPTED",
      },
    });

    const rejectedApplications = await prisma.application.count({
      where: {
        status: "REJECTED",
      },
    });

    return res.status(200).json({
      totalUsers,
      totalCompanies,
      totalOffers,
      totalApplications,
      applicationStatusStats: {
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};