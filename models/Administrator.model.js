const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema(
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
      enum: ["Administrator", "Project Manager"],
      default: "Administrator",
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Administrator", AdministratorSchema);
