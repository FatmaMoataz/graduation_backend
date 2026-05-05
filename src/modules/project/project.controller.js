import * as projectService from "./project.service.js";

// Create
export const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    return res.status(201).json({ message: "Project created", project });
  } catch (err) {
    next(err);
  }
};

// Get All
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    return res.json({ message: "Done", projects });
  } catch (err) {
    next(err);
  }
};

// Get One
export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    return res.json({ message: "Done", project });
  } catch (err) {
    next(err);
  }
};

// Update
export const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body
    );
    return res.json({ message: "Updated", project });
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    return res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};