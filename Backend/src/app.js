import express from "express";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";
import cors from "cors";

// AUTH

// ROUTES
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// AUTHENTICATE

// ROUTES
app.use("/api/user", userRoutes);

app.use(errorHandler);

export default app;
