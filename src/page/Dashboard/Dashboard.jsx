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
        <div className="container-fluid   pt-5 bg-light">
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
                      <h5 className="text-light">{Profile[0]?.Fullname}</h5>
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
                        src="data:image/png;base64,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"
                        alt=""
                        class="img-fluid"
                        width="85"
                        height="85"
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
                      ${" "}
                      {StackingSlice.Wallatedata?.data?.mystack
                        ? StackingSlice.Wallatedata?.data?.mystack
                        : 0}{" "}
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
                        width={75}
                      />
                      <h6 className="m-0 px-3 text-dark">Total Team Staking</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      ${" "}
                      {StackingSlice.Wallatedata?.data?.teamtotalstack
                        ? StackingSlice.Wallatedata?.data?.teamtotalstack
                        : 0}
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
                    <h4 className="m-0 px-3 text-dark">Rewards</h4>
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
                      <h6 className="m-0 px-3 text-dark">Referral and Earn</h6>
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
                      <h6 className="m-0 px-3 text-dark">Staking Bonus</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      ${" "}
                      {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                        2
                      )}
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
                      <h6 className="m-0 px-3 text-dark">Community Rewards</h6>
                    </div>
                    <h6 className="m-0 px-3 text-dark">
                      {" "}
                      $
                      {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                        2
                      )}{" "}
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
                        StackingSlice.Wallatedata?.data?.income[0]
                          ?.ReferandEarn +
                          StackingSlice.Wallatedata?.data?.income[0]
                            ?.StakingBonusIncome
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
                      {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                        2
                      )}{" "}
                    </h6>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
          <h1>EARNINGS</h1>
        </div>
      </Spin>
    </>
  );
};
export default Dashboard;
