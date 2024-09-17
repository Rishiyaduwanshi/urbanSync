const mongoose = require("mongoose");

const ResourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    resourceCount : {
      type : Number,
      min : [0,"Resource Count can't be negative"],
      default : 0
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "In Use", "Under Maintenance", "Unavailable"],
      default: "Available",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',  // Could also be 'Department' or both depending on your app structure
    }
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
