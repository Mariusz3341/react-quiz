import React from "react";
import { Link } from "react-router-dom";
import PrintButton from "./PrintButton";

function QuizDifficulty(props) {
  return (
    <div>
      <h4 className="d-flex justify-content-center mb-3">Ile pytań?</h4>
      <Link to={`/quiz`} state={{ difficulty: 5 }}>
        <PrintButton class={"btn btn-primary mx-2"} value={"5 pytań"} />
      </Link>
      <Link to={`/quiz`} state={{ difficulty: 10 }}>
        <PrintButton class={"btn btn-primary mx-2"} value={"10 pytań"} />
      </Link>
      <Link to={`/quiz`} state={{ difficulty: 15 }}>
        <PrintButton class={"btn btn-primary mx-2"} value={"15 pytań"} />
      </Link>
    </div>
  );
}

export default QuizDifficulty;
