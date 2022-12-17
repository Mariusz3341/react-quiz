import React from "react";
import PropTypes from "prop-types";
import Question from "./Question";

function Review(props){
    return (
         <div >
             {props.questions.map(question => 
                <Question key={question.id} question={question}/>
             )}
        </div>
    );
}

Review.propTypes = { 
    questions: PropTypes.array
}

export default Review;