import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FloatingButton = (props) => {
  const { scale, text, linkTo, position, p_marginTop } = props;

  let icon, color, bootstrapClass;

  if (text === "Zarządzaj") {
    icon = "fa fa-cog";
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
          bottom: '3vh',
          right: '3vw',
          textAlign: 'center ',
          marginLeft: '50px',
        }}
      >
        <button
          style={{
            borderRadius: '50%',
            transform: `scale(${scale * 1.7})`,
            textAlign: 'center ',
          }}
          type='button'
          className={`btn btn-${bootstrapClass}`}
        >
          <i className={icon}></i>
        </button>
        <p
          style={{
            marginTop: `${p_marginTop}`,
            transform: `scale(${scale})`,
            fontWeight: 'bold',
            color: `${color}`,
            textAlign: 'center ',
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
  text: 'Tekst',
  color: '#2c405e',
  icon: 'fa-list',
  position: 'fixed',
  p_marginTop: '10px',
};

export default FloatingButton;
