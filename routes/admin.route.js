// Desc: Admin routes
const express = require("express");
const router = express.Router();
const {
  getAdmins,
  updateAdmin,
  deleteAdmin,
  createAdmin,
  manageProjectManager,
  deleteProjectManager,
  editProjectDetails
} = require('../handlers/admin.handler');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
// authenticateToken, authorizeRoles('admin'),
// authenticateToken, authorizeRoles('admin'),
// Admin routes
router.route('/api/admins').get( getAdmins);
router.route('/api/admin').post( createAdmin);
router.route('/api/admin/:adminId')
.patch(authenticateToken, authorizeRoles('admin'), updateAdmin)
.delete(authenticateToken, authorizeRoles('admin'), deleteAdmin);

// Manage project managers (admin only)
router.route('/api/project-manager')
.post(authenticateToken, authorizeRoles('admin'), manageProjectManager);
router.route('/api/project-manager/:email')
.delete(authenticateToken, authorizeRoles('admin'), deleteProjectManager);

// Edit project details (admin only)
router.route('/api/project/:projectId').patch(authenticateToken, authorizeRoles('admin'), editProjectDetails);

module.exports = router;