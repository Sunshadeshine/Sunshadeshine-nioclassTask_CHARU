import React, { useState, useEffect } from "react";
import { useMyContext } from "./context/MyContext.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MathJax from "react-mathjax";

import "./ALLCss.css";

function TestPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const { name, totalTime, checkedList } = useMyContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeUsedForEachQuestion, setTimeUsedForEachQuestion] = useState([]); // Add state for time used per question

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = [];

        for (let i = 0; i < checkedList.length; i++) {
          const response = await fetch(
            `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${checkedList[i]}`
          );
          const data = await response.json();
          const question = data[0]["Question"];
          fetchedQuestions.push(question);
        }

        setQuestions(fetchedQuestions);
        setTimeUsedForEachQuestion(new Array(fetchedQuestions.length).fill(0)); // Initialize time used array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (checkedList.length > 0) {
      fetchQuestions();
    }
  }, [checkedList]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);

      // Update time used for the current question
      setTimeUsedForEachQuestion((prevTimeUsed) => {
        const updatedTimeUsed = [...prevTimeUsed];
        updatedTimeUsed[currentQuestionIndex] =
          prevTimeUsed[currentQuestionIndex] + 1;
        return updatedTimeUsed;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < checkedList.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentTime(0);
    } else {
      navigate("/finish", { state: { timeUsedForEachQuestion } });
    }
  };

  useEffect(() => {
    if (
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < checkedList.length
    ) {
      if (currentTime >= 300) {
        // Adjusted to 5 minutes
        moveToNextQuestion();
      }
    }
  }, [currentTime, currentQuestionIndex]);

  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Clear the current timer
      clearInterval(timer);

      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);

      // Start a new timer with the remaining time for the previous question
      const remainingTimeForPreviousQuestion = currentTime;
      setCurrentTime(remainingTimeForPreviousQuestion);

      const newTimer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);

      // Set the new timer as the active timer
      setTimer(newTimer);
    }
  };

  const handleSubmit = () => {
    console.log("Time used for each question:", timeUsedForEachQuestion);

    navigate("/finish", { state: { timeUsedForEachQuestion, checkedList } });
  };

  return (
    <div className="container mt-4 textpage">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-3">Hello {name}!</h2>
          <div className="mb-3">Time: {300 - currentTime} seconds</div>
          {currentQuestionIndex < questions.length ? (
            <div>
              <h3>Question {currentQuestionIndex + 1}:</h3>
              <MathJax.Provider>
                <MathJax.Node formula={currentQuestion} />
              </MathJax.Provider>
            </div>
          ) : (
            <div>No more questions.</div>
          )}
          <div className="mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={moveToPreviousQuestion}
            >
              Previous
            </button>
            <button className="btn btn-primary" onClick={moveToNextQuestion}>
              Next
            </button>
          </div>
          {currentQuestionIndex === checkedList.length - 1 && (
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestPage;
