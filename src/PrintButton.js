import React from "react";
import PropTypes from "prop-types";

function PrintButton(props) {
  return (
    <input
      className={props.class}
      type={props.type}
      value={props.value}
      onClick={(e) => props.onClickFn(e)}
      readOnly
    />
  );
}

PrintButton.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClickFn: PropTypes.func,
};

PrintButton.defaultProps = {
  onClickFn: () => {
    return;
  },
};

export default PrintButton;
