const express = require("express");
const router = express.Router();
const {
  getProjectManagers,
  createProjectManager,
  updateProjectManager,
  deleteProjectManager
} = require('../handlers/projectManager.handler');

// Route to get all project managers
router.route('/api/project-managers')
  .get(getProjectManagers);

// Route to create a new project manager
router.route('/api/project-manager')
  .post(createProjectManager);

// Route to update or delete a project manager by ID
router.route('/api/project-manager/:managerId')
  .patch(updateProjectManager)
  .delete(deleteProjectManager);

module.exports = router;
