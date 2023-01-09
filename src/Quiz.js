import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";

function Quiz(props) {
  const location = useLocation();
  const difficulty = location.state.difficulty;

  const [quizQuestions, setQuizQuestions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:7777/questions/").then((res) => {
      drawQuestions(res.data);
    });
  }, []);

  function drawQuestions(data) {
    let questions = [];
    let howMany = 0;
    while (howMany < difficulty) {
      const randIndex = Math.floor(Math.random() * data.length);
      if (questions.includes(data[randIndex])) {
        continue;
      }
      questions.push(data[randIndex]);
      howMany += 1;
    }
    setQuizQuestions(questions);
  }

  return (
    <div>
      {quizQuestions && <QuizQuestion questions={quizQuestions} difficulty={difficulty}/>}
    </div>
  );
}

export default Quiz;
