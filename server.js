import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./src/routes/testRoutes.js";
import logger from "./src/middleware/logger.js";
import { connectDatabase } from "./src/config/database.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(logger);

// Routes
app.use("/api", testRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("CivicPulse server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
