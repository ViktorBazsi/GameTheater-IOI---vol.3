import express from "express";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";
import cors from "cors";

// AUTH

// ROUTES

const app = express();

app.use(cors());
app.use(express.json());

// AUTHENTICATE

// ROUTES

app.use(errorHandler);

export default app;

