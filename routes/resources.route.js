const express = require("express");
const router = express.Router();
const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../handlers/resources.handler");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Route to get all resources
router.route("/api/resources").get(authenticateToken, getResources); // Authentication required

// Route to create a new resource
router
  .route("/api/resource")
  .post(authenticateToken, authorizeAdmin, createResource); // Authentication and admin check required

// Route to update or delete a resource by resourceId
router
  .route("/api/resource/:resourceId")
  .patch(authenticateToken, authorizeAdmin, updateResource) // Authentication and admin check required
  .delete(authenticateToken, authorizeAdmin, deleteResource); // Authentication and admin check required

module.exports = router;
