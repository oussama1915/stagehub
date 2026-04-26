import prisma from "../config/prismaClient.js";

export const applyToOfferService = async ({ userId, offerId, motivation, cvUrl }) => {
  if (!offerId || !motivation) {
    throw new Error("offerId and motivation are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const existingOffer = await prisma.internshipOffer.findUnique({
    where: {
      id: Number(offerId),
    },
  });

  if (!existingOffer) {
    throw new Error("Offer not found");
  }

  const existingApplication = await prisma.application.findFirst({
    where: {
      userId: Number(userId),
      offerId: Number(offerId),
    },
  });

  if (existingApplication) {
    throw new Error("You have already applied to this offer");
  }

  const application = await prisma.application.create({
    data: {
      userId: Number(userId),
      offerId: Number(offerId),
      motivation,
      cvUrl,
    },
    include: {
      user: true,
      offer: {
        include: {
          company: true,
        },
      },
    },
  });

  return application;
};

export const getMyApplicationsService = async (userId) => {
  const applications = await prisma.application.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      offer: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

export const getAllApplicationsService = async () => {
  const applications = await prisma.application.findMany({
    include: {
      user: true,
      offer: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

export const updateApplicationStatusService = async (id, status) => {
  const applicationId = Number(id);

  if (!status) {
    throw new Error("Status is required");
  }

  const allowedStatuses = ["PENDING", "ACCEPTED", "REJECTED"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const existingApplication = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!existingApplication) {
    throw new Error("Application not found");
  }

  const updatedApplication = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
    include: {
      user: true,
      offer: {
        include: {
          company: true,
        },
      },
    },
  });

  return updatedApplication;
};