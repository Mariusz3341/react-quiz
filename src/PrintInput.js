import React from "react";
import PropTypes from "prop-types";

function PrintInput(props) {
  return (
    <input
      className={props.class}
      type={props.type}
      id={props.id}
      value={props.value}
      name={props.name}
      onChange={(e) => props.validateFn(e)}
    />
  );
}

PrintInput.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  validateFn: PropTypes.func,
};

PrintInput.defaultProps = {
  validateFn: (e) => {
    return;
  },
};

export default PrintInput;
