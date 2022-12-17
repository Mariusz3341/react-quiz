import React from "react";
import PropTypes from "prop-types";

function PrintInput(props) {
  return (
    <label>
      {props.label}
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={(e) => props.validateFn(e)}
      />
    </label>
  );
}

PrintInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  validateFn: PropTypes.func,
};

export default PrintInput;
