const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../handlers/project.handler");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Route to get all projects
router.route("/api/projects").get(authenticateToken, getProjects); // Authentication required

// Route to create a new project
router
  .route("/api/project")
  .post(authenticateToken, authorizeAdmin, createProject); // Authentication and admin check required

// Route to update or delete a project by projectId
router
  .route("/api/project/:projectId")
  .patch(authenticateToken, authorizeAdmin, updateProject) // Authentication and admin check required
  .delete(authenticateToken, authorizeAdmin, deleteProject); // Authentication and admin check required

module.exports = router;
