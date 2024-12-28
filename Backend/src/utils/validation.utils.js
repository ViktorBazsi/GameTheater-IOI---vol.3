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

export const isValidUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) throw new HttpError("username nem található!", 404);
  return user;
};

// USERPATH
export const isValidUserPathId = async (id) => {
  const userPath = await prisma.userPath.findUnique({
    where: { id },
  });
  if (!userPath) throw new HttpError("userPath id nem található!", 404);
  return userPath;
};

// GAME
export const isValidGamePathId = async (id) => {
  const validGamePathId = await prisma.gamePath.findUnique({
    where: { id },
  });
  if (!validGamePathId) throw new HttpError("gamePathId nem található!", 404);
  return validGamePathId;
};

export const isValidGamePathName = async (name) => {
  const validGamePathName = await prisma.gamePath.findUnique({
    where: { name },
  });
  if (validGamePathName) throw new HttpError("gamePath name már létezik", 404);
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
