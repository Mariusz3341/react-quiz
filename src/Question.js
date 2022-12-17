import React from "react";
import PropTypes from "prop-types";
import QuestionContent from "./QuestionContent";
import QuestionAnswers from "./QuestionAnswers";

function Question(props) {
  return (
    <div>
      <QuestionContent tresc={props.question.tresc} />
      <QuestionAnswers odpowiedzi={props.question.odpowiedzi} />
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object,
};

export default Question;
