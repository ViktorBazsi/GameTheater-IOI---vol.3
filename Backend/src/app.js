import express from "express";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";
import cors from "cors";

// AUTH
import authRoutes from "./routes/auth.routes.js";
// ROUTES
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// AUTHENTICATE
app.use("/auth", authRoutes);
// ROUTES
app.use("/api/user", userRoutes);

app.use(errorHandler);

export default app;
