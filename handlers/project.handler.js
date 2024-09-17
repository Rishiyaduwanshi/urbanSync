const projects = require("../models/Administrator.model");
const getProjectId = require('../utils/getProjectId');

module.exports = {
  // GET Projects
  getProjects: async (req, res) => {
    try {
      const projectsList = await projects.find({});
      res.status(200).json({
        status: 'success',
        message: '🎉 Projects retrieved successfully 🎉',
        details: projectsList
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn't retrieve the projects 😅 -> ${error.message}`,
      });
    }
  },

  // POST - Create Project
  createProject: async (req, res) => {
    try {
      const projectId = await getProjectId();
      const newProject = {
        ...req.body,
        projectId,
      };
      const newProjectCreated = await projects.create(newProject);
      res.status(201).json({
        status: 'success',
        message: '🎉 New Project has been Added 🎉',
        details: newProjectCreated
      });

    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn't create the project 😅 -> ${error.message}`,
      });
    }
  },

  // PATCH - Update Project
  updateProject: async (req, res) => {
    try {
      const { projectId } = req.params;
      const updatedData = req.body;
      const result = await projects.findOneAndUpdate({ projectId }, updatedData, { new: true });

      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: `Project with projectId ${projectId} not found`
        });
      }

      res.status(200).json({
        status: "Success",
        message: `Project with projectId ${projectId} updated successfully`,
        data: result
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: `Failed to update project: ${err.message}`
      });
    }
  },

  // DELETE - Delete Project
  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params;
      const result = await projects.findOneAndDelete({ projectId });

      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: `Project with projectId ${projectId} not found`
        });
      }

      res.status(200).json({
        status: "Success",
        message: `Project with projectId ${projectId} deleted successfully`
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: `Failed to delete project: ${err.message}`
      });
    }
  },
};
