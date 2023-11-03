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
  const [address, setaddress] = React.useState("");
  const [open, setopen] = React.useState(false);
  const [otp, setotp] = React.useState("");
  const [Profile, setProfile] = React.useState({});
  const [activetree, setactivetree] = React.useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
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
                      <h4 className="pt-4  pb-2 text-light">
                        <b>Total Available Balance</b>
                      </h4>
                      <h6 className="text-light">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]
                          ?.communities +
                          StackingSlice.Wallatedata?.data?.income[0]
                            ?.StakingBonusIncome +
                          StackingSlice.Wallatedata?.data?.income[0]
                            ?.ReferandEarn}
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
                      <h6 className="text-left pt-3" style={{ color: "#fff" }}>
                        {Profile[0]?.username}{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="p-3 text-center my-2 w-100 text-light"
                      style={{
                        background:
                          "linear-gradient(180deg, #4DD667 0%, #48C79C 100%)",
                      }}
                    >
                      New Stake
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 py-3 py-md-0">
                <div
                  className="Portfolio1 p-4 d-flex w-100"
                  style={{
                    zIndex: 99,
                  }}
                >
                  <div className="w-100">
                    <h5 className="text-light">My Total Investment</h5>
                    <h4 className="pt-2 pb-2">${Profile[0]?.teamtotalstack}</h4>
                    <div className="d-flex">
                      <div
                        className="w-50 bg-light p-4 mx-1 d-flex justify-content-between align-content-center"
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
                            width={60}
                          />
                        </div>
                      </div>
                      <div
                        className="w-50 bg-light p-4 mx-1 d-flex justify-content-between align-content-center"
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
                            width={60}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="p-3 text-center my-3 w-100 text-light"
                        style={{
                          background:
                            "linear-gradient(180deg, #4DD667 0%, #48C79C 100%)",
                        }}
                      >
                        New Stake
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4 d-flex justify-content-center">
              <div className="col-12 col-md-6  py-md-2">
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
                        width={70}
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
                        width={50}
                      />
                      <h6 className="m-0 px-3 text-dark">Self Staking</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $ {Profile[0]?.mystack ? Profile[0]?.mystack : 0}{" "}
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
                        style={{ width: "20%" }}
                      />
                      <h6 className="m-0 px-3 text-dark">SCB Income</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $
                      {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                        2
                      )}{" "}
                    </h6>
                  </div>{" "}
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
                        width={75}
                      />
                      <h6 className="m-0 px-3 text-dark">Total Team Staking</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      ${" "}
                      {Profile[0]?.teamtotalstack
                        ? Profile[0]?.teamtotalstack
                        : 0}{" "}
                    </h6>
                  </div>{" "}
                  <div
                    className="d-flex align-items-center justify-content-between bg-light my-2"
                    style={{
                      borderRadius: 12,
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div className="d-flex align-items-center py-2  ">
                      <img
                        src={require("./icons8-rocket-100.png")}
                        alt=""
                        width={75}
                      />
                      <h6 className="m-0 px-3 text-dark">Booster</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {Profile[0]?.STAKINGBOOSTER === true ? "ON" : "OFF"}{" "}
                    </h6>
                  </div>{" "}
                </div>
              </div>
              <div className="col-12 col-md-6  py-md-2">
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
                        width={70}
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
                    <div className="d-flex align-items-center px-2  py-4 ">
                      <img
                        src={require("./icons8-reward-100.png")}
                        alt=""
                        width={50}
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
                        className="img-fluid w-25 ps-3"
                      />
                      <h6 className="m-0 px-3 text-dark">CBB Income</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $ 0
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
                        style={{ width: "20%" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Royalty Rewards</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $ 0
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
                        style={{ width: "18%" }}
                      />
                      <h6 className="m-0 px-3 text-dark">Lifetime Achievement Reward</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $ 0
                    </h6>
                  </div>{" "}
                </div>
              </div>
              <div className="col-12 col-md-6  py-md-2">
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
                        width={70}
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
                        width={50}
                      />
                      <h6 className="m-0 px-3 text-dark">Staking Report</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $
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
                        width={50}
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
                <h4 className="text-dark">Staking Income 2X</h4>
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
                        SIR {Profile[0]?.mystack}
                      </h2>
                      <h4 className="pt-5 pb-2 text-dark d-flex   align-content-center">
                        <img src={require("./money.png")} alt="" width={30} />
                        <b>Remaining Limit</b>
                      </h4>
                      <h2 className="text-start text-dark">
                        SIR{" "}
                        {StackingSlice.Wallatedata?.data?.data[0]?.mainWallet.toFixed(
                          2
                        )}
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
                        SIR {Profile[0]?.mystack * 2}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 py-3 py-md-0">
                <h4 className="text-dark pt-4 pt-md-0">Community Income  3X</h4>
                <div
                  className="Portfolio234  d-flex w-100"
                  style={{
                    zIndex: 99,
                    border: "2px solid #000",
                    borderRadius: "16px",
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
                      USDT {Profile[0]?.mystack}
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
                      {StackingSlice.Wallatedata?.data?.data[0]?.incomeWallet?.toFixed(
                        2
                      )}{" "}
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
                      USDT {Profile[0]?.mystack * 3}
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
