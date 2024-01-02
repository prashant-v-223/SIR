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
import { Progress, Spin, Tooltip } from "antd";
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

  const [Profile2, setProfile2] = React.useState([]);
  const [Profile1, setProfile1] = React.useState([]);
  useEffect(() => {
    getalldata1();
  }, []);

  const getalldata1 = async () => {
    const res = await dispatch(
      Wallatedata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      const resultArray = [];
      setProfile(res.payload.data.profile);
      for (const obj of res.payload.data?.ReffData1) {
        if (obj) {
          resultArray.push({
            totalInvestment: obj.teamtotalstack,
            username: obj.username,
          });
        }
      }
      let data = resultArray.sort(
        (e, s) => s.totalInvestment - e.totalInvestment
      );
      setProfile2(data);
    } else {
      navigation("/");
    }
  };
  const dispatch = useDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    getalldata();
  }, []);

  const data = [
    {
      name: "ACE",
      amount: 1000,
      amount1: 1000,
      rewordshow: Profile[0]?.Rank === "Trainee",
      renk: 1,
    },
    {
      name: "WARRIOR",
      amount: 7000,
      amount1: 8000,
      rewordshow: Profile[0]?.Rank === "ACE",
      renk: 2,
    },
    {
      name: "CADET",
      amount: 20000,
      amount1: 28000,
      rewordshow: Profile[0]?.Rank === "WARRIOR",
      renk: 3,
    },
    {
      name: "CAPTAIN",
      amount: 50000,
      amount1: 78000,
      rewordshow: Profile[0]?.Rank === "CADET",
      renk: 4,
    },
    {
      name: "COMMANDER",
      amount: 150000,
      amount1: 228000,
      rewordshow: Profile[0]?.Rank === "CAPTAIN",
      renk: 5,
    },
    {
      name: "PIONEER",
      amount: 300000,
      amount1: 528000,
      rewordshow: Profile[0]?.Rank === "COMMANDER",
      renk: 6,
    },
    {
      name: "MASTERMIND",
      amount: 700000,
      amount1: 12528000,
      rewordshow: Profile[0]?.Rank === "PIONEER",
      renk: 7,
    },
    {
      name: "RULER",
      amount: 1500000,
      amount1: 14028000,
      rewordshow: Profile[0]?.Rank === "MASTERMIND",
      renk: 8,
    },
    {
      name: "AMBASSADOR",
      amount: 3400000,
      amount1: 17428000,
      rewordshow: Profile[0]?.Rank === "RULER",
      renk: 9,
    },
    {
      name: "CROWN",
      amount: 7000000,
      amount1: 24428000,
      rewordshow: Profile[0]?.Rank === "AMBASSADOR",
      renk: 10,
    },
    {
      name: "CROWN AMBASSADOR",
      amount: 15000000,
      amount1: 39428000,
      rewordshow: Profile[0]?.Rank === "CROWN",
      renk: 11,
    },
  ];
  console.log("Profile2", data);
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
      setSIRprice(res.payload.data?.SIRprice);
    } else {
      navigation("/");
    }
  };
  // const getusertree = async (username) => {
  //   let headersList = {
  //     Accept: "*/*",
  //   };

  //   let reqOptions = {
  //     url: "https://api.sirglobal.org/api/profile/maintree",
  //     method: "POST",
  //     headers: headersList,
  //     data: {
  //       username: username,
  //     },
  //   };

  //   let response = await axios.request(reqOptions);
  //   setactivetree(response.data);
  // };
  // const getusertree1 = async (username) => {
  //   let headersList = {
  //     Accept: "*/*",
  //   };

  //   let reqOptions = {
  //     url: "https://api.sirglobal.org/api/profile/supportertree",
  //     method: "POST",
  //     headers: headersList,
  //     data: {
  //       username: username,
  //     },
  //   };

  //   let response = await axios.request(reqOptions);
  //   setactivetree1(response.data);
  // };
  console.log();
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
                      {/* <h6 style={{ color: "#fff" }}>{Profile[0]?.email}</h6> */}
                      {/* <h6 style={{ color: "#fff" }}>
                        {Profile[0]?.PhoneNumber}
                      </h6> */}
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
                      SIR Live Price
                    </h5>
                    <h4
                      className="pt-2 pb-2"
                      style={{
                        color: "#fff",
                      }}
                    >
                      ₹{StackingSlice.Wallatedata?.data?.SIRprice?.toFixed(2)}
                      {"  "}($
                      {Number(
                        StackingSlice.Wallatedata?.data?.SIRprice / 90
                      )?.toFixed(2)}
                      )
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
                        {StackingSlice.Wallatedata?.data?.income[0]?.holdincome?.toFixed(
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
                        <h6 className="m-0 px-3 text-dark">
                          {" "}
                          Total Investment
                        </h6>
                      </div>
                      <h6 className="m-0 px-3 text-dark">
                        USDT {Number(Profile[0]?.teamtotalstack).toFixed(2)}
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
                        StackingSlice.Wallatedata?.data?.mystack
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
                        Self SCB upcoming Income
                      </h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.income[0]
                          ?.amountupcommin1
                      )?.toFixed(2)}
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
                        src={require("./icons8-community-96 (1).png")}
                        alt=""
                        className="img-fluid  ps-3"
                        style={{ width: "65px" }}
                      />
                      <h6 className="m-0 px-3 text-dark">
                        Team SCB upcoming Income
                      </h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.income[0]
                          ?.amountupcomming
                      )?.toFixed(2)}
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
            <div className="row">
              {data.map((record, i) => {
                let a = record.amount1 * 0.5;
                let b = record.amount * 0.5;
                let b1 = record.amount * 0.25;
                let a1 = record.amount1 * 0.25;
                let lastteamtotalstack = 0;
                const lastThreeObjects = Profile2?.slice(2, -1);
                for (let index = 0; index < lastThreeObjects.length; index++) {
                  lastteamtotalstack += lastThreeObjects[index].totalInvestment;
                }
                console.log("lastteamtotalstack", lastteamtotalstack);
                if (record.rewordshow) {
                  return (
                    <>
                      <h5 className="text-dark pb-3 text-center py-4">
                        In Progress Rank : {record?.name}
                      </h5>
                      <div
                        className=" pt-4 pb-5 Portfolio3 w-75 m-auto"
                        style={{ border: "2px solid black" }}
                      >
                        <div className="d-md-flex justify-content-between align-items-center w-75 m-auto py-2">
                          <div className="px-5 d-flex justify-content-between align-items-center flex-column py-3">
                            <h5 className="text-dark pb-3">First Power</h5>
                            <Tooltip
                              placement="topLeft"
                              title={
                                record.rewordshow
                                  ? (Profile2[0]?.totalInvestment / a) * 100 >
                                    100
                                    ? 100 + "%"
                                    : (Profile2[0]?.totalInvestment / a) * 100
                                    ? (Profile2[0]?.totalInvestment / a) * 100
                                    : 0 + "%"
                                  : 0 + "%"
                              }
                            >
                              <Progress
                                type="circle"
                                percent={
                                  record.rewordshow
                                    ? (Profile2[0]?.totalInvestment /
                                        (record.amount1 * 0.5)) *
                                      100
                                    : 0
                                }
                                format={() => (
                                  <h6 className="mx-auto d-block p-0 text-center w-100 mb-4 text-dark">
                                    {b}
                                  </h6>
                                )}
                              />{" "}
                            </Tooltip>
                          </div>
                          <div className="px-5 d-flex justify-content-between align-items-center flex-column  py-3">
                            <h5 className="text-dark pb-3">Second Power</h5>
                            <Tooltip
                              placement="topLeft"
                              title={
                                record.rewordshow
                                  ? (Profile2[1]?.totalInvestment / a1) * 100 >
                                    100
                                    ? 100 + "%"
                                    : (Profile2[1]?.totalInvestment / a1) * 100
                                    ? (Profile2[1]?.totalInvestment / a1) * 100
                                    : 0 + "%"
                                  : 0 + "%"
                              }
                            >
                              <Progress
                                type="circle"
                                percent={
                                  record.rewordshow
                                    ? (Profile2[1]?.totalInvestment / a1) * 100
                                    : 0
                                }
                                format={() => (
                                  <h6 className="mx-auto d-block p-0 text-center w-100 mb-4 text-dark">
                                    {b1}
                                  </h6>
                                )}
                              />{" "}
                            </Tooltip>
                          </div>
                          <div className="px-5 d-flex justify-content-between align-items-center flex-column  py-3">
                            <h5 className="text-dark pb-3">Remaining Legs</h5>
                            <Tooltip
                              placement="topLeft"
                              title={
                                record.rewordshow
                                  ? (lastteamtotalstack / a1) * 100 > 100
                                    ? 100 + "%"
                                    : (lastteamtotalstack / a1) * 100
                                    ? (lastteamtotalstack / a1) * 100
                                    : 0 + "%"
                                  : 0 + "%"
                              }
                            >
                              <Progress
                                type="circle"
                                percent={
                                  record.rewordshow
                                    ? (lastteamtotalstack / a1) * 100
                                    : 0
                                }
                                format={() => (
                                  <h6 className="mx-auto d-block p-0 text-center w-100 mb-4 text-dark">
                                    {b1}
                                  </h6>
                                )}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <div className="row mb-5">
              <h1 className="text-dark py-4">EARNINGS</h1>

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
                    <h4 className="m-0 px-3 text-dark"> Staking Income 2X</h4>
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
                      <h6 className="m-0 px-3 text-dark">Total Earned</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.data[0]?.mainWallet
                      )?.toFixed(2)}
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
                      <h6 className="m-0 px-3 text-dark">Remaining Limit</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.mystack * 2 -
                          StackingSlice.Wallatedata?.data?.data[0]?.mainWallet
                      )?.toFixed(2)}
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
                      <h6 className="m-0 px-3 text-dark">Earning Limit</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      SIR{" "}
                      {Number(
                        StackingSlice.Wallatedata?.data?.mystack * 2
                      ).toFixed(2)}
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
                        src={require("./bitcoin-wallet.png")}
                        alt=""
                        style={{ width: "60px" }}
                      />
                    </div>
                    <h4 className="m-0 px-3 text-dark">Community Income 3X</h4>
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
                      <h6 className="m-0 px-3 text-dark">Total Earned</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      USDT{" "}
                      {StackingSlice.Wallatedata?.data?.data[0]?.incomeWallet?.toFixed(
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
                        style={{ width: "50px" }}
                        className="mx-2"
                      />
                      <h6 className="m-0 px-3 text-dark">Remaining Limit</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      USDT{" "}
                      {Number(
                        Profile[0]?.mystack * 3 -
                          StackingSlice.Wallatedata?.data?.data[0]
                            ?.incomeWallet >
                          0
                          ? Profile[0]?.mystack * 3 -
                              StackingSlice.Wallatedata?.data?.data[0]
                                ?.incomeWallet
                          : 0
                      )?.toFixed(2)}
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
                      <h6 className="m-0 px-3 text-dark">Earning Limit</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      USDT {Number(Profile[0]?.mystack * 3)?.toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>

              {/* <div className="col-12 col-md-6 py-3 py-md-0">
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
                        Profile[0]?.mystack * 3 -
                          StackingSlice.Wallatedata?.data?.data[0]
                            ?.incomeWallet >
                          0
                          ? Profile[0]?.mystack * 3 -
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
                      USDT {Number(Profile[0]?.mystack * 3)?.toFixed(2)}
                    </h4>
                  </div>
                  <div className="w-50 erning-imgs"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};
export default Dashboard;
