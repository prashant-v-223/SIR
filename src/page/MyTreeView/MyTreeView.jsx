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
const MyTreeView = () => {
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
        <div className="container-fluid ">
          <div className="mainsection">
            <div className="row">
              <div class="manage-flex pt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="149"
                  height="13"
                  viewBox="0 0 149 13"
                  fill="none"
                >
                  <g clip-path="url(#clip0_35_1925)">
                    <path
                      d="M142.304 2.34047C141.751 2.39634 141.253 2.39634 140.7 2.45221C139.981 2.50808 139.262 2.61981 138.487 2.67568C137.27 2.78742 136.053 3.01089 134.891 3.29023C133.619 3.62544 132.402 4.07239 131.24 4.68693C131.019 4.79867 130.798 4.96627 130.521 5.02214C130.245 5.13388 130.023 5.24562 129.747 5.35735C129.36 5.52496 129.028 5.63669 128.64 5.74843C128.198 5.86016 127.755 5.9719 127.313 6.02777C126.925 6.08364 126.538 6.08364 126.151 6.08364C125.764 6.08364 125.432 6.02777 125.045 6.02777C124.547 5.9719 124.049 5.86016 123.551 5.69256C123.053 5.52496 122.555 5.35735 122.057 5.13388C121.228 4.7428 120.398 4.29586 119.568 3.84891C119.181 3.62544 118.849 3.40197 118.462 3.12263C118.019 2.84329 117.576 2.56395 117.134 2.28461C116.802 2.06113 116.415 1.89353 116.028 1.72592C115.806 1.61419 115.53 1.55832 115.253 1.50245C114.976 1.44658 114.755 1.44658 114.479 1.39072C114.313 1.39072 114.147 1.39072 114.036 1.44658C113.815 1.50245 113.593 1.55832 113.372 1.61419C113.04 1.72592 112.708 1.89353 112.376 2.06113C111.713 2.39634 111.104 2.73155 110.44 3.06676C109.61 3.5137 108.836 3.90478 107.951 4.29586C107.453 4.51933 106.9 4.68693 106.402 4.85454C105.683 5.07801 105.019 5.18975 104.3 5.30148C103.636 5.41322 102.917 5.41322 102.253 5.46909C101.479 5.46909 100.704 5.41322 99.9296 5.30148C98.9339 5.13388 97.9934 4.96627 96.9977 4.7428C96.1126 4.51933 95.2275 4.23999 94.3977 3.90478C93.5679 3.5137 92.7381 3.12263 91.9083 2.67568C90.9679 2.17287 90.0275 1.67006 89.0317 1.33485C88.6445 1.16724 88.2572 1.11138 87.8147 0.999639C87.3721 0.887903 86.8742 0.887903 86.3764 0.887903C85.8785 0.887903 85.4359 0.999639 84.9381 1.11138C84.4402 1.22311 83.9976 1.44658 83.5551 1.67006C82.504 2.22874 81.5636 2.95502 80.6232 3.68131C80.07 4.12825 79.5168 4.5752 78.9636 5.02214C78.521 5.35735 78.0231 5.74843 77.5253 6.08364C77.0274 6.41885 76.4742 6.69819 75.921 6.97753C75.6444 7.08926 75.4231 7.201 75.1465 7.25687C74.8146 7.3686 74.4274 7.42447 74.0955 7.48034C73.9295 7.48034 73.8189 7.48034 73.6529 7.48034C73.5423 7.48034 73.4316 7.48034 73.321 7.48034C73.0444 7.42447 72.7678 7.31274 72.4912 7.201C71.4955 6.69819 70.555 6.08364 69.6699 5.41322C69.2274 5.07801 68.8401 4.7428 68.4529 4.35173C68.1763 4.07238 67.8997 3.84891 67.6231 3.56957C66.904 2.89915 66.2401 2.117 65.4657 1.50245C65.1337 1.27898 64.8018 1.05551 64.4146 0.832035C64.1933 0.720299 63.972 0.66443 63.7508 0.608562C63.6954 0.608562 63.5848 0.552694 63.5295 0.552694C63.3635 0.552694 63.1976 0.496826 63.0869 0.496826C63.0316 0.496826 62.921 0.496826 62.8656 0.496826H62.8103C62.6997 0.496826 62.5337 0.496826 62.4231 0.552694C62.1465 0.608562 61.9252 0.66443 61.6486 0.720299C61.1507 0.887903 60.6529 1.05551 60.155 1.27898C59.7678 1.44658 59.3805 1.61419 58.9933 1.83766C58.7167 1.9494 58.4401 2.117 58.1635 2.22874C57.7209 2.45221 57.3337 2.67568 56.8912 2.89915C56.6699 3.01089 56.4486 3.12263 56.2826 3.23436C55.8954 3.45784 55.5082 3.73718 55.1763 3.96065C54.8997 4.12825 54.6231 4.29586 54.3465 4.51933C53.6273 4.96627 52.9635 5.46909 52.2443 5.91603C50.7507 6.92166 49.2018 7.92728 47.5422 8.65357C47.155 8.82117 46.823 8.93291 46.4358 9.10051C45.9932 9.26812 45.4954 9.37986 44.9975 9.43572C44.7762 9.43572 44.6103 9.49159 44.389 9.49159C44.0571 9.49159 43.7805 9.49159 43.4486 9.43572C43.006 9.37986 42.5634 9.26812 42.1762 9.10051C41.7337 8.87704 41.2911 8.5977 40.9039 8.31836C40.24 7.81555 39.6868 7.201 39.1336 6.58645C38.8571 6.30711 38.5805 5.9719 38.3039 5.69256C37.9719 5.35735 37.5847 5.02214 37.2528 4.68693C36.9209 4.40759 36.6443 4.18412 36.257 4.01652C35.9251 4.12825 35.7038 4.01652 35.4826 3.96065C35.2613 3.90478 35.04 3.84891 34.8187 3.84891C34.6528 3.84891 34.5421 3.84891 34.3762 3.90478C34.1549 3.96065 33.9889 4.01652 33.7677 4.12825C33.6017 4.23999 33.3804 4.35173 33.2145 4.46346C33.0485 4.63107 32.8826 4.79867 32.7719 4.96627C32.4953 5.30148 32.2187 5.63669 31.9975 5.9719C31.7762 6.25124 31.5549 6.47471 31.3889 6.75405C31.1677 7.03339 30.8911 7.3686 30.6698 7.64794C30.1719 8.26249 29.6187 8.76531 29.0102 9.26812C28.5677 9.60333 28.0698 9.88267 27.5719 10.162C27.074 10.3296 26.6315 10.4413 26.1336 10.5531C25.4144 10.609 24.7506 10.609 24.0315 10.5531C22.9251 10.3855 21.874 10.0503 20.8229 9.60333C19.8825 9.15638 18.9974 8.70944 18.1123 8.15076C17.6697 7.87142 17.2272 7.59208 16.7846 7.25687C16.3421 6.97753 15.8995 6.64232 15.457 6.36298C15.0144 6.02777 14.5719 5.74843 14.1293 5.46909C13.6867 5.18975 13.1889 4.91041 12.691 4.68693C11.7506 4.23999 10.7548 3.96065 9.75908 4.01652C9.5378 4.01652 9.2612 4.07238 9.03992 4.07238C8.76333 4.12825 8.54205 4.18412 8.32077 4.23999C8.0995 4.29586 7.87822 4.40759 7.71226 4.46346C7.49098 4.5752 7.26971 4.68693 7.04843 4.7428C5.88672 5.13388 4.94629 5.69256 4.06118 6.30711C3.28671 6.86579 2.51224 7.48034 1.84841 8.20662C1.51649 8.54183 1.2399 8.87704 0.9633 9.21225C0.852661 9.37986 0.742022 9.54746 0.686703 9.77093C0.686703 9.8268 0.631383 9.93854 0.631383 9.9944C0.576064 10.162 0.576064 10.3296 0.520745 10.4972C0.465425 10.7207 0.520745 10.9442 0.686703 11.1118C0.852661 11.2235 1.07394 11.2794 1.29522 11.2235C1.46117 11.1676 1.57181 11.1118 1.73777 11.1118C1.95905 11.0559 2.12501 10.9442 2.34628 10.8324C2.62288 10.6648 2.73352 10.2737 2.56756 9.9944C2.45692 9.8268 2.34628 9.77093 2.18033 9.71506C2.73352 9.10051 3.34203 8.54183 3.95054 7.98315C5.00161 7.201 6.108 6.58645 7.2697 6.02777C7.5463 5.91603 7.8229 5.8043 8.09949 5.69256C8.43141 5.63669 8.81865 5.52496 9.15056 5.46909C9.48248 5.41322 9.75908 5.41322 10.091 5.46909C10.3123 5.52496 10.4782 5.52496 10.6995 5.58082C11.0314 5.69256 11.308 5.8043 11.5846 5.91603C12.1378 6.19537 12.691 6.47471 13.1889 6.80992C13.7974 7.201 14.3506 7.64794 14.9591 8.09489C15.5123 8.48597 16.1208 8.93291 16.7293 9.32399C17.3378 9.71506 17.9463 10.1061 18.5548 10.4413C19.7719 11.1118 21.0442 11.6704 22.3166 12.0615C23.6442 12.4526 25.0825 12.6202 26.5208 12.3967C27.1847 12.285 27.7932 12.1174 28.4017 11.8939C29.0102 11.6146 29.5634 11.3352 30.0613 10.9442C30.6145 10.5531 31.1123 10.0503 31.6102 9.54746C31.8868 9.26812 32.1081 8.98878 32.3294 8.70944C32.6613 8.26249 32.9932 7.87142 33.3251 7.42447C33.7123 6.92166 34.0996 6.36298 34.5975 5.86016C34.6528 5.86016 34.6528 5.8043 34.7081 5.8043C34.7634 5.8043 34.8187 5.74843 34.8741 5.74843H34.9294C35.04 5.74843 35.0953 5.8043 35.206 5.8043C35.4272 5.91603 35.6485 6.02777 35.8698 6.19537C36.4783 6.64232 36.9762 7.201 37.4741 7.75968C38.1379 8.4301 38.8017 9.15638 39.5209 9.77093C39.8528 10.0503 40.1847 10.2737 40.5166 10.4972C40.9039 10.7766 41.3464 10.9442 41.789 11.1118C42.1762 11.2794 42.6188 11.3352 43.0613 11.447C43.5592 11.5028 44.1124 11.5587 44.6103 11.5028C45.0528 11.5028 45.4954 11.3911 45.8826 11.3352C46.3805 11.2235 46.8784 11.0559 47.3762 10.8883C48.3167 10.5531 49.2018 10.1061 50.0316 9.6592C51.3039 8.98878 52.4656 8.15076 53.6273 7.3686C54.1805 6.97753 54.7337 6.58645 55.3422 6.19537C56.006 5.74843 56.6699 5.35735 57.3337 4.91041C57.389 4.85454 57.4997 4.79867 57.555 4.79867C57.7763 4.68693 57.9975 4.5752 58.2188 4.40759C58.5507 4.23999 58.8827 4.01652 59.2699 3.84891C59.3252 3.79304 59.4358 3.79304 59.4912 3.73718C59.7124 3.62544 59.989 3.5137 60.2103 3.40197C60.5976 3.23436 61.0401 3.01089 61.4273 2.84329C61.8146 2.67568 62.2571 2.56395 62.6997 2.45221C62.8103 2.45221 62.8656 2.45221 62.9763 2.45221C63.0316 2.45221 63.1422 2.45221 63.1976 2.45221C63.3635 2.50808 63.5295 2.56395 63.7508 2.61981C64.0274 2.78742 64.304 2.95502 64.5805 3.1785C65.4103 3.90478 66.1295 4.68693 66.904 5.41322C67.4018 5.86016 67.8997 6.30711 68.3976 6.75405C68.8955 7.14513 69.3933 7.48034 69.8912 7.87142C70.4444 8.26249 70.9976 8.54183 71.5508 8.87704C72.0487 9.15638 72.6572 9.32399 73.2104 9.43572C73.487 9.49159 73.7082 9.49159 73.9848 9.43572C74.3168 9.43572 74.6487 9.37986 74.9806 9.26812C75.5338 9.15638 76.087 8.98878 76.5848 8.76531C77.1934 8.48597 77.7466 8.20662 78.2998 7.87142C79.0742 7.3686 79.7381 6.80992 80.4572 6.25124C80.8444 5.91603 81.287 5.58082 81.6742 5.24562C82.0061 4.96627 82.3381 4.7428 82.67 4.46346C83.3891 3.90478 84.1083 3.45784 84.9381 3.06676C85.3253 2.89915 85.7125 2.78742 86.1551 2.73155C86.3764 2.73155 86.5423 2.67568 86.7636 2.67568C86.9296 2.67568 87.0955 2.67568 87.3168 2.73155C87.9806 2.84329 88.5891 3.01089 89.1977 3.23436C89.6955 3.45784 90.2487 3.73718 90.7466 3.96065C91.0785 4.12825 91.3551 4.29586 91.687 4.46346C91.9636 4.63107 92.2955 4.79867 92.6275 4.96627C93.236 5.24562 93.8445 5.52496 94.453 5.8043C95.1168 6.08364 95.7807 6.25124 96.4445 6.41885C97.8828 6.80992 99.3211 7.03339 100.759 7.201C101.479 7.31274 102.253 7.31274 102.972 7.31274C103.691 7.31274 104.41 7.201 105.13 7.08926C106.402 6.92166 107.674 6.53058 108.891 6.02777C109.666 5.69256 110.385 5.30148 111.159 4.91041C112.045 4.46346 112.93 3.96065 113.87 3.5137C114.036 3.45784 114.257 3.40197 114.423 3.3461C114.534 3.3461 114.645 3.3461 114.755 3.3461C115.032 3.40197 115.253 3.45784 115.53 3.56957C116.359 3.96065 117.079 4.51933 117.853 5.02214C118.628 5.58082 119.457 6.02777 120.287 6.47471C121.117 6.92166 122.002 7.25687 122.887 7.59208C123.883 7.92728 124.934 8.09489 125.985 8.15076C126.925 8.20662 127.866 8.09489 128.751 7.87142C129.525 7.70381 130.3 7.3686 131.019 7.03339C131.351 6.86579 131.628 6.75405 131.96 6.58645C132.181 6.47471 132.347 6.36298 132.568 6.25124C132.845 6.08364 133.177 5.9719 133.453 5.8043C134.947 5.18975 136.496 4.85454 138.1 4.63107C138.93 4.51933 139.815 4.46346 140.7 4.35173C141.419 4.29586 142.194 4.23999 142.913 4.18412C144.406 4.07239 145.955 3.96065 147.449 4.01652C148.057 4.01652 148.5 3.5137 148.5 2.95502C148.5 2.39634 148.002 1.89353 147.449 1.89353C146.287 1.89353 145.126 2.00526 144.019 2.06113C143.411 2.22874 142.857 2.28461 142.304 2.34047ZM114.257 3.40197C114.313 3.40197 114.313 3.40197 114.368 3.40197C114.313 3.40197 114.257 3.40197 114.257 3.40197Z"
                      fill="#013220"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_35_1925">
                      <rect
                        width="148"
                        height="12"
                        fill="white"
                        transform="translate(0.5 0.496826)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                <div class="manage-h">My CBB View</div>
              </div>
              <div class="d-flex justify-content-end pt-5 pb-3 px-4">
                <h4
                  class="p-2  text-center text-lg-left text-light btn btn-primary"
                  onClick={async () => {
                    getusertree(Profile && Profile[0]?.username);
                  }}
                >
                  <b> Back </b>
                </h4>{" "}
              </div>
              <div className="col-12 text-light py-2 px-4">
                <div
                  className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 "
                  style={{
                    cursor: "pointer",
                    overflowX: "scroll",
                    height: "800px !important",
                  }}
                >
                  <Tree
                    lineWidth={"4px"}
                    lineHeight={"35px"}
                    lineColor={"#000"}
                    lineBorderRadius={"10px"}
                    label={
                      <div
                        className="my-2"
                        onClick={async () => {
                          getusertree(activetree?.usernama);
                        }}
                      >
                        <img
                          src={require("../Dashboard/1-1-optimized 1.png")}
                          alt=""
                          className="img-fluid"
                          width={85}
                          height={85}
                        />
                        <h6
                          className="my-0 mx-3"
                          style={{
                            color: "#000",
                            fontSize: 18,
                          }}
                        >
                          {activetree?.usernama}
                        </h6>{" "}
                        <h6
                          className="my-0 mx-3"
                          style={{
                            color: "#000",
                            fontSize: 18,
                          }}
                        >
                          {activetree.Fullname}
                        </h6>
                      </div>
                    }
                  >
                    <div className="py-5 d-flex">
                      {activetree?.data &&
                        activetree?.data?.map((e) => {
                          const resultArray = [];
                          for (const obj of activetree?.data) {
                            if (obj) {
                              resultArray.push({
                                totalInvestment:
                                  obj.mystack + obj.teamtotalstack,
                                username: obj.username,
                              });
                            }
                          }
                          let data = resultArray.sort(
                            (e, s) => s.totalInvestment - e.totalInvestment
                          );
                          console.log(data[0].username);
                          return (
                            <>
                              <TreeNode
                                label={
                                  <>
                                    <div
                                      onMouseEnter={() =>
                                        setIsHovered1(e.username)
                                      }
                                      style={{
                                        filter:
                                          e.mystack === 0
                                            ? "blur(2px)"
                                            : "blur(0px)",
                                      }}
                                      onMouseLeave={() => setIsHovered1("")}
                                    >
                                      <div
                                        className=" my-2"
                                        style={{
                                          cursor: "pointer",
                                          position: "relative",
                                        }}
                                      >
                                        {data[0].username === e.username ? (
                                          <img
                                            src={require("../Dashboard/icons8-active-male-100.png")}
                                            alt=""
                                            className="img-fluid"
                                            width={70}
                                            height={70}
                                          />
                                        ) : data[1].username === e.username ? (
                                          <img
                                            src={require("../Dashboard/godigital_1939742712_popular-man (1)h 1.png")}
                                            alt=""
                                            className="img-fluid"
                                            width={70}
                                            height={70}
                                          />
                                        ) : (
                                          <img
                                            src={require("../Dashboard/1-1-optimized 1.png")}
                                            alt=""
                                            className="img-fluid"
                                            width={70}
                                            height={70}
                                          />
                                        )}
                                      </div>

                                      <h6
                                        className="my-0 mx-3"
                                        style={{
                                          color: "#000",
                                          fontSize: 18,
                                        }}
                                        onClick={async () => {
                                          getusertree1(e.username);
                                        }}
                                      >
                                        {e.username}
                                      </h6>
                                      {/* <h6
                                        className="my-0 mx-3"
                                        style={{
                                          color: "#000",
                                          fontSize: 18,
                                        }}
                                        onClick={async () => {
                                          getusertree1(e.username);
                                        }}
                                      >
                                        {e.Fullname}
                                      </h6> */}
                                    </div>
                                    {isHovered1 === e.username && (
                                      <div
                                        onMouseEnter={() =>
                                          setIsHovered1(e.username)
                                        }
                                        onMouseLeave={() => setIsHovered1("")}
                                        onClick={async () => {
                                          getusertree(e.username);
                                        }}
                                        style={{
                                          overflow: "scroll",
                                          position: "absolute",
                                          left: 0,
                                          background: "#fff",
                                          margin: 4,
                                          borderRadius: "20px",
                                          height: "200px",
                                          width: "99%",
                                          minWidth: "200px",
                                          zIndex: 9,
                                          top: "40px",
                                          border: "3px solid #000",
                                          borderRadius: "14px",
                                        }}
                                      >
                                        <div
                                          className=" my-2"
                                          style={{
                                            cursor: "pointer",
                                            position: "relative",
                                          }}
                                        >
                                          {data[0].username === e.username ? (
                                            <img
                                              src={require("../Dashboard/icons8-active-male-100.png")}
                                              alt=""
                                              className="img-fluid"
                                              width={70}
                                              height={70}
                                            />
                                          ) : data[1].username ===
                                            e.username ? (
                                            <img
                                              src={require("../Dashboard/godigital_1939742712_popular-man (1)h 1.png")}
                                              alt=""
                                              className="img-fluid"
                                              width={70}
                                              height={70}
                                            />
                                          ) : (
                                            <img
                                              src={require("../Dashboard/1-1-optimized 1.png")}
                                              alt=""
                                              className="img-fluid"
                                              width={70}
                                              height={70}
                                            />
                                          )}
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                          <div className="text-dark dd">
                                            Refer Code
                                          </div>
                                          <div className="text-dark dd">
                                            {e.refId}
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                          <div className="text-dark dd">
                                            Activation Date
                                          </div>
                                          <div className="text-dark dd">
                                            {new Date(
                                              e.createdAt
                                            ).toLocaleDateString()}
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                          <div className="text-dark dd">
                                            Self Stake
                                          </div>
                                          <div className="text-dark dd">
                                            {e.mystack?.toFixed(2)}
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                          <div className="text-dark dd">
                                            Team Stake
                                          </div>
                                          <div className="text-dark dd">
                                            {e.teamtotalstack?.toFixed(2)}
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                          <div className="text-dark dd">
                                            leval
                                          </div>
                                          <div className="text-dark dd">
                                            {e.leval}
                                          </div>
                                        </div>

                                        {/* <tr>
                                          <td className="text-dark">
                                            {e.Fullname}
                                          </td>
                                          <td className="text-dark">
                                            {e.mystack}
                                          </td>
                                          <td className="text-dark">
                                            {e.teamtotalstack}
                                          </td>
                                        </tr> */}
                                      </div>
                                    )}
                                  </>
                                }
                              />
                            </>
                          );
                        })}
                    </div>
                  </Tree>
                </div>
              </div>
            </div>
          </div>
          <div className="services-grid row"></div>
          <Modal show={open} onHide={() => setopen(!open)} centered>
            <Modal.Header>
              <Modal.Title>
                <h6 className="text-light m-0"></h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputField
                type="number"
                name="Amount1"
                value={otp}
                placeholder="Enter Your OTP"
                pattern="[0-9]*"
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                style={{ border: "1px solid #fff" }}
              />
              <InputField
                type="text"
                name="Amount1"
                value={address}
                placeholder="Enter Your Wallate Address"
                pattern="[0-9]*"
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                style={{ border: "1px solid #fff" }}
              />
              <Button
                className={" w-100 text-light"}
                Stake={!false}
                style={{
                  background: "#1a1a1a",
                  height: 60,
                  border: "none",
                }}
                label={"Submit"}
                onClick={async () => {
                  setopen(!open);
                  const res = await dispatch(
                    getdappWallatedata1({
                      otp: otp,
                      walletaddress: address,
                      Amount: 10,
                      Remark: "Airdrop wallate",
                      Token:
                        JSON.parse(localStorage.getItem("data")) &&
                        JSON.parse(localStorage.getItem("data")).data.token,
                    })
                  );
                  if (res.payload.data.isSuccess) {
                    getalldata();
                    toast.success(res.payload.data.message);
                  } else {
                    toast.error(res.payload.data.message);
                  }
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      </Spin>
    </>
  );
};

export default MyTreeView;
