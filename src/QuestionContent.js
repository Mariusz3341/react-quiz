import React from "react";
import PropTypes from "prop-types";

function QuestionContent(props) {
  return (
    <span className={props.class}>
      {props.tresc}
    </span>
  );
}

QuestionContent.propTypes = {
  tresc: PropTypes.string,
  class: PropTypes.string,
};

export default QuestionContent;
