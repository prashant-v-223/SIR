import { useEffect } from "react";

import { Logo } from "../../data/data-layout/data-Header.js";

import { Addshrink, addActiveClass, OpenMenu, moveSmooth } from "../../utils/";

import "./header.css";

import Preloader from "../../components/Preloader";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();

  useEffect(() => {
    Addshrink();
  }, []);

  useEffect(() => {
    OpenMenu();
  }, []);

  useEffect(() => {
    moveSmooth();
  }, []);

  return (
    <>
      <Preloader />
      <header className="header-area wow fadeInDown" data-wow-delay="0.2s">
        <div className="classy-nav-container breakpoint-off">
          <div className="container">
            <nav
              className="classy-navbar justify-content-between"
              id="dreamNav"
            >
              <a className="nav-brand" href="#">
                <img
                  src={require("../../assets/img/Logo.png")}
                  alt="logo"
                  className="img-fluid"
                  width={180}
                />
              </a>
              <div className="classy-navbar-toggler">
                <span className="navbarToggler" onClick={addActiveClass}>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div className="classy-menu">
                <div className="classycloseIcon">
                  <div className="cross-wrap" onClick={addActiveClass}>
                    <span className="top" />
                    <span className="bottom" />
                  </div>
                </div>
                <div className="classynav">
                  <ul id="nav  d-flex justify-content-center align-content-center m-0">
                    <li>
                      <a
                        onClick={moveSmooth}
                        href="#about"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        <b>About</b>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={moveSmooth}
                        href="#UpcomingProjects"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        UUDT.Project
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={moveSmooth}
                        href="#faq"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        Faq
                      </a>
                    </li>{" "}
                    <li>
                      <a
                        onClick={moveSmooth}
                        href="#TOKENOMICS"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        Tokenomics
                      </a>
                    </li>
                    <li className="d-block d-lg-none">
                      <a
                        onClick={() => {
                          navigation("Roadmap");
                        }}
                        href="#contact"
                        style={{
                          fontWeight: 900,
                          fontSize: "11px",
                          color: "#fff",
                        }}
                      >
                        Roadmap
                      </a>
                    </li>
                    <li className="d-block d-lg-none">
                      <a
                        onClick={() => {
                          navigation("/login");
                        }}
                        href="#contact"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        Sign Up
                      </a>
                    </li>
                    <li className="d-block d-lg-none">
                      <a
                        onClick={() => {
                          navigation("/login?login");
                        }}
                        href="#contact"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        login
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={moveSmooth}
                        href="#contact"
                        style={{ fontWeight: 900, fontSize: "11px" }}
                      >
                        Contact us
                      </a>
                    </li>
                    <li className="d-none d-lg-inline-block">
                      <a
                        href="Roadmap"
                        style={{
                          fontWeight: 900,
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 1)",
                        }}
                        target={"_blank"}
                      >
                        Roadmap
                      </a>
                    </li>
                  </ul>
                  <div className="d-none d-lg-inline-block">
                    <div className="d-none d-md-flex ps-3 ps-md-0">
                      <a
                        className="btn login-btn mx-1 my-3 my-lg-4"
                        onClick={() => {
                          navigation("/login");
                        }}
                      >
                        Sign Up
                      </a>
                      <a
                        className="btn login-btn mx-1 my-4"
                        onClick={() => {
                          navigation("/login?login");
                        }}
                      >
                        login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
