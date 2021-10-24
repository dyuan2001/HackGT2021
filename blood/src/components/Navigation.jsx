import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser } from "../api/functions";
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Navigation(props) {

  console.log(cookies.get('Authorization'));

  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            BloodDonors
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/LeaderboardPage" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/LeaderboardPage">
                  Leaderboard
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/AppointmentCreation" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Appointments">
                  Appointments
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/StorePage" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Store">
                  Store
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li> 
              { cookies.get('Authorization') ?
                <li
                class={`nav-item  ${
                props.location.pathname === "/Profile" ? "active" : ""
                }`}
                >
                <Link class="nav-link" to="/Profile">
                Profile
                </Link>
                </li>
              : 
                <li
                class={`nav-item  ${
                props.location.pathname === "/LoginPage" ? "active" : ""
                }`}
                >
                <Link class="nav-link" to="/LoginPage">
                Login
                </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);