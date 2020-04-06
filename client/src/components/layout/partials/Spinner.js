import React, { Fragment } from "react";
import spinner from "../assets/spinner.gif";



const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt="Czekaj" />
    </Fragment>
  );
};
export default Spinner;
