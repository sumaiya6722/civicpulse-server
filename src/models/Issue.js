
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "road",
        "streetlight",
        "drainage",
        "waste",
        "water_supply",
        "public_property",
        "other",
      ],
    },

    // Uploaded issue image URL
    imageUrl: {
      type: String,
      default: null,
      trim: true,
    },

    assignedDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    assignedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

    resolutionNote: {
      type: String,
      trim: true,
      default: null,
    },

    location: {
      address: {
        type: String,
        required: true,
      },

      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "assigned",
        "in_progress",
        "resolved",
        "rejected",
      ],
      default: "pending",
    },

    reportedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
