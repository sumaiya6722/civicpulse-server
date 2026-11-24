import mongoose from "mongoose";

const issueActivitySchema = new mongoose.Schema(
  {
    issueId: {  //	Identifies which issue the activity belongs to
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "created",
        "verified",
        "assigned",
        "status-updated",
        "resolved",
        "updated",
        "deleted",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    performedBy: {
      type: String,
      default: null,
    },

    previousValue: {
      type: String,
      default: null,
    },

    newValue: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const IssueActivity = mongoose.model("IssueActivity",issueActivitySchema);

export default IssueActivity;