/* eslint-disable react/prop-types */
// components/QuestionsGrid.jsx


const QuestionsGrid = ({ questions }) => {
  return (
    <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
      {questions.length > 0 ? (
        questions.map((question) => (
          <div
            key={question.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {question.question}
            </h3>
            {question.answers && question.answers.length > 0 ? (
              <ul className="space-y-2">
                {question.answers.map((answer) => (
                  <li
                    key={answer.id}
                    className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                  >
                    {answer.answer}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No answers available</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Loading questions...</p>
      )}
    </div>
  );
};

export default QuestionsGrid;
