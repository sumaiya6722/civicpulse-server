
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getNativeDb } from "./database.js";
import { admin } from "better-auth/plugins";


export const createAuth = () => {
  return betterAuth({
    database: mongodbAdapter(getNativeDb()),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: ["http://localhost:3000"],

    emailAndPassword: {
      enabled: true,
    },

    plugins: [
      admin(),
    ],

    user: {
      additionalFields: {
        accountType: {
          type: "string",
          required: false,
          defaultValue: "citizen",
          input: false,
        },

        department: {
          type: "string",
          required: false,
          input: false,
        },

        team: {
          type: "string",
          required: false,
          input: false,
        },
      },
    },
  });
};
