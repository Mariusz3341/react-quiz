import PropTypes from "prop-types";

function Error(props) {
  return (
    <span>
      {props.status ? (
        <span style={{ color: "green", fontFamily: "italic" }}>
          {props.info}
        </span>
      ) : (
        <span style={{ color: "red", fontFamily: "italic" }}>{props.info}</span>
      )}
    </span>
  );
}

Error.propTypes = {
  status: PropTypes.bool,
  info: PropTypes.string,
};

export default Error;
