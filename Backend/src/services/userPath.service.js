import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import {
  isValidGamePathId,
  isValidUsername,
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

export default {
  create,
  list,
};
