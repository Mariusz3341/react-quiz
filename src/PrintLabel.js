import React from "react";
import PropTypes from "prop-types";

function PrintLabel(props) {
  return <label>{props.inner}</label>;
}

PrintLabel.propTypes = {
  inner: PropTypes.string,
};

export default PrintLabel;
