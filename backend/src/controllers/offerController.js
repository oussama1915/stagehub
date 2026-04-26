import {
  createOfferService,
  getAllOffersService,
  getOfferByIdService,
  updateOfferService,
  deleteOfferService,
} from "../services/offerService.js";

export const createOffer = async (req, res) => {
  try {
    const result = await createOfferService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllOffers = async (req, res) => {
  try {
    const result = await getAllOffersService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const result = await getOfferByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const result = await updateOfferService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const result = await deleteOfferService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};