
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/database.js";
import { createAuth } from "./config/auth.js";

await connectDatabase();

export const auth = createAuth();
