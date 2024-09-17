const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title of the project is required']
    },
    description: {
      type: String,
      minlength: 5,
      maxlength: 2000, // Optional limit
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      validate: {
        validator: value => this.startDate ? value > this.startDate : true
        },
        message: 'End date must be after the start date'
    },
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Delay", "Completed"],
      default: "Upcoming",
    },
    department : {
        type : String,
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
            "Urban Planning",
            "Waste Management",
            "Building Construction",
            "Environmental Protection",
            "Traffic Management",
            "Housing & Urban Development",
            "Health & Safety",
            "Public Lighting",
            "Fire Services",
            "Stormwater Management"
          ],
    },
    conflict: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
