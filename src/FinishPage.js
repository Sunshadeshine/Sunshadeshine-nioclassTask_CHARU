import React from "react";
import { useLocation } from "react-router-dom";

const FinishPage = () => {
  const location = useLocation();
  const { timeUsedForEachQuestion, checkedList } = location.state || [];

  const timeUsedList = [];
  for (let index = 0; index < timeUsedForEachQuestion.length; index++) {
    const time = timeUsedForEachQuestion[index];
    const QuesId = checkedList[index];
    timeUsedList.push(
      <li key={index}>
        ${QuesId} : {time} seconds
      </li>
    );
  }

  return (
    <div className="finish_page ">
      <div className="container mt-5 finish">
        <p>Thank you for completing the test!</p>

        <h2>Time Used for Each Question:</h2>
        <ul className="list-unstyled">{timeUsedList}</ul>
      </div>
    </div>
  );
};

export default FinishPage;
