import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdDashboard, MdSupportAgent } from "react-icons/md";
import {
  FaDollarSign,
  FaUserCircle,
  FaUserFriends,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { RiCoinsFill } from "react-icons/ri";
import { BiLogInCircle, BiMenu, BiTransferAlt } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Wallatedata } from "../../Redux/WallatedatSlice";
import { TiArrowRepeatOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
function Navbar1() {
  const [open, setopen] = React.useState(true);
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
        style={{ background: "#fff" }}
      >
        <div className="">
          <div
            className="p-1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigation("/dashboard");
            }}
          >
            <img
              src={"https://firebasestorage.googleapis.com/v0/b/doubtq-student.appspot.com/o/icon2.png?alt=media&token=7e933aff-37ab-46ae-a0c1-8180c2eaf931&_gl=1*10gdqfi*_ga*OTgwMjYzMTIyLjE2ODM5NTgxMTM.*_ga_CW55HF8NVT*MTY5NzE3NjcxMi4xMC4xLjE2OTcxNzY3NTguMTQuMC4w"}
              alt=""
              className="img-fluid"
              width={80}
            />
          </div>
        </div>
        <div className="">
          <BiLogInCircle
            className="mx-3"
            style={{ color: "#ccd700", fontSize: "26px", cursor: "pointer" }}
            onClick={() => {
              window.location.replace("https://sir-amber.vercel.app/");
            }}
          />
          {Profile.username && (
            <button className="Username m-2 py-2 px-3">
              Username : {Profile.username}
            </button>
          )}
          <button
            className="Username m-2 py-2 px-3"
            onClick={() => {
              navigation("/Profile");
            }}
          >
            <FaUserCircle
              className="me-2"
              style={{ color: "#ccd700", fontSize: "23px" }}
            />
            Profile
          </button>
        </div>
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="hedar1"
      >
        <div className="">
          <img
            src={"https://firebasestorage.googleapis.com/v0/b/doubtq-student.appspot.com/o/icon2.png?alt=media&token=7e933aff-37ab-46ae-a0c1-8180c2eaf931&_gl=1*10gdqfi*_ga*OTgwMjYzMTIyLjE2ODM5NTgxMTM.*_ga_CW55HF8NVT*MTY5NzE3NjcxMi4xMC4xLjE2OTcxNzY3NTguMTQuMC4w"}
            alt=""
            className="img-fluid d-lg-none d-block mx-4"
            width={70}
            height={"100%"}
          />
        </div>
        <div className="p-1">
          {windowSize.current[0] < 992 && (
            <>
              <BiLogInCircle
                className="mx-1 mx-lg-3"
                style={{
                  color: "#ccd700",
                  fontSize: "26px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigation("/");
                }}
              />
            </>
          )}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mx-2 mx-lg-3"
            onClick={() => {
              setopen(!open);
            }}
          >
            {open ? (
              <BiMenu style={{ color: "#ccd700", fontSize: "26px" }} />
            ) : (
              <IoMdClose style={{ color: "#ccd700", fontSize: "26px" }} />
            )}
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="px-4 px-lg-0">
            <Nav.Link
              className="d-flex justify-content-start align-items-center py-3 text-light"
              onClick={() => {
                navigation("/dashboard");
              }}
              style={{ fontSize: "13px" }}
            >
              <MdDashboard
                className="ms-2 me-3"
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              onClick={() => {
                navigation("/Withdrawal");
              }}
              style={{ fontSize: "13px" }}
            >
              <FaWallet
                className="ms-2 me-3"
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
              Wallet & Withdrawal
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              onClick={() => {
                navigation("/Staking");
              }}
              style={{ fontSize: "13px" }}
            >
              <RiCoinsFill
                className="ms-2 me-3"
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
               SIR Staking
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
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
              My SIR Total Team
            </Nav.Link>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-3 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/daireactterm");
              }}
            >
              <FaUserFriends
                className="ms-2 me-3"
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
               My SIR Direct Team
            </Nav.Link>
            {Profile?.Roll === "admin" && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  className="d-flex justify-content-start align-items-center px-0  py-3 text-light"
                  style={{ border: "none", color: "#fff", fontSize: "13px" }}
                >
                  <FaUserFriends
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Admin
                </Dropdown.Toggle>

                <Dropdown.Menu className="py-2">
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/admin/Dashboard");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <MdDashboard
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                    User All Details
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/admin/withdraw_details");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <RiCoinsFill
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                    Withdraw Details
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/admin/Transfer");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                    Transfer USDT
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/admin/Banars");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                    Add Banners
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/Staking/Active");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                    Staking Active
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="py-2"
                    onClick={() => {
                      navigation("/admin/support");
                    }}
                    style={{ border: "none", fontSize: "15px" }}
                  >
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#ccd700", fontSize: "26px" }}
                    />
                     SIR Support Details
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Dropdown>
              <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="d-flex justify-content-start align-items-center px-0  py-3 text-light"
                style={{ border: "none", color: "#fff", fontSize: "13px" }}
              >
                <FaDollarSign
                  className="ms-2 me-3"
                  style={{ color: "#ccd700", fontSize: "26px" }}
                />
                My Income
              </Dropdown.Toggle>

              <Dropdown.Menu className="py-2">
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/mian/Withdrawal");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Main Wallet Report
                </Dropdown.Item>
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/SIR/Withdrawal");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Income Wallet Report
                </Dropdown.Item>
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/SIR/Withdrawal");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Income Wallet Report
                </Dropdown.Item>{" "}
                {/* <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/Withdrdata");
                  }}
                  style={{ border: "none", fontSize: "15px" }}
                >
                  <RiCoinsFill
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Withdraw Details
                </Dropdown.Item> */}
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/staking/income");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Staking Bonus
                </Dropdown.Item>
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/ReferAndEarn/income");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                  Refer And Earn
                </Dropdown.Item>
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/Community/Building/income");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                   SIR Community Reward
                </Dropdown.Item>{" "}
                <Dropdown.Item
                  className="py-2"
                  onClick={() => {
                    navigation("/Achievementbouns/Building/income");
                  }}
                >
                  <FaDollarSign
                    className="ms-2 me-3"
                    style={{ color: "#ccd700", fontSize: "26px" }}
                  />
                   SIR Achievement Reward
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link
              className="d-flex justify-content-start align-items-center  py-2 text-light"
              style={{ fontSize: "13px" }}
              onClick={() => {
                navigation("/Support");
              }}
            >
              <MdSupportAgent
                className="ms-2 me-3"
                style={{ color: "#ccd700", fontSize: "26px" }}
              />
              Support
            </Nav.Link>
            {windowSize.current[0] < 992 && (
              <>
                <button className="Username m-2 py-2 px-3">
                  Username : {Profile.username}
                </button>
                <button
                  className="Username m-2 py-2 px-3"
                  onClick={() => {
                    navigation("/Profile");
                  }}
                >
                  <FaUserCircle
                    className="me-2"
                    style={{ color: "#e5e500", fontSize: "23px" }}
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
