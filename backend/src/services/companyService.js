import prisma from "../config/prismaClient.js";

export const createCompanyService = async ({
  name,
  description,
  location,
  website,
}) => {
  if (!name || !description || !location) {
    throw new Error("Name, description and location are required");
  }

  const company = await prisma.company.create({
    data: {
      name,
      description,
      location,
      website,
    },
  });

  return company;
};

export const getAllCompaniesService = async () => {
  const companies = await prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return companies;
};

export const getCompanyByIdService = async (id) => {
  const company = await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  return company;
};

export const updateCompanyService = async (id, data) => {
  const companyId = Number(id);

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!existingCompany) {
    throw new Error("Company not found");
  }

  const updatedCompany = await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.website !== undefined && { website: data.website }),
    },
  });

  return updatedCompany;
};

export const deleteCompanyService = async (id) => {
  const companyId = Number(id);

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!existingCompany) {
    throw new Error("Company not found");
  }

  await prisma.company.delete({
    where: {
      id: companyId,
    },
  });

  return {
    message: "Company deleted successfully",
  };
};