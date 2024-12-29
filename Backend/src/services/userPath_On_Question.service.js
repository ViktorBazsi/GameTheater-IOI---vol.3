import prisma from "../models/prismaClient.js";
import { isValidUserPath_On_Question_Id } from "../utils/validation.utils.js";

const create = async ({ userPathUName, questionNr }) => {
  const newUserPath_On_Question_Connection =
    await prisma.userPath_On_Questions.create({
      data: {
        userPathUName,
        questionNr,
      },
    });
  return newUserPath_On_Question_Connection;
};

const list = async () => {
  const allUserPath_On_Question_Connections =
    await prisma.userPath_On_Questions.findMany();
  return allUserPath_On_Question_Connections;
};

const getById = async (id) => {
  await isValidUserPath_On_Question_Id(id);
  const getUserPath_On_Question_ConnectionById =
    await prisma.userPath_On_Questions.findUnique({
      where: { id },
    });
  return getUserPath_On_Question_ConnectionById;
};

const update = async (id, UserPath_On_Question_ConnectionData) => {
  await isValidUserPath_On_Question_Id(id);
  const updatedUserPath_On_Question_Connection =
    await prisma.userPath_On_Questions.update({
      where: { id },
      data: { ...UserPath_On_Question_ConnectionData },
    });
  return updatedUserPath_On_Question_Connection;
};

const destroy = async (id) => {
  await isValidUserPath_On_Question_Id(id);
  const deletedUserPath_On_Question_Connection =
    await prisma.userPath_On_Questions.delete({
      where: { id },
    });
  return deletedUserPath_On_Question_Connection;
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
