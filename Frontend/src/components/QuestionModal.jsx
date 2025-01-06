
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";

const Modal = ({ question, onClose }) => {
  const handleSave = (values) => {
    // Itt lehetne menteni a frissített kérdést és válaszokat
    console.log("Updated question:", values.updatedQuestion);
    console.log("Updated answers:", values.updatedAnswers);
    onClose(); // Modal bezárása
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Question</h2>
        <Formik
          initialValues={{
            updatedQuestion: question.question,
            updatedAnswers: question.answers.map((answer) => ({
              ...answer,
              updatedAnswer: answer.answer,
            })),
          }}
          onSubmit={handleSave}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <textarea
                  name="updatedQuestion"
                  value={values.updatedQuestion}
                  onChange={(e) =>
                    setFieldValue("updatedQuestion", e.target.value)
                  }
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Answers:</h3>
              <FieldArray
                name="updatedAnswers"
                render={(arrayHelpers) => (
                  <>
                    {values.updatedAnswers.map((answer, index) => (
                      <div key={answer.id} className="mb-2">
                        <Field
                          name={`updatedAnswers[${index}].updatedAnswer`}
                          type="text"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Answer text"
                        />
                        <div className="flex justify-between">
                          <div className="w-1/3">
                            <label>Reka</label>
                            <Field
                              name={`updatedAnswers[${index}].resultReka`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Reka's result"
                            />
                          </div>
                          <div className="w-1/3">
                            <label>Domi</label>
                            <Field
                              name={`updatedAnswers[${index}].resultDomi`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Domi's result"
                            />
                          </div>
                          <div className="w-1/3">
                            <label>Kata</label>
                            <Field
                              name={`updatedAnswers[${index}].resultKata`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Kata's result"
                            />
                          </div>
                        </div>
                        <Field
                          name={`updatedAnswers[${index}].nextQuestNr`}
                          type="number"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Next question number"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete Answer
                        </button>
                      </div>
                    ))}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            id: Math.random().toString(36).substring(7),
                            relQuestionNr: question.number,
                            updatedAnswer: "",
                            resultReka: 0,
                            resultDomi: 0,
                            resultKata: 0,
                            nextQuestNr: "",
                            uploaderId: "currentUserId", // A bejelentkezett felhasználó id-ja
                          })
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add Answer
                      </button>
                    </div>
                  </>
                )}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;