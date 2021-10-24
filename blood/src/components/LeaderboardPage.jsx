import React from "react";
import background from "../assets/blood.png";
import Leaderboard from "./Leaderboard"
import "./LeaderboardPage.css"

function LeaderboardPage() {
  
  return (
    <div className="bg-dim full-bg-size" style={{backgroundColor: "#FFFFF"}}>
      <Leaderboard />
    </div>

  );
}

export default LeaderboardPage;