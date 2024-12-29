import express from "express";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";
import cors from "cors";

// AUTH
import authRoutes from "./routes/auth.routes.js";
// ROUTES
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import userPathRoutes from "./routes/userPath.routes.js";
import gamePathRoutes from "./routes/gamePath.routes.js";
import userPath_On_QuestionsRoutes from "./routes/userPath_On_Questions.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// AUTHENTICATE
app.use("/auth", authRoutes);
// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/userPath", userPathRoutes);
app.use("/api/gamePath", gamePathRoutes);
app.use("/api/connection", userPath_On_QuestionsRoutes);

app.use(errorHandler);

export default app;
