import React from "react";
import PropTypes from "prop-types";

function PrintButton(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      onClick={() => props.onClickFn()}
    />
  );
}

PrintButton.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onClickFn: PropTypes.func,
};

export default PrintButton;
