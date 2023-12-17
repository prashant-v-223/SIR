import "./Dashboard.scss";
import Navbar from "../../components/Navbar/Navbar";
import { MdContentCopy } from "react-icons/md";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {
  Wallatedata,
  getdappWallatedata,
  getdappWallatedata1,
} from "../../Redux/WallatedatSlice";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../../components/ButtonField";
import { Spin } from "antd";
import { Tree, TreeNode } from "react-organizational-chart";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fi";
import axios from "axios";
const Dashboard = () => {
  const StackingSlice = useSelector((state) => state.WallatedatSlice);
  const [Profile, setProfile] = React.useState({});
  const [SIRprice, setSIRprice] = React.useState(0);
  const [activetree, setactivetree] = React.useState({});
  const [activetree1, setactivetree1] = React.useState({});
  const dispatch = useDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    const res = await dispatch(
      Wallatedata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      setProfile(res.payload.data.profile);
      getusertree(res.payload.data.profile[0]?.username);
      getusertree1(res.payload.data.profile[0]?.username);
      setSIRprice(res.payload.data.SIRprice);
    } else {
      navigation("/");
    }
  };
  const getusertree = async (username) => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://api.sirglobal.org/api/profile/maintree",
      method: "POST",
      headers: headersList,
      data: {
        username: username,
      },
    };

    let response = await axios.request(reqOptions);
    setactivetree(response.data);
  };
  const getusertree1 = async (username) => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://api.sirglobal.org/api/profile/supportertree",
      method: "POST",
      headers: headersList,
      data: {
        username: username,
      },
    };

    let response = await axios.request(reqOptions);
    setactivetree1(response.data);
  };
  console.log(activetree);
  return (
    <>
      <Spin spinning={!StackingSlice.isLoader}>
        <Navbar />
        <div className="container-fluid   py-5 bg-light">
          <div className="container mainsection">
            <div className="row">
              <div className="col-12 col-md-6  py-md-0">
                <div
                  className="Portfolio p-4  w-100"
                  style={{
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex">
                    <div className="w-75">
                      <h4 className="pt-2 pb-2 text-light">
                        <b>Portfolio</b>
                      </h4>
                      <h5 className="text-light pb-3">
                        {Profile[0]?.Fullname}
                      </h5>
                      <h6 style={{ color: "#fff" }}>{Profile[0]?.email}</h6>
                      <h6 style={{ color: "#fff" }}>
                        {Profile[0]?.PhoneNumber}
                      </h6>
                    </div>
                    <div className="w-25">
                      <img
                        src={require("./1-1-optimized 1.png")}
                        alt=""
                        class="img-fluid"
                        width="100"
                        height="100"
                      />
                      <h6
                        className="text-left pt-3 ps-1 ps-md-3"
                        style={{ color: "#fff" }}
                      >
                        {Profile[0]?.username}{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="yorefer w-100 ">
                    <label for="website" className="text-light">
                      Your Referral Link:
                    </label>
                  </div>

                  <div className="container px-0 py-3">
                    <div className="copy-text  d-flex">
                      <input
                        type="text"
                        className="text"
                        value={`https://sirglobal.org/login/${Profile[0]?.username}`}
                        style={{ width: "90%", color: "#fff !important" }}
                      />
                      <button
                        style={{ width: "10%" }}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://sirglobal.org/login/${Profile[0]?.username}`
                          );
                          alert(
                            "Copied the text: " +
                              `https://sirglobal.org/login/${Profile[0]?.username}`
                          );
                        }}
                      >
                        <i className="fa fa-clone"></i>
                      </button>
                    </div>
                  </div>
                  <div className="d-md-flex">
                    <div
                      className="w-100 w-m-50 bg-light p-4 mx-0 d-flex justify-content-between align-content-center mt-3 mt-md-0 mx-md-1"
                      style={{
                        borderRadius: "12px",
                      }}
                    >
                      <div className="">
                        <h4 className="text-dark">{Profile[0]?.leval}</h4>
                        <h6 className="text-dark">Level</h6>
                      </div>
                      <div className="">
                        <img
                          src={require("./icons8-adjust-100 (1).png")}
                          alt=""
                          className="img-fluid"
                          style={{ width: "65px" }}
                        />
                      </div>
                    </div>
                    <div
                      className="w-100 w-m-50 bg-light p-4 mx-0 d-flex justify-content-between align-content-center mt-3 mt-md-0 mx-md-1"
                      style={{
                        borderRadius: "12px",
                      }}
                    >
                      <div className="">
                        <h4 className="text-dark">{Profile[0]?.Rank}</h4>
                        <h6 className="text-dark">Rank</h6>
                      </div>
                      <div className="">
                        <img
                          src={require("./icons8-rank-65.png")}
                          alt=""
                          className="img-fluid"
                          style={{ width: "65px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <a
                      href="/Staking"
                      className="p-3 text-center my-3 w-100 text-light"
                      style={{
                        background:
                          "linear-gradient(180deg, #4DD667 0%, #48C79C 100%)",
                        width: "100% !important",
                        display: "block",
                        borderRadius: 12,
                      }}
                    >
                      New Stake
                    </a>
                    <a
                      href="https://presale.sirtoken.io/"
                      target="_blank"
                      className="p-3 text-center mt-3 w-100 text-light"
                      style={{
                        background:
                          "linear-gradient(180deg, #4DD667 0%, #48C79C 100%)",
                        width: "100% !important",
                        display: "block",
                        borderRadius: 12,
                      }}
                    >
                      Buy SIR Token
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 py-3 py-md-0 ">
                <div
                  className="Portfolio1 p-4 d-flex w-100 "
                  style={{
                    zIndex: 99,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="w-100">
                    <h5
                      className="text-light"
                      style={{
                        color: "#fff",
                      }}
                    >
                      Total Investment
                    </h5>
                    <h4
                      className="pt-2 pb-2"
                      style={{
                        color: "#fff",
                      }}
                    >
                      USDT {Number(Profile[0]?.teamtotalstack).toFixed(2)}
                    </h4>
                    <div
                      className="d-flex align-items-center justify-content-between bg-light my-2"
                      style={{
                        borderRadius: 12,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <div className="d-flex align-items-center py-3  ">
                        <img
                          src={require("./icons8-earn-64.png")}
                          alt=""
                          className="img-fluid  ps-3"
                          style={{ width: "65px" }}
                        />
                        <h6 className="m-0 px-3 text-dark">CBB Hold </h6>
                      </div>
                      <h6 className="m-0 px-3 text-dark">
                        {" "}
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.holdcbbamout?.toFixed(
                          2
                        )}{" "}
                      </h6>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between bg-light my-2"
                      style={{
                        borderRadius: 12,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <div className="d-flex align-items-center py-3  ">
                        <img
                          src={require("./icons8-community-96 (1).png")}
                          alt=""
                          className="img-fluid  ps-3"
                          style={{ width: "65px" }}
                        />
                        <h6 className="m-0 px-3 text-dark">SCB Hold Income </h6>
                      </div>
                      <h6 className="m-0 px-3 text-dark">
                        {" "}
                        SIR{" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.amountupcomming?.toFixed(
                          2
                        )}{" "}
                      </h6>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between bg-light my-2"
                      style={{
                        borderRadius: 12,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <div className="d-flex align-items-center py-3  ">
                        <img
                          src={require("./icons8-community-96 (1).png")}
                          alt=""
                          className="img-fluid  ps-3"
                          style={{ width: "65px" }}
                        />
                        <h6 className="m-0 px-3 text-dark">
                          Today SCB Released{" "}
                        </h6>
                      </div>
                      <h6 className="m-0 px-3 text-dark">
                        SIR{" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.TodaStakingBonusIncome?.toFixed(
                          2
                        )}
                      </h6>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between bg-light my-2"
                      style={{
                        borderRadius: 12,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <div className="d-flex align-items-center py-3  ">
                        <img
                          src={require("./icons8-community-96 (1).png")}
                          alt=""
                          className="img-fluid  ps-3"
                          style={{ width: "65px" }}
                        />
                        <h6 className="m-0 px-3 text-dark">SIR Live Price</h6>
                      </div>
                      <h6 className="m-0 px-3 text-dark">
                        ₹{StackingSlice.Wallatedata?.data?.SIRprice?.toFixed(2)}
                        <br />$
                        {Number(
                          StackingSlice.Wallatedata?.data?.SIRprice / 90
                        )?.toFixed(2)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4 d-flex justify-content-center">
              <div className="col-12 col-md-6  py-2">
                <div
                  className="Portfolio3 p-4  w-100"
                  style={{
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="">
                      <img
                        src={require("./icons8-report-100.png")}
                        alt=""
                        width={85}
                      />
                    </div>
                    <h4 className="m-0 px-3 text-dark">Staking Report</h4>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center px-2  py-4 ">
                      <img
                        src={require("./icons8-self-64.png")}
                        alt=""
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Self Staking</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      SIR{" "}
                      {Number(
                        Profile[0]?.mystack ? Profile[0]?.mystack : 0
                      )?.toFixed()}{" "}
                    </h6>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-2  ">
                      <img
                        src={require("./icons8-hand-with-crypto-token-78 (3).png")}
                        alt=""
                        style={{ width: "75px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Total Team Staking</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      USDT{" "}
                      {Number(
                        Profile[0]?.teamtotalstack
                          ? Profile[0]?.teamtotalstack
                          : 0
                      )?.toFixed(2)}{" "}
                    </h6>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-2 ps-2 ">
                      <img
                        src={require("./icons8-rocket-100.png")}
                        alt=""
                        style={{ width: "75px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Booster</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {Profile[0]?.STAKINGBOOSTER === true ? "ON" : "OFF"}{" "}
                    </h6>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-4  ">
                      <img
                        src={require("./icons8-community-96 (1).png")}
                        alt=""
                        className="img-fluid  ps-3"
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">
                        SCB upcoming Income
                      </h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {StackingSlice.Wallatedata?.data?.income[0]?.total1?.toFixed(
                        2
                      )}{" "}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6  py-2">
                <div
                  className="Portfolio3 p-4  w-100"
                  style={{
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="">
                      <img
                        src={require("./icons8-badge-64 2.png")}
                        alt=""
                        width={85}
                      />
                    </div>
                    <h4 className="m-0 px-3 text-dark">Community Income</h4>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center px-2  py-3 ">
                      <img
                        src={require("./icons8-reward-100.png")}
                        alt=""
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Mentorship</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      $
                      {StackingSlice.Wallatedata?.data?.income[0]?.ReferandEarn?.toFixed(
                        2
                      )}
                    </h6>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-4  ">
                      <img
                        src={require("./icons8-earn-64.png")}
                        alt=""
                        className="img-fluid ps-3"
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">CBB </h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $
                      {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                        2
                      )}{" "}
                      {/* {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                        2
                      )} */}
                    </h6>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-4  ">
                      <img
                        src={require("./icons8-community-96 (1).png")}
                        alt=""
                        className="img-fluid  ps-3"
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Royalty</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark"> $ 0</h6>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-4  ">
                      <img
                        src={require("./icons8-community-96 (1).png")}
                        alt=""
                        className="img-fluid  ps-3"
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">LAR</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark"> $ 0</h6>
                  </div>{" "}
                </div>
              </div>
              <div className="col-12 col-md-6  py-2">
                <div
                  className="Portfolio3 p-4  w-100"
                  style={{
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="">
                      <img
                        src={require("./bitcoin-wallet.png")}
                        alt=""
                        style={{ width: "60px" }}
                      />
                    </div>
                    <h4 className="m-0 px-3 text-dark">Wallets</h4>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center px-2  py-4 ">
                      <img
                        src={require("./icons8-earn-64.png")}
                        alt=""
                        style={{ width: "50px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Staking Report</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.data[0]?.mainWallet
                      )?.toFixed(2)}{" "}
                    </h6>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-3  ">
                      <img
                        src={require("./icons8-community-96 (1).png")}
                        alt=""
                        style={{ width: "50px" }}
                        className="mx-2"
                      />
                      <h6 className="m-0 px-3 text-dark">Community Reward</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $
                      {StackingSlice.Wallatedata?.data?.data[0]?.incomeWallet?.toFixed(
                        2
                      )}{" "}
                    </h6>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <h1 className="text-dark py-4">EARNINGS</h1>
              <div className="col-12 col-md-6  py-md-0">
                <h4 className="text-dark pt-4 pb-1 pt-md-0">
                  Staking Income 2X
                </h4>
                <div
                  className=" p-4  w-100 aaa"
                  style={{
                    zIndex: 99,
                    border: "2px solid #000",
                    borderRadius: "16px",
                    height: "100%",
                  }}
                >
                  <div className="d-flex">
                    <div className="w-75">
                      <h4 className="pt-2 pb-2 text-dark d-flex   align-content-center">
                        <img
                          src={require("./return-on-investment.png")}
                          alt=""
                          width={30}
                        />
                        <b>Total Earned</b>
                      </h4>
                      <h2 className="text-start text-danger">
                        SIR
                        {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                          2
                        )}
                      </h2>
                      <h4 className="pt-5 pb-2 text-dark d-flex   align-content-center">
                        <img src={require("./money.png")} alt="" width={30} />
                        <b>Remaining Limit</b>
                      </h4>
                      <h2 className="text-start text-dark">
                        SIR{" "}
                        {Number(
                          Profile[0]?.mystack * 2 -
                            StackingSlice.Wallatedata?.data?.income[0]
                              ?.StakingBonusIncome >
                            0
                            ? Profile[0]?.mystack * 2 -
                                StackingSlice.Wallatedata?.data?.income[0]
                                  ?.StakingBonusIncome
                            : 0
                        )?.toFixed(2)}
                      </h2>
                    </div>
                    <div className="w-25">
                      <img
                        src={require("./profits 1.png")}
                        alt=""
                        class="img-fluid"
                        width="85"
                        height="85"
                      />
                      <h4 className="text-left pt-3" style={{ color: "#000" }}>
                        Earning Limit
                      </h4>
                      <h4 className="text-left pt-3 text-success">
                        SIR {Number(Profile[0]?.mystack * 2)?.toFixed(2)}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 py-3 py-md-0">
                <h4 className="text-dark pt-4 pt-md-0  mt-3 mt-md-0">
                  Community Income 3X
                </h4>
                <div
                  className="Portfolio234  d-flex w-100"
                  style={{
                    zIndex: 99,
                    border: "2px solid #000",
                    borderRadius: "16px",
                    height: "100%",
                  }}
                >
                  <div className="w-50 p-4">
                    <h4 className="pt-2  text-dark d-flex   align-content-center">
                      <img
                        src={require("./return-on-investment.png")}
                        alt=""
                        width={30}
                      />
                      <b>Total Earned</b>
                    </h4>{" "}
                    <h4 className="pt-2 m-0 text-danger">
                      USDT{" "}
                      {StackingSlice.Wallatedata?.data?.data[0]?.incomeWallet?.toFixed(
                        2
                      )}
                    </h4>
                    <h4 className="pt-2  text-dark d-flex   align-content-center">
                      <img
                        src={require("./money.png")}
                        alt=""
                        class="img-fluid"
                        width="30"
                      />
                      <b>Remaining Limit</b>
                    </h4>
                    <h4 className="pt-2 m-0 text-dark">
                      USDT{" "}
                      {Number(
                        ((Profile[0]?.mystack * 3) / 90) * SIRprice -
                          StackingSlice.Wallatedata?.data?.data[0]
                            ?.incomeWallet >
                          0
                          ? ((Profile[0]?.mystack * 3) / 90) * SIRprice -
                              StackingSlice.Wallatedata?.data?.data[0]
                                ?.incomeWallet
                          : 0
                      )?.toFixed(2)}
                    </h4>
                    <h4 className="pt-2  text-dark d-flex   align-content-center">
                      <img
                        src={require("./profits 1.png")}
                        alt=""
                        class="img-fluid"
                        width="30"
                      />
                      <b>Earning Limit</b>
                    </h4>
                    <h4 className="pt-2 m-0 text-success">
                      USDT{" "}
                      {(
                        Number((Profile[0]?.mystack * 3) / 90) * SIRprice
                      )?.toFixed(2)}
                    </h4>
                  </div>
                  <div className="w-50 erning-imgs"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};
export default Dashboard;
