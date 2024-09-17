const resources = require("../models/Resource.model");  // Assuming the model is named 'Resource'
const projects = require("../models/Administrator.model");  // Assuming 'Project' model

module.exports = {
  // GET Resources
  getResources: async (req, res) => {
    try {
      const resourcesList = await resources.find({}).populate('assignedTo', 'title'); // Populates project title
      res.status(200).json({
        status: 'success',
        message: '🎉 Resources retrieved successfully 🎉',
        details: resourcesList,
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn't retrieve the resources 😅 -> ${error.message}`,
      });
    }
  },

  // POST - Create Resource
  createResource: async (req, res) => {
    try {
      const { name, resourceCount, availabilityStatus, assignedTo } = req.body;

      // If assignedTo is provided, ensure it refers to an existing project
      if (assignedTo) {
        const projectExists = await projects.findById(assignedTo);
        if (!projectExists) {
          return res.status(404).json({
            status: 'Error',
            message: `Project with ID ${assignedTo} does not exist`,
          });
        }
      }

      const newResource = {
        name,
        resourceCount,
        availabilityStatus,
        assignedTo,
      };

      const resourceCreated = await resources.create(newResource);
      res.status(201).json({
        status: 'success',
        message: '🎉 New Resource has been added 🎉',
        details: resourceCreated,
      });
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: `Oops! Couldn't create the resource 😅 -> ${error.message}`,
      });
    }
  },

  // PATCH - Update Resource
  updateResource: async (req, res) => {
    try {
      const { resourceId } = req.params;
      const updatedData = req.body;

      // If assignedTo is updated, ensure the new project exists
      if (updatedData.assignedTo) {
        const projectExists = await projects.findById(updatedData.assignedTo);
        if (!projectExists) {
          return res.status(404).json({
            status: 'Error',
            message: `Project with ID ${updatedData.assignedTo} does not exist`,
          });
        }
      }

      const result = await resources.findOneAndUpdate({ _id: resourceId }, updatedData, { new: true });

      if (!result) {
        return res.status(404).json({
          status: 'Error',
          message: `Resource with ID ${resourceId} not found`,
        });
      }

      res.status(200).json({
        status: 'Success',
        message: `Resource with ID ${resourceId} updated successfully`,
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Error',
        message: `Failed to update resource: ${err.message}`,
      });
    }
  },

  // DELETE - Delete Resource
  deleteResource: async (req, res) => {
    try {
      const { resourceId } = req.params;
      const result = await resources.findOneAndDelete({ _id: resourceId });

      if (!result) {
        return res.status(404).json({
          status: 'Error',
          message: `Resource with ID ${resourceId} not found`,
        });
      }

      res.status(200).json({
        status: 'Success',
        message: `Resource with ID ${resourceId} deleted successfully`,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Error',
        message: `Failed to delete resource: ${err.message}`,
      });
    }
  },
};
