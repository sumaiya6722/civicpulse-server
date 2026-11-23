export const getTestMessage = (req, res) => {
  res.json({
    success: true,
    message: "Hello from CivicPulse backend!"
  });
};
