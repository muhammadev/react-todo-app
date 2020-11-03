import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MenuBar extends Component {

  state = {
    mode: localStorage.getItem("user-mode")
  }

  toggleMode = () => {
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("user-mode", "dark");
      this.setState({mode: "dark"})
    } else {
      localStorage.setItem("user-mode", "light")
      this.setState({mode: "light"})
    }
  }

  componentDidMount() {
    let menu = document.querySelector(".menu-bar");
    let icon = document.querySelector(".menu-icon");
    window.addEventListener("click", function(e) {
      let isOpened = menu.classList.contains("menu-opened");
      let isOverMenu = menu.contains(e.target);
      let isOverIcon = icon.contains(e.target);
      if (isOpened && !isOverMenu && !isOverIcon) {
        icon.click();
      }
    })

    let toggleBtn = document.querySelector(".toggle");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("dark")
      document.body.classList.toggle("dark")
      this.toggleMode();
    })
  }
  render() {
    return (
      <div className="menu-bar">
        <div
          className="menu-icon close-icon"
          onClick={(e) => {
            let menu = document.querySelector(".menu-bar");
            menu.classList.toggle("menu-opened");
          }}
        >
          <span className="one"></span>
          <span className="two"></span>
          <span className="three"></span>
        </div>
        <div id='modeToggler' className="mode-toggler">
          <div id="toggleBtn" className="toggle fake"></div>
        </div>
        <div className="menu-links">
          <ul>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active-nav-link"
              className="menu-link"
            >
              <li
                onClick={(e) => {
                  let menu = document.querySelector(".menu-bar");
                  menu.classList.toggle("menu-opened");
                }}
              >
                Notes
              </li>
            </NavLink>
            <NavLink
              to="/archived-notes"
              activeClassName="active-nav-link"
              className="menu-link"
            >
              <li
                onClick={(e) => {
                  let menu = document.querySelector(".menu-bar");
                  menu.classList.toggle("menu-opened");
                }}
              >
                Archive
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuBar;
