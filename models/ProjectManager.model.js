const mongoose = require("mongoose");

const ProjectManagerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      enum: ["Adminstrator", "Project Manager"],
      default: "Project Manager"
    },
    departments : {
        type : [String],
        enum: [
            "Roads",
            "Electricity",
            "Water",
            "Telecom",
            "Gas",
            "Sanitation",
            "Sewage",
            "Transport",
            "Parks & Recreation",
            "Public Works",
            "Waste Management",
            "Building Construction",
            "Environmental Protection",
            "Traffic Management",
            "Housing & Urban Development",
            "Health & Safety",
            "Public Lighting",
            "Fire Services"
          ]
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProjectManager", ProjectManagerSchema);
