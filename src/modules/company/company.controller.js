import * as companyService from '../company/company.service.js';

export const createCompany = async (req, res, next) => {
  try {
    const result = await companyService.createCompanyService({
      ...req.body,
      userId: req.userId
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllCompanies = async (req, res, next) => {
  try {
    const result = await companyService.getAllCompaniesService();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const result = await companyService.getCompanyByIdService(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const result = await companyService.updateCompanyService(
      req.params.id,
      req.body,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const result = await companyService.deleteCompanyService(
      req.params.id,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};