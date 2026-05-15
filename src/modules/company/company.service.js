import Company from "../../db/models/company.model.js";

export const createCompanyService = async (data) => {
  const company = await Company.create(data);

  await company.populate("userId teamId projectId");

  return {
    success: true,
    message: "Company created successfully",
    data: company
  };
};

export const getAllCompaniesService = async () => {
  const companies = await Company.find()
    .populate("userId", "username email")
    .populate("teamId")
    .populate("projectId");

  return {
    success: true,
    results: companies.length,
    data: companies
  };
};

export const getCompanyByIdService = async (id) => {
  const company = await Company.findById(id)
    .populate("userId", "username email")
    .populate("teamId")
    .populate("projectId");

  return company;
};

export const updateCompanyService = async (id, data, userId) => {
  const company = await Company.findById(id);

  if (!company) {
    return {
      success: false,
      status: 404,
      message: "Company not found"
    };
  }

  // Allow update if company has no owner (legacy) or if user owns the company
  if (company.userId && company.userId.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to update this company"
    };
  }

  const updatedCompany = await Company.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  )
    .populate("userId", "username email")
    .populate("teamId")
    .populate("projectId");

  return {
    success: true,
    message: "Company updated successfully",
    data: updatedCompany
  };
};

export const deleteCompanyService = async (id, userId) => {
  const company = await Company.findById(id);

  if (!company) {
    return {
      success: false,
      status: 404,
      message: "Company not found"
    };
  }

  // Allow delete if company has no owner (legacy) or if user owns the company
  if (company.userId && company.userId.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to delete this company"
    };
  }

  await Company.findByIdAndDelete(id);

  return {
    success: true,
    message: "Company deleted successfully"
  };
};