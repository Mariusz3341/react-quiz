import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionContent from "./QuestionContent";
import { Link } from "react-router-dom";

function Review() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:7777/questions/").then((res) => {
      res.data.sort(function (a, b) {
        if (a.tresc < b.tresc) {
          return -1;
        }
        if (a.tresc > b.tresc) {
          return 1;
        }
        return 0;
      });
      setQuestions(res.data);
    });
  }, []);

  return (
    <div className="d-flex flex-row">
      <div className="card border border-secondary p-3 mx-5">
        <div className="card-body">
          <h2>Lista pytań</h2>

          <ul>
            {questions &&
              questions.map((question, index) => (
                <li key={index} type="1">
                  <Link to={`/questions/${question.id}`}>
                    <QuestionContent tresc={question.tresc} />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Review;
