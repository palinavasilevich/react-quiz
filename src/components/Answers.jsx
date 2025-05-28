import { useRef } from "react";

import { ANSWER_STATE } from "../constants";

export const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ANSWER_STATE.unanswered}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
