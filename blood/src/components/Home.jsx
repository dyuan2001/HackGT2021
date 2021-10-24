import React from "react";
import background from "../assets/home_bkgdtxt.png";
import bloodtext from "../assets/text_blood.png"
import "../css/Home.css"

function Home() {
  return (
    <div className="home">
        <img className="background" src={background}/>
    </div>
  );
}

export default Home;