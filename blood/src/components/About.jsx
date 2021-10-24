import React from "react";
import graphic from "../assets/infographic.png";


function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">About</h1>
            <p>
              HackGT 8 2021
            </p>
          </div>
          <img src={graphic} />
        </div>
      </div>
    </div>
  );
}

export default About;