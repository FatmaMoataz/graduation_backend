import Project from "../../../DB/models/project.model.js";

export const createProject = async (data) => {
  return await Project.create(data);
};

export const getAllProjects = async (query = {}) => {
  return await Project.find(query)
    .populate("userId")
    .populate("projectMember");
};

export const getProjectById = async (id) => {
  return await Project.findById(id)
    .populate("userId")
    .populate("projectMember");
};

export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};