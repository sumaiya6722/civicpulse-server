import IssueActivity from "../models/IssueActivity.js";

const logIssueActivity = async ({
  issueId,
  action,
  description,
  performedBy = null,
  previousValue = null,
  newValue = null,
}) => {
  await IssueActivity.create({
    issueId,
    action,
    description,
    performedBy,
    previousValue,
    newValue,
  });
};

export default logIssueActivity;