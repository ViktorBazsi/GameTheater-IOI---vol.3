import gamePathService from "../services/gamePath.service.js";

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newGamePath = await gamePathService.create({
      name,
    });
    res.status(201).json(newGamePath);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allGamePaths = await gamePathService.list();
    res.status(200).json(allGamePaths);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getGamePathById = await gamePathService.getById(id);
    res.status(200).json(getGamePathById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { questionNr, resRekaAll, resDomiAll, resKataAll, nextQuestion } =
    req.body;

  try {
    const updatedGamePath = await gamePathService.update(id, {
      questionNr,
      resRekaAll,
      resDomiAll,
      resKataAll,
      nextQuestion,
    });
    res.status(201).json(updatedGamePath);
  } catch (error) {
    next(error);
  }
};

const updateGamePathByAllAnswerByMajority = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gamePath = await gamePathService.getById(id);

    // Ha nincs userpaths, azonnal válaszolunk
    if (!gamePath.userpaths || gamePath.userpaths.length === 0) {
      return res.status(200).json({
        message: "No userpaths available",
        userpaths: [],
      });
    }

    // Többségi logika
    const userpaths = gamePath.userpaths;
    const countMap = userpaths.reduce((acc, obj) => {
      acc[obj.userAnswerId] = (acc[obj.userAnswerId] || 0) + 1;
      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(countMap));
    const majorityIds = Object.keys(countMap).filter(
      (id) => countMap[id] === maxCount
    );

    const selectedId =
      majorityIds.length > 1
        ? majorityIds[Math.floor(Math.random() * majorityIds.length)]
        : majorityIds[0];

    const majorityUserpaths = userpaths.filter(
      (path) => path.userAnswerId === selectedId
    );

    // Új objektum építése az azonos adatokból
    if (majorityUserpaths.length > 0) {
      const { questionNr, resReka, resDomi, resKata, nextQuestion } =
        majorityUserpaths[0];

      const resultObject = {
        questionNr,
        resReka,
        resDomi,
        resKata,
        nextQuestion,
      };
      // return res.status(200).json(resultObject);
      // A gamePath ide tartozó rekordjainak frissítése
      try {
        const updatedGamePathByAllAnswerByMajority =
          await gamePathService.update(id, {
            questionNr: resultObject.questionNr,
            resRekaAll: resultObject.resReka,
            resDomiAll: resultObject.resDomi,
            resKataAll: resultObject.resKata,
            nextQuestion: resultObject.nextQuestion,
          });
        res.status(200).json(updatedGamePathByAllAnswerByMajority);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedGamePath = await gamePathService.destroy(id);
    res.status(200).json({ deletedGamePath });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
  // ---------EXTRA
  updateGamePathByAllAnswerByMajority,
};
