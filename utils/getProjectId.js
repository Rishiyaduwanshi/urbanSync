const { customAlphabet } = require("nanoid");
const Project = require("../models/Administrator.model");

// Custom nanoid for numbers only (10 digits)
const generateProjectId = customAlphabet("1234567890", 10);

const getProjectId = async () => {
  let projectId;
  let isUnique = false;

  // Keep generating until we find a unique projectId
  while (!isUnique) {
    projectId = generateProjectId();
    const existingProject = await Project.findOne({ projectId });
    if (!existingProject) {
      isUnique = true;
    }
  }

  return projectId;
};

module.exports = getProjectId;
