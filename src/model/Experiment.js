import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  withWhom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  byWhom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentDate: {
    type: Date, // Store the appointment date
    required: true,
  },
  startTime: {
    type: String, // Store time in "HH:mm" format
    required: true,
  },
  endTime: {
    type: String, // Store time in "HH:mm" format
    required: true,
  },
  isStarred: {
    type: Boolean,
    default: false,
  },
  isStarredByAcceptor: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

export const Experiment = mongoose.models.Experiment ?? mongoose.model("Experiment", expSchema);
