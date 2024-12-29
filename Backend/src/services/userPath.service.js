import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import {
  isValidGamePathId,
  isValidUsername,
  isValidUserPathId,
} from "../utils/validation.utils.js";

const create = async ({ username, gamePathId }) => {
  console.log("service username: ", username);
  if (!username) {
    throw new HttpError("Felhasználó név kell.", 400);
  }
  if (!gamePathId) {
    throw new HttpError("Játékazonosító szükséges.", 400);
  }
  await isValidUsername(username);
  await isValidGamePathId(gamePathId);
  const newUserPath = await prisma.userPath.create({
    data: {
      user: {
        connect: { username: username }, // A `User` azonosítóval kötjük össze
      },
      gamePath: {
        connect: { id: gamePathId }, // A `GamePath` azonosítóval kötjük össze
      },
    },
  });
  return newUserPath;
};

const list = async () => {
  const allUserPaths = await prisma.userPath.findMany();
  return allUserPaths;
};

const getById = async (id) => {
  await isValidUserPathId(id);
  const getUserPathById = await prisma.userPath.findUnique({
    where: { id },
  });
  return getUserPathById;
};

const update = async (id, userPathData) => {
  await isValidUserPathId(id);
  const updatedUserPath = await prisma.userPath.update({
    where: { id },
    data: { ...userPathData },
  });
  return updatedUserPath;
};

const destroy = async (id) => {
  await isValidUserPathId(id);
  const deletedUserPath = await prisma.userPath.delete({
    where: { id },
  });
  return deletedUserPath;
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
