import React from "react";
import PropTypes from "prop-types";

function QuestionContent(props){

    return (
        <div>
            <p>{props.tresc}</p>
        </div>
    );
    
}

QuestionContent.propTypes = { 
    tresc: PropTypes.string
}

export default QuestionContent;