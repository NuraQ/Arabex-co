import { relative } from "path";
import React from "react";
import { NavLink } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LOGO from "../../LOGO.jpg";
import "./UpperBar.css";

const Upperbar = () => {
  return (
    <div className="App">
      <ul className="nav">
        <li style={{ width: 50, heigh: 50 }}>
          <img style={{ width: 50, heigh: 50 }} src={LOGO}></img>
        </li>
        <li
          style={{
            fontSize: "13px",
            color: "white",
            padding: "20px",
            wordWrap: "break-word",
            width: "250px",
          }}
        >
          EXPERTS FOR ARCHITECTURE AND CONSULTATION- ARABEX{" "}
        </li>
        <li style={{ paddingTop: 20, paddingLeft: 20 }}>
          <NavLink to="/" exact activeStyle={{ color: "green" }}>
            Home
          </NavLink>
        </li>
        <li style={{ paddingTop: 20, paddingLeft: 20 }}>
          <NavLink
            to={{ pathname: "/About", type: "owners" }}
            exact
            activeStyle={{ color: "green" }}
          >
            About
          </NavLink>
        </li>
        <li style={{ paddingTop: 20 }}>
          <NavLink to="/Add" exact activeStyle={{ color: "green" }}>
            Dashboard-App2
          </NavLink>
        </li>
        <li style={{ paddingTop: 20 }}>
          <NavLink to="/Update/villa" exact activeStyle={{ color: "green" }}>
            Update
          </NavLink>
        </li>
        <li style={{ paddingTop: 20 }}></li>
        <li style={{ paddingTop: 20 }}>
          <NavLink to="/Display" exact activeStyle={{ color: "green" }}>
            Display
          </NavLink>
        </li>

        <li className="hideColor" style={{ paddingTop: 20 }}>
          <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
            Projects
          </NavLink>
          <div style={{ position: relative, height: "50", width: "50" }}>
            <ul className="subNav">
              <li>
                <NavLink
                  to="/Conservation"
                  exact
                  activeStyle={{ color: "green" }}
                >
                  CONSERVATION
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  EDUCATIONAL
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  HOTELS
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  PLANNING
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  LANDSCAPING
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  PUBLIC
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  INDUSTRIAL
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  INDUSTRIAL
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  INDUSTRIAL
                </NavLink>
              </li>
              <li>
                <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
                  INDUSTRIAL
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Villas/INTERIOR_DESIGN"
                  exact
                  activeStyle={{ color: "green" }}
                >
                  INTERIOR DESIGN
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{ pathname: "/Villas/Villa", type: "Villa", sss: "ss" }}
                  exact
                  activeStyle={{ color: "green" }}
                >
                  VILLAS
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li style={{ paddingTop: 20 }}>
          <NavLink to="/Update" exact activeStyle={{ color: "green" }}>
            <img
              style={{ width: 16, height: 16 }}
              src=" https://www.iconfinder.com/icons/291786/download/png/256"
            ></img>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Upperbar;
