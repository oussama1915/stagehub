import prisma from "../config/prismaClient.js";

export const createOfferService = async ({
  title,
  description,
  location,
  type,
  salary,
  companyId,
}) => {
  if (!title || !description || !location || !type || !companyId) {
    throw new Error("Title, description, location, type and companyId are required");
  }

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: Number(companyId),
    },
  });

  if (!existingCompany) {
    throw new Error("Company not found");
  }

  const offer = await prisma.internshipOffer.create({
    data: {
      title,
      description,
      location,
      type,
      salaryOptional: salary,
      companyId: Number(companyId),
    },
    include: {
      company: true,
    },
  });

  return offer;
};

export const getAllOffersService = async () => {
  const offers = await prisma.internshipOffer.findMany({
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return offers;
};

export const getOfferByIdService = async (id) => {
  const offer = await prisma.internshipOffer.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      company: true,
    },
  });

  if (!offer) {
    throw new Error("Offer not found");
  }

  return offer;
};

export const updateOfferService = async (id, data) => {
  const offerId = Number(id);

  const existingOffer = await prisma.internshipOffer.findUnique({
    where: {
      id: offerId,
    },
  });

  if (!existingOffer) {
    throw new Error("Offer not found");
  }

  if (data.companyId !== undefined) {
    const existingCompany = await prisma.company.findUnique({
      where: {
        id: Number(data.companyId),
      },
    });

    if (!existingCompany) {
      throw new Error("Company not found");
    }
  }

  const updatedOffer = await prisma.internshipOffer.update({
    where: {
      id: offerId,
    },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.salary !== undefined && { salaryOptional: data.salary }),
      ...(data.companyId !== undefined && { companyId: Number(data.companyId) }),
    },
    include: {
      company: true,
    },
  });

  return updatedOffer;
};

export const deleteOfferService = async (id) => {
  const offerId = Number(id);

  const existingOffer = await prisma.internshipOffer.findUnique({
    where: {
      id: offerId,
    },
  });

  if (!existingOffer) {
    throw new Error("Offer not found");
  }

  await prisma.internshipOffer.delete({
    where: {
      id: offerId,
    },
  });

  return {
    message: "Offer deleted successfully",
  };
};