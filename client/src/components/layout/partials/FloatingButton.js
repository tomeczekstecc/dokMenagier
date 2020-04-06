import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FloatingButton = (props) => {
  const { scale, text, linkTo, position, p_marginTop } = props;

  let icon, color, bootstrapClass;

  if (text === "Zobacz") {
    icon = "fa fa-list";
    color = "#5cb85c";
    bootstrapClass = "success";
  } else if (text === "Dodaj") {
    icon = "fa fa-plus";
    color = "#0275d8";
    bootstrapClass = "primary";
  }

  return (
    <Link to={`/${linkTo}`}>
      <div
        style={{
          position: `${position}`,
          bottom: "3vh",
          right: "3vw",
          textAlign: "center ",
          marginLeft: "50px",
        }}
      >
        <button
          style={{
            borderRadius: "50%",
            transform: `scale(${scale * 1.7})`,
            textAlign: "center ",
          }}
          type="button"
          class={`btn btn-${bootstrapClass}`}
        >
          <i class={icon}></i>
        </button>
        <p
          style={{
            marginTop: `${p_marginTop}`,
            transform: `scale(${scale})`,
            fontWeight: "bold",
            color: `${color}`,
            textAlign: "center ",
          }}
        >
          {text}
        </p>
      </div>
    </Link>
  );
};

FloatingButton.propTypes = {
  scale: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
FloatingButton.defaultProps = {
  scale: 1,
  text: "Tekst",
  color: "#0275d8",
  icon: "fa-list",
  position: "fixed",
  p_marginTop: "10px",
};

export default FloatingButton;
