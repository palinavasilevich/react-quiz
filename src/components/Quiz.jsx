import { useCallback, useState, useRef } from "react";

import QUESTIONS from "../questions";

import quizCompleteImg from "../assets/quiz-complete.png";
import { QuestionTimer } from "./QuestionTimer";

const ANSWER_STATE = {
  unanswered: "unanswered",
  answered: "answered",
  correct: "correct",
  wrong: "wrong",
};

export const Quiz = () => {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState(ANSWER_STATE.unanswered);
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === ANSWER_STATE.unanswered
      ? userAnswers.length
      : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState(ANSWER_STATE.answered);

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState(ANSWER_STATE.correct);
        } else {
          setAnswerState(ANSWER_STATE.wrong);
        }

        setTimeout(() => setAnswerState(ANSWER_STATE.unanswered), 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete Image" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer, index) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === ANSWER_STATE.answered && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === ANSWER_STATE.correct ||
                answerState === ANSWER_STATE.wrong) &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={index} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
