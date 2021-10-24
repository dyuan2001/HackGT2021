import React from "react";
import background from "../assets/blood.png";
import Store from "./Store"
import "./LeaderboardPage.css"

function StorePage() {
  return (
    <div className="bg-dim full-bg-size" style={{backgroundColor: "#FFFFF"}}>
      <Store />
    </div>
  );
}

export default StorePage;