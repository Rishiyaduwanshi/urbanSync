const ProjectManager = require("../models/ProjectManager.model"); // Updated to match the correct model path
const hashPassword = require("../utils/hashPassword");

module.exports = {
  // Create a new project manager
  createProjectManager: async (req, res) => {
    try {
      const newProjectManager = {
        ...req.body,
        password: await hashPassword(req.body.password),
      };
  
      const newProjectManagerCreated = await ProjectManager.create(newProjectManager);
  
      res.status(201).json({
        status: "Success",
        Manager: newProjectManagerCreated,
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Failed to create a new project manager: " + err.message,
      });
    }
  },
  
  // Delete a project manager by email
  deleteProjectManager: async (req, res) => {
    try {
      const email = req.params.email; // Extract email from params
      const result = await ProjectManager.findOneAndDelete({ email });
      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: 'Project Manager with email ${email} not found',
        });
      }
      res.status(200).json({
        status: "Success",
        message: 'Project Manager with email ${email} deleted successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Failed to delete project manager: " + err.message,
      });
    }
  },

  // Update a project manager by email
  updateProjectManager: async (req, res) => {
    try {
      const email = req.params.email; // Extract email from params
      const updatedData = req.body;

      if (updatedData.password) {
        updatedData.password = await hashPassword(updatedData.password);
      }

      const result = await ProjectManager.findOneAndUpdate({ email }, updatedData, { new: true });

      if (!result) {
        return res.status(404).json({
          status: "Error",
          message: 'Project Manager with email ${email} not found',
        });
      }

      res.status(200).json({
        status: "Success",
        message: 'Project Manager with email ${email} updated successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Failed to update project manager: " + err.message,
      });
    }
  },

  // Retrieve all project managers
  getProjectManagers: async (req, res) => {
    try {
      const allProjectManagers = await ProjectManager.find({});
      res.status(200).json({
        status: "Success",
        data: allProjectManagers,
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Failed to retrieve project managers: " + err.message,
      });
    }
  },
};