import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";

import logger from "./src/middleware/logger.js";
import { connectDatabase } from "./src/config/database.js";
import { createAuth } from "./src/config/auth.js";

import testRoutes from "./src/routes/testRoutes.js";
import issueRoutes from "./src/routes/issueRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import staffRoutes from "./src/routes/staffRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";



dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB first
    await connectDatabase();

    // 2. Initialize Better Auth after MongoDB connects
    const auth = createAuth();
    app.locals.auth = auth;  //This makes the Better Auth instance accessible through req.app.locals.auth.

    // 3. Configure CORS
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    // 4. Register Better Auth handler before express.json()
    app.all("/api/auth/*splat", toNodeHandler(auth));

    // 5. Other middlewares
    app.use(express.json());
    app.use(logger);

    // 6. Application routes
    app.use("/api", testRoutes);
    app.use("/api", issueRoutes);
    app.use("/api", departmentRoutes);
    app.use("/api", teamRoutes);
    app.use("/api", staffRoutes);
    app.use("/api", dashboardRoutes);

    // 7. Root route
    app.get("/", (req, res) => {
      res.send("CivicPulse server is running!");
    });

    // 8. Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
