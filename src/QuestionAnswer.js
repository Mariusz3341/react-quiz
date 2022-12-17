import React from "react";
import PropTypes from "prop-types";


function QuestionAnswer(props){
    
     return (
         <li>{props.odpowiedz}</li>
    );
    
}

QuestionAnswer.propTypes = { 
    odpowiedz: PropTypes.string
};

export default QuestionAnswer;