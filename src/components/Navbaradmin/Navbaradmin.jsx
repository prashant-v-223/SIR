import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  MdDashboard,
  MdNotificationsActive,
  MdSupportAgent,
} from "react-icons/md";
import {
  FaDollarSign,
  FaUserCircle,
  FaUserFriends,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { RiCoinsFill } from "react-icons/ri";
import { TiArrowRepeatOutline } from "react-icons/ti";
import { BiLogInCircle, BiMenu, BiTransferAlt } from "react-icons/bi";
import { Dropdown } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Wallatedata } from "../../Redux/WallatedatSlice";
import { useSelector } from "react-redux";
function Navbar1() {
  const [Profile, setProfile] = React.useState(
    JSON.parse(localStorage.getItem("data")) &&
      JSON.parse(localStorage.getItem("data")).data.profile
  );
  const navigation = useNavigate();
  let windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <div className="headermain">
      <div
        className="justify-content-between px-4 py-2 align-items-center d-lg-flex d-none hedar"
        style={{ background: "#0a0a0a" }}
      >
        <div className="">
          <div className="p-1 ">
            <img
              src={require("../../assets/img/Logo.png")}
              alt=""
              width={180}
              height={75}
            />
          </div>
        </div>
        <div className="">
          <a href="/">
            <BiLogInCircle
              className="mx-3"
              style={{ color: "#44a08d", fontSize: "28px", cursor: "pointer" }}
            />
          </a>
          <button className="Username m-2 py-2 px-3">
            <FaUserCircle
              className="me-2"
              style={{ color: "#44a08d", fontSize: "23px" }}
            />
            Profile:Admin
          </button>
        </div>
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="hedar1"
      >
        <div className="">
          <img
            src={require("../../assets/img/Logo.png")}
            alt=""
            className="img-fluid d-lg-none d-block"
            width={120}
            height={"100%"}
          />
        </div>
        <div className="p-1">
          <MdNotificationsActive
            className="mx-1 mx-lg-3"
            style={{ color: "#44a08d", fontSize: "28px" }}
          />
          <BiLogInCircle
            className="mx-1 mx-lg-3"
            style={{
              color: "#44a08d",
              fontSize: "28px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigation("/");
            }}
          />
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mx-2 mx-lg-3"
          >
            <BiMenu style={{ color: "#44a08d", fontSize: "28px" }} />
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="px-4 px-lg-0">
            <Nav.Link
              className="d-flex justify-content-start align-items-center py-3 text-light"
              onClick={() => {
                navigation("/admin/Dashboard");
              }}
              style={{ fontSize: "13px" }}
            >
              <MdDashboard
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              User All Details
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              onClick={() => {
                navigation("/admin/tranforreport");
              }}
              style={{ fontSize: "13px" }}
            >
              <TiArrowRepeatOutline
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              Wallet Transfer Report
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              onClick={() => {
                navigation("/admin/withdraw_details");
              }}
              style={{ fontSize: "13px" }}
            >
              <RiCoinsFill
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              withdraw details
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/Totaltrem");
              }}
            >
              <FaUsers
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              All user income
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/daireactterm");
              }}
            >
              <FaDollarSign
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
               SIRToken price
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/Admin");
              }}
            >
              <FaUserFriends
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              Coins Tranfor
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-2 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/Support");
              }}
            >
              <MdSupportAgent
                className="ms-2 me-3"
                style={{ color: "#44a08d", fontSize: "20px" }}
              />
              Support
            </Nav.Link>
            {windowSize.current[0] < 992 && (
              <>
                <button className="Username m-2 py-2 px-3">
                  Username : {Profile.username}
                </button>
                <button className="Username m-2 py-2 px-3">
                  <FaUserCircle
                    className="me-2"
                    style={{ color: "#44a08d", fontSize: "23px" }}
                  />
                  Profile
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbar1;
