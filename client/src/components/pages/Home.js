import React from "react";
import FloatingButton from "../layout/partials/FloatingButton";
import TopHeader from '../layout/partials/TopHeader'

const Home = () => {
  return (
    <>
    <TopHeader title='Start' icon='fas fa-home'/>
    <div style={style.main}>
      <div style={style.item}>
        <FloatingButton
          scale={2}
          text="Zarządzaj"
          linkTo="allpdfs"
          position="relative"
          p_marginTop='60px'
        />
      </div>

      <div style={style.item}>
        {" "}
        <FloatingButton
          scale={2}
          text="Dodaj"
          linkTo="newpdf"
          position="relative"
          p_marginTop='60px'
        />
      </div>
    </div>
    </>
  );
};

const style = {
  main: {
    position: "static",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    top: "40%",
    left: "45%",
  },
  item: {
    display: 'flex',
    flexDirectiom: 'column',


  },
};

export default Home;
