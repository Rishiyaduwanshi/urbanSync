const admins = require("../models/Administrator.model");
const hashPassword = require("../utils/hashPassword");

module.exports = {
  createAdmin: async (req, res) => {
    try {
      const newAdmin = {
        ...req.body,
        password : await hashPassword(req.body.password),
      };

      const newAdminCreated = await admins.create(newAdmin);
      res.status(201).json({
        status: "Success",
        "Admin Details ": newAdminCreated,
      });
    } catch (err) {
      res.status(501).json(
        {
          status: "Error",
          message: 'Failed to create a new Admin: ' + err.message
        }
      );
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const adminId = parseInt(req.params.adminId); // Extract and parse adminId from params
      if (isNaN(adminId)) {
        return res.status(400).json({ status: "Error", message: "Invalid adminId format" });
      }
      const result = await admins.findOneAndDelete({ adminId }); // Use findOneAndDelete if adminId is a number
      if (!result) {
        return res.status(404).json({ status: "Error", message: `Admin with adminId ${adminId} not found` });
      }
      res.status(200).json({ status: "Success", message: `Admin with adminId ${adminId} deleted successfully` });
    } catch (err) {
      res.status(500).json({ status: "Error", message: "Failed to delete admin: " + err.message });
    }
  },
  

  updateAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const updatedData = req.body;
  
      const result = await admins.findOneAndUpdate({ adminId }, updatedData, { new: true });
  
      if (!result) {
        return res.status(404).json({ status: "Error", message: `Admin with adminId ${adminId} not found` });
      }
  
      res.status(200).json({ status: "Success", message: `Admin with adminId ${adminId} updated successfully`, data: result });
    } catch (err) {
      res.status(500).json({ status: "Error", message: "Failed to update admin: " + err.message });
    }
  },
  

  getAdmins: async (req, res) => {
    try {
      const allAdmins = await admins.find({});
      res.status(200).json({ status: "Success", allAdmins });
    } catch (err) {
      res.status(500).json("Failed to retrieve admins: " + err.message);
    }
  },
};
