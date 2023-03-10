import React, { useEffect, useState } from "react";
import axios from "axios";

const app = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [play, setPlay] = useState(true);

  const fetchData = async (e) => {
    const data = await axios.get(
      "https://the-trivia-api.com/api/questions?categories=general_knowledge,geography,history,music,food_and_drink,film_and_tv,arts_and_literature,science,society_and_culture,sport_and_leisure&limit=10&region=IN&difficulty=easy"
    );
    setQuestionsData(data.data);
    setPlay(false);
  };

  const optionsData = [questionsData[currentIndex]?.correctAnswer].concat(
    questionsData[currentIndex]?.incorrectAnswers
  );

  const checkAnswer = (answer) => {
    if (answer === questionsData[currentIndex]?.correctAnswer) {
      setScore(score + 1);
    }

    if (currentIndex === questionsData.length - 1) {
      setQuizOver(true);
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <main>
      <button onClick={fetchData} className={play ? `playBtn` : `playBtnDlt`}>
        Play Quiz
      </button>
      {quizOver ? (
        <h2 className="score">
          Your Score {score} out of {questionsData.length}
          <a href="/">Refresh page</a>
        </h2>
      ) : (
        <div className={play ? `main-container-dlt` : `main-container`}>
          <div
            className="line"
            style={{ width: `${(currentIndex + 1) * questionsData.length}%` }}
          ></div>

          <div className="question">
            <div className="number">
              Question {currentIndex + 1}/{questionsData.length}
            </div>

            <div className="question-text">
              <h2>{questionsData[currentIndex]?.question}</h2>
            </div>

            <div className="tags">
              <span>{questionsData[currentIndex]?.category}</span>
            </div>
          </div>

          <div className="answerList">
            {optionsData.map((answer, index) => (
              <div
                className="answer"
                key={answer}
                onClick={() => checkAnswer(answer)}
              >
                <span>{index + 1}</span>
                <p>{answer}</p>
              </div>
            ))}
          </div>
          <div className="copyright">
            Made by <a href="https://github.com/SM8UTI/">@sm8uti</a>
          </div>
        </div>
      )}
    </main>
  );
};

export default app;
