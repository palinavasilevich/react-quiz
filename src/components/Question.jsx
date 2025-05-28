import { useState } from "react";
import { Answers } from "./Answers";
import { QuestionTimer } from "./QuestionTimer";

import QUESTIONS from "../questions";
import { ANSWER_STATE } from "../constants";

export const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[questionIndex].answers[0],
      });

      setTimeout(() => onSelectAnswer(answer), 2000);
    }, 1000);
  };

  let answerState = ANSWER_STATE.unanswered;

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? ANSWER_STATE.correct : ANSWER_STATE.wrong;
  } else if (answer.selectedAnswer) {
    answerState = ANSWER_STATE.answered;
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};
