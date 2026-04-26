import {
  applyToOfferService,
  getMyApplicationsService,
  getAllApplicationsService,
  updateApplicationStatusService,
} from "../services/applicationService.js";

export const applyToOffer = async (req, res) => {
  try {
    const result = await applyToOfferService({
      userId: req.user.userId,
      offerId: req.body.offerId,
      motivation: req.body.motivation,
      cvUrl: req.body.cvUrl,
    });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const result = await getMyApplicationsService(req.user.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const result = await getAllApplicationsService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const result = await updateApplicationStatusService(
      req.params.id,
      req.body.status
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};