import { useCallback, useState } from "react";

import { QuestionTimer } from "./QuestionTimer";
import { Answers } from "./Answers";

import { ANSWER_STATE } from "../constants";
import QUESTIONS from "../questions";

import quizCompleteImg from "../assets/quiz-complete.png";

export const Quiz = () => {
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

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
};
