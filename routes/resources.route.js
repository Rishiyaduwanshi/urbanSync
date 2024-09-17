const express = require('express');
const router = express.Router();
const {
  getResources,
  createResource,
  updateResource,
  deleteResource
} = require('../handlers/resources.handler');
const { verifyToken, authorizeAdmin } = require('../middlewares/authMiddleware');

// Route to get all resources
router.route('/api/resources')
  .get(verifyToken, getResources); // Authentication required

// Route to create a new resource
router.route('/api/resource')
  .post(verifyToken, authorizeAdmin, createResource); // Authentication and admin check required

// Route to update or delete a resource by resourceId
router.route('/api/resource/:resourceId')
  .patch(verifyToken, authorizeAdmin, updateResource) // Authentication and admin check required
  .delete(verifyToken, authorizeAdmin, deleteResource); // Authentication and admin check required

module.exports = router;