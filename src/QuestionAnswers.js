import React from "react";
import PropTypes from "prop-types";
import QuestionAnswer from "./QuestionAnswer";

function QuestionAnswers(props) {
  return (
    <div>
      <ul>
        {props.odpowiedzi.map((odpowiedz) => (
          <QuestionAnswer key={odpowiedz} odpowiedz={odpowiedz} />
        ))}
      </ul>
    </div>
  );
}

QuestionAnswers.propTypes = {
  odpowiedzi: PropTypes.array,
};

export default QuestionAnswers;
