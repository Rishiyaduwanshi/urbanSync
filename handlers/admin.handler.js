const Admin = require("../models/Administrator.model");
const ProjectManager = require("../models/ProjectManager.model");
const Project = require("../models/Project.model");  // Ensure you have a Project model
const hashPassword = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

// Add or update a project manager
module.exports = {
  getAdmins: async (req, res) => {
    try {
      const admins = await Admin.find({});
      res.status(200).json({
        status: 'success',
        message: '🎉 Admins retrieved successfully 🎉',
        details: admins,
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn\'t retrieve the admins 😅 -> ${error.message}`
      });
    }
  },

  // POST - Create Admin
  createAdmin: async (req, res) => {
    try {
      const newAdmin = await Admin.create(req.body);
      res.status(201).json({
        status: 'success',
        message: '🎉 New Admin has been Added 🎉',
        details: newAdmin,
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn't create the admin 😅 -> ${error.message}`,
      });
    }
  },

  // PATCH - Update Admin
  updateAdmin: async (req, res) => {
    try {
      const { email } = req.params;
      const updatedData = req.body;
      const admin = await Admin.findOneAndUpdate({ email }, updatedData, { new: true });

      if (!admin) {
        return res.status(404).json({
          status: 'Error',
          message: `Admin with email ${email} not found`,
        });
      }

      res.status(200).json({
        status: 'Success',
        message: `Admin with email ${email} updated successfully`,
        data: admin,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Error',
        message: `Failed to update admin: ${err.message}`,
      });
    }
  },

  // DELETE - Delete Admin
  deleteAdmin: async (req, res) => {
    try {
      const { email } = req.params;
      const result = await Admin.findOneAndDelete({ email });

      if (!result) {
        return res.status(404).json({
          status: 'Error',
          message: `Admin with email ${email} not found`,
        });
      }

      res.status(200).json({
        status: 'Success',
        message: `Admin with email ${email} deleted successfully`,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Error',
        message: `Failed to delete admin: ${err.message}`,
      });
    }
  },
  // Create or update a project manager
  manageProjectManager: async (req, res) => {
    try {
      const { email, password, ...otherDetails } = req.body;

      // Hash the password if provided
      if (password) {
        req.body.password = await hashPassword(password);
      }

      // Check if the project manager already exists
      const projectManager = await ProjectManager.findOneAndUpdate(
        { email },
        req.body,
        { new: true, upsert: true }  // Update if exists or create if not
      );

      res.status(200).json({
        status: "Success",
        Manager: projectManager,
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Failed to manage project manager: " + err.message,
      });
    }
  },

  // Delete a project manager
  deleteProjectManager: async (req, res) => {
    try {
      const email = req.params.email;
      const result = await ProjectManager.findOneAndDelete({ email });
      if (!result) {
        return res.status(404).json({ status: "Error", message: `Project Manager with email ${email} not found` });
      }
      res.status(200).json({ status: "Success", message: `Project Manager with email ${email} deleted successfully` });
    } catch (err) {
      res.status(500).json({ status: "Error", message: "Failed to delete project manager: " + err.message });
    }
  },

  // Edit project details
  editProjectDetails: async (req, res) => {
    try {
      const { projectId } = req.params;
      const updatedData = req.body;

      const project = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });

      if (!project) {
        return res.status(404).json({ status: "Error", message: `Project with ID ${projectId} not found` });
      }

      res.status(200).json({ status: "Success", message: `Project with ID ${projectId} updated successfully`, data: project });
    } catch (err) {
      res.status(500).json({ status: "Error", message: "Failed to update project details: " + err.message });
    }
  },
};