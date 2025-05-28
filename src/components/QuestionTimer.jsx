import { useEffect, useState } from "react";

export const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timerId = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timerId);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
};
