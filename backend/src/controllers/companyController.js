import {
  createCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  updateCompanyService,
  deleteCompanyService,
} from "../services/companyService.js";

export const createCompany = async (req, res) => {
  try {
    const result = await createCompanyService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const result = await getAllCompaniesService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const result = await getCompanyByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const result = await updateCompanyService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const result = await deleteCompanyService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};