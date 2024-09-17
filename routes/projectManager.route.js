const express = require("express");
const router = express.Router();
const {
  getProjectManagers,
  createProjectManager,
  updateProjectManager,
  deleteProjectManager
} = require('../handlers/projectManager.handler');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

// Middleware to protect routes
router.use(authenticateToken); // Apply token verification to all routes

// Route to get all project managers (accessible by admins)
router.route('/api/project-managers')
  .get(authorizeAdmin, getProjectManagers);

// Route to create a new project manager (accessible by admins)
router.route('/api/project-manager')
  .post(authorizeAdmin, createProjectManager);

// Route to update or delete a project manager by email (accessible by admins)
router.route('/api/project-manager/:email')
  .patch(authorizeAdmin, updateProjectManager)
  .delete(authorizeAdmin, deleteProjectManager);

module.exports = router;