import prisma from "../models/prismaClient.js";
import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";

// USER
export const isValidUserId = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) throw new HttpError("user id nem található!", 404);
  return user;
};

// QUESTION
export const isValidQuestionId = async (id) => {
  const question = await prisma.question.findUnique({
    where: { id },
  });
  if (!question) throw new HttpError("answer id nem található!", 404);
  return question;
};

// ANSWER
export const isValidAnswerId = async (id) => {
  const answer = await prisma.answer.findUnique({
    where: { id },
  });
  if (!answer) throw new HttpError("answer id nem található!", 404);
  return answer;
};

// GET USERID FROM TOKEN
export const extractUserIdFromToken = (req, JWT_SECRET) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new HttpError("Token hiányzik", 401);
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    throw new HttpError("Érvénytelen token", 401);
  }
};
