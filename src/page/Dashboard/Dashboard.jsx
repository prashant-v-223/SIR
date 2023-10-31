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
        <div className="container-fluid  bg-light">
          <div className="mainsection">
            <div class="d-flex justify-content-between pt-4 pb-3 px-4">
              <h5 class="pt-2 pt-lg-0 mb-2 text-center text-lg-left text-dark">
                Level : <b> {Profile[0]?.leval}</b>
              </h5>{" "}
              <h5 class="pt-2 pt-lg-0 mb-2 text-center text-lg-left text-dark">
                {" "}
                Rank : <b>{Profile[0]?.Rank}</b>
              </h5>{" "}
            </div>
            <div class="manage-flex">
              <div class="manage-h">Portfolio</div>
            </div>
            <div
              className="alert achiever-tag withdrawal-btn mx-1"
              role="alert"
              style={{ textAlign: "center", background: "#31A872" }}
            >
              <div className="">
                <h6
                  className="d-flex justify-content-center align-items-center"
                  style={{ color: "#fff", fontSize: 30 }}
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE9SURBVHgBvZaBbcIwEEW/IwZgg7oTtJ2AdIN0ArxJ1UnaETICTECYIOkEzQbXuzgBCyHwhdhP+gpS+P44nHNnEAERlXypWBuWZa3HWz2rYR1ZtTFmh0fgIMdqKR75roMWNlnWgebTyhqxYVvWHz2OrFHdC6toeba3HuMSO7tE1rRTjgkCW/gKTEHDFfwW7s4pfvF34PtR+Jx4itH7ifQMGSvyh9oqjOvRIzwpfFIj5Qr+DaKhgt5z8sojfUE+NkbKFud3Ywwdaz8tAN3f0YP0zK3SgQKZKeBbTC56CeyQj6ME7pGPRgJr5KMuxrGgQ3o6yZqq9AvpGTLC9nTgyyvSILt7lg/hOfxAmiMia75fvUO6vhhL1Fyz1BDlEAP5+aal+ciIaaGFEgzCJjK4hG+6UsXSP8NR/5e1Q+So/w/trp6lVKNCAgAAAABJRU5ErkJggg=="
                    alt=""
                    class="img-fluid"
                  />{" "}
                  <span className="px-3">Total My Investment</span>
                </h6>
                <h6
                  className="text-center py-2"
                  style={{ color: "#fff", fontSize: 24 }}
                >
                  {StackingSlice.Wallatedata?.data?.mystack
                    ? StackingSlice.Wallatedata?.data?.mystack
                    : 0}
                  $
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 p-3">
                <div class="manage-grid-2">
                  <div class="manage-grid-head">
                    <div class="manage-circle-flex">
                      <div class="manage-head-circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="33"
                          viewBox="0 0 32 33"
                          fill="none"
                        >
                          <path
                            d="M25.1946 10.9141L24.7691 10.4901C24.6865 10.4061 24.6386 10.2942 24.6386 10.1755V9.57816C24.6386 7.4355 22.8946 5.69144 20.7519 5.69144H20.1546C20.0372 5.69144 19.9224 5.64338 19.8398 5.56205L19.4159 5.13676C17.9013 3.62209 15.4359 3.61942 13.9186 5.13676L13.4947 5.56075C13.4121 5.64341 13.2973 5.69144 13.1799 5.69144H12.5826C10.4399 5.69144 8.6959 7.4355 8.6959 9.57816V10.1755C8.6959 10.2942 8.64936 10.4061 8.56536 10.4888L8.13991 10.9154C6.62524 12.4301 6.62524 14.8968 8.13991 16.4128L8.56536 16.8368C8.64803 16.9208 8.6959 17.0327 8.6959 17.1514V17.7487C8.6959 19.3821 9.71057 20.7768 11.1399 21.3514L9.03867 28.722C8.93467 29.0887 9.04796 29.4835 9.33196 29.7395C9.61463 29.9941 10.0173 30.0675 10.3733 29.9248L14.0641 28.4462C15.7441 27.7768 17.5918 27.7768 19.2691 28.4462L22.9625 29.9261C23.0838 29.9741 23.2106 29.9981 23.3346 29.9981C23.5786 29.9981 23.8172 29.9101 24.0038 29.7408C24.2878 29.4848 24.4011 29.0915 24.2971 28.7235L22.1959 21.3527C23.6252 20.7781 24.6399 19.3834 24.6399 17.75V17.1527C24.6399 17.034 24.6864 16.9221 24.7704 16.8394L25.1959 16.4141C25.1959 16.4141 25.1959 16.4141 25.1959 16.4128C26.7092 14.8968 26.7093 12.4301 25.1946 10.9141ZM20.0107 26.5874C17.8573 25.7288 15.4826 25.7274 13.3199 26.5874L11.5198 27.3088L13.1373 21.6355H13.1773C13.2947 21.6355 13.4091 21.6835 13.4918 21.7648L13.9159 22.1901C14.6733 22.9475 15.668 23.3275 16.6653 23.3275C17.66 23.3275 18.656 22.9488 19.4146 22.1901L19.8385 21.7661C19.9211 21.6835 20.0359 21.6355 20.1533 21.6355H20.1933L21.8105 27.3088L20.0107 26.5874ZM23.7812 14.9981L23.3561 15.4234C22.8934 15.8847 22.6399 16.4994 22.6399 17.1514V17.7487C22.6399 18.7887 21.7932 19.6355 20.7532 19.6355H20.1559C19.5119 19.6355 18.8814 19.8967 18.4267 20.3527L18.0025 20.7767C17.2892 21.4887 16.0466 21.4887 15.3333 20.7767L14.9091 20.3514C14.4544 19.8968 13.8253 19.6355 13.1799 19.6355H12.5826C11.5426 19.6355 10.6959 18.7887 10.6959 17.7487V17.1514C10.6959 16.4981 10.4427 15.8847 9.98008 15.4221L9.55462 14.9981C8.81995 14.2621 8.81995 13.0635 9.55462 12.3288L9.98008 11.9035C10.4427 11.4422 10.6959 10.8275 10.6959 10.1755V9.57816C10.6959 8.53816 11.5426 7.69144 12.5826 7.69144H13.1799C13.8239 7.69144 14.4544 7.43016 14.9091 6.97416L15.3333 6.55017C16.0466 5.83817 17.2892 5.83817 18.0025 6.55017L18.4267 6.97546C18.8814 7.43013 19.5105 7.69144 20.1559 7.69144H20.7532C21.7932 7.69144 22.6399 8.53816 22.6399 9.57816V10.1755C22.6399 10.8288 22.8934 11.4422 23.3561 11.9048L23.7812 12.3288C24.5159 13.0648 24.5159 14.2621 23.7812 14.9981ZM20.428 11.4328L18.7239 11.1861L17.9892 9.70609C17.7385 9.19943 17.2319 8.88611 16.6666 8.88611C16.0999 8.88611 15.5933 9.20076 15.344 9.70609L14.6093 11.1861L12.9052 11.4328C12.3572 11.5128 11.9092 11.8887 11.7385 12.4154C11.5665 12.9434 11.7081 13.5102 12.1054 13.8968L13.3359 15.0915L13.0559 16.7102C12.9599 17.2675 13.1839 17.8208 13.6399 18.1542C14.0959 18.4875 14.6919 18.5328 15.1959 18.2688L16.6666 17.4994L18.1386 18.2701C18.3559 18.3834 18.5905 18.4395 18.8251 18.4395C19.1305 18.4395 19.4359 18.342 19.6946 18.1527C20.1519 17.8194 20.3746 17.2661 20.2786 16.7115L19.9986 15.0887L21.2307 13.8941C21.6281 13.5074 21.768 12.9408 21.596 12.4128C21.424 11.8888 20.976 11.5128 20.428 11.4328ZM18.3961 13.8594C18.0521 14.1914 17.8958 14.6702 17.9771 15.1408L18.1266 16.0061L17.3346 15.5915C17.1266 15.4822 16.8972 15.4287 16.6679 15.4287C16.4372 15.4287 16.2067 15.4835 15.996 15.5928L15.2066 16.0061L15.3561 15.1395C15.4374 14.6689 15.2801 14.1914 14.9387 13.8594L14.3092 13.2487L15.1812 13.1234C15.6532 13.0554 16.0598 12.7609 16.2704 12.3342L16.6653 11.5394L17.0598 12.3342C17.2705 12.7609 17.6787 13.0567 18.148 13.1234L19.0214 13.25L18.3961 13.8594Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      <div
                        class="circle-para text-light"
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        <b> Stake</b>
                      </div>
                    </div>
                    <div class="manage-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        class="reward_eye"
                      >
                        <path
                          d="M28.3574 14.5107C26.6067 11.5787 22.6773 6.66016 16.0439 6.66016C9.4106 6.66016 5.48112 11.5787 3.73046 14.5107C2.81446 16.0414 2.81446 17.9442 3.73046 19.4762C5.48112 22.4082 9.4106 27.3268 16.0439 27.3268C22.6773 27.3268 26.6067 22.4082 28.3574 19.4762C29.2734 17.9442 29.2734 16.0427 28.3574 14.5107ZM26.6413 18.4495C25.1079 21.0175 21.6906 25.3268 16.0439 25.3268C10.3973 25.3268 6.97994 21.0189 5.4466 18.4495C4.9106 17.5509 4.9106 16.4348 5.4466 15.5361C6.97994 12.9681 10.3973 8.65885 16.0439 8.65885C21.6906 8.65885 25.1079 12.9668 26.6413 15.5361C27.1786 16.4361 27.1786 17.5509 26.6413 18.4495ZM16.0439 11.3268C12.9186 11.3268 10.3773 13.8695 10.3773 16.9935C10.3773 20.1175 12.9186 22.6602 16.0439 22.6602C19.1693 22.6602 21.7106 20.1175 21.7106 16.9935C21.7106 13.8695 19.1693 11.3268 16.0439 11.3268ZM16.0439 20.6602C14.0213 20.6602 12.3773 19.0162 12.3773 16.9935C12.3773 14.9708 14.0213 13.3268 16.0439 13.3268C18.0666 13.3268 19.7106 14.9708 19.7106 16.9935C19.7106 19.0162 18.0666 20.6602 16.0439 20.6602Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="row py-2 px-4">
                    <div class="col-md-4 d-flex justify-content-between d-md-block ">
                      <p class="manage-three-para-upper">Self Staking</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.mystack
                          ? StackingSlice.Wallatedata?.data?.mystack
                          : 0}
                      </p>
                    </div>{" "}
                    <div class="col-md-4 d-flex justify-content-between d-md-block">
                      <p class="manage-three-para-upper">Total Team Staking</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.teamtotalstack
                          ? StackingSlice.Wallatedata?.data?.teamtotalstack
                          : 0}
                      </p>
                    </div>
                    <div class="col-md-4 d-flex justify-content-between d-md-block">
                      <p class="manage-three-para-upper">Booster</p>
                      <p class="manage-three-para-lower" id="total_amount">
                        off
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 p-3">
                <div class="manage-grid-2">
                  <div class="manage-grid-head">
                    <div class="manage-circle-flex">
                      <div class="manage-head-circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="33"
                          viewBox="0 0 32 33"
                          fill="none"
                        >
                          <path
                            d="M25.1946 10.9141L24.7691 10.4901C24.6865 10.4061 24.6386 10.2942 24.6386 10.1755V9.57816C24.6386 7.4355 22.8946 5.69144 20.7519 5.69144H20.1546C20.0372 5.69144 19.9224 5.64338 19.8398 5.56205L19.4159 5.13676C17.9013 3.62209 15.4359 3.61942 13.9186 5.13676L13.4947 5.56075C13.4121 5.64341 13.2973 5.69144 13.1799 5.69144H12.5826C10.4399 5.69144 8.6959 7.4355 8.6959 9.57816V10.1755C8.6959 10.2942 8.64936 10.4061 8.56536 10.4888L8.13991 10.9154C6.62524 12.4301 6.62524 14.8968 8.13991 16.4128L8.56536 16.8368C8.64803 16.9208 8.6959 17.0327 8.6959 17.1514V17.7487C8.6959 19.3821 9.71057 20.7768 11.1399 21.3514L9.03867 28.722C8.93467 29.0887 9.04796 29.4835 9.33196 29.7395C9.61463 29.9941 10.0173 30.0675 10.3733 29.9248L14.0641 28.4462C15.7441 27.7768 17.5918 27.7768 19.2691 28.4462L22.9625 29.9261C23.0838 29.9741 23.2106 29.9981 23.3346 29.9981C23.5786 29.9981 23.8172 29.9101 24.0038 29.7408C24.2878 29.4848 24.4011 29.0915 24.2971 28.7235L22.1959 21.3527C23.6252 20.7781 24.6399 19.3834 24.6399 17.75V17.1527C24.6399 17.034 24.6864 16.9221 24.7704 16.8394L25.1959 16.4141C25.1959 16.4141 25.1959 16.4141 25.1959 16.4128C26.7092 14.8968 26.7093 12.4301 25.1946 10.9141ZM20.0107 26.5874C17.8573 25.7288 15.4826 25.7274 13.3199 26.5874L11.5198 27.3088L13.1373 21.6355H13.1773C13.2947 21.6355 13.4091 21.6835 13.4918 21.7648L13.9159 22.1901C14.6733 22.9475 15.668 23.3275 16.6653 23.3275C17.66 23.3275 18.656 22.9488 19.4146 22.1901L19.8385 21.7661C19.9211 21.6835 20.0359 21.6355 20.1533 21.6355H20.1933L21.8105 27.3088L20.0107 26.5874ZM23.7812 14.9981L23.3561 15.4234C22.8934 15.8847 22.6399 16.4994 22.6399 17.1514V17.7487C22.6399 18.7887 21.7932 19.6355 20.7532 19.6355H20.1559C19.5119 19.6355 18.8814 19.8967 18.4267 20.3527L18.0025 20.7767C17.2892 21.4887 16.0466 21.4887 15.3333 20.7767L14.9091 20.3514C14.4544 19.8968 13.8253 19.6355 13.1799 19.6355H12.5826C11.5426 19.6355 10.6959 18.7887 10.6959 17.7487V17.1514C10.6959 16.4981 10.4427 15.8847 9.98008 15.4221L9.55462 14.9981C8.81995 14.2621 8.81995 13.0635 9.55462 12.3288L9.98008 11.9035C10.4427 11.4422 10.6959 10.8275 10.6959 10.1755V9.57816C10.6959 8.53816 11.5426 7.69144 12.5826 7.69144H13.1799C13.8239 7.69144 14.4544 7.43016 14.9091 6.97416L15.3333 6.55017C16.0466 5.83817 17.2892 5.83817 18.0025 6.55017L18.4267 6.97546C18.8814 7.43013 19.5105 7.69144 20.1559 7.69144H20.7532C21.7932 7.69144 22.6399 8.53816 22.6399 9.57816V10.1755C22.6399 10.8288 22.8934 11.4422 23.3561 11.9048L23.7812 12.3288C24.5159 13.0648 24.5159 14.2621 23.7812 14.9981ZM20.428 11.4328L18.7239 11.1861L17.9892 9.70609C17.7385 9.19943 17.2319 8.88611 16.6666 8.88611C16.0999 8.88611 15.5933 9.20076 15.344 9.70609L14.6093 11.1861L12.9052 11.4328C12.3572 11.5128 11.9092 11.8887 11.7385 12.4154C11.5665 12.9434 11.7081 13.5102 12.1054 13.8968L13.3359 15.0915L13.0559 16.7102C12.9599 17.2675 13.1839 17.8208 13.6399 18.1542C14.0959 18.4875 14.6919 18.5328 15.1959 18.2688L16.6666 17.4994L18.1386 18.2701C18.3559 18.3834 18.5905 18.4395 18.8251 18.4395C19.1305 18.4395 19.4359 18.342 19.6946 18.1527C20.1519 17.8194 20.3746 17.2661 20.2786 16.7115L19.9986 15.0887L21.2307 13.8941C21.6281 13.5074 21.768 12.9408 21.596 12.4128C21.424 11.8888 20.976 11.5128 20.428 11.4328ZM18.3961 13.8594C18.0521 14.1914 17.8958 14.6702 17.9771 15.1408L18.1266 16.0061L17.3346 15.5915C17.1266 15.4822 16.8972 15.4287 16.6679 15.4287C16.4372 15.4287 16.2067 15.4835 15.996 15.5928L15.2066 16.0061L15.3561 15.1395C15.4374 14.6689 15.2801 14.1914 14.9387 13.8594L14.3092 13.2487L15.1812 13.1234C15.6532 13.0554 16.0598 12.7609 16.2704 12.3342L16.6653 11.5394L17.0598 12.3342C17.2705 12.7609 17.6787 13.0567 18.148 13.1234L19.0214 13.25L18.3961 13.8594Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      <div
                        class="circle-para text-light"
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        <b>Rewards </b>
                      </div>
                    </div>
                    <div class="manage-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        class="reward_eye"
                      >
                        <path
                          d="M28.3574 14.5107C26.6067 11.5787 22.6773 6.66016 16.0439 6.66016C9.4106 6.66016 5.48112 11.5787 3.73046 14.5107C2.81446 16.0414 2.81446 17.9442 3.73046 19.4762C5.48112 22.4082 9.4106 27.3268 16.0439 27.3268C22.6773 27.3268 26.6067 22.4082 28.3574 19.4762C29.2734 17.9442 29.2734 16.0427 28.3574 14.5107ZM26.6413 18.4495C25.1079 21.0175 21.6906 25.3268 16.0439 25.3268C10.3973 25.3268 6.97994 21.0189 5.4466 18.4495C4.9106 17.5509 4.9106 16.4348 5.4466 15.5361C6.97994 12.9681 10.3973 8.65885 16.0439 8.65885C21.6906 8.65885 25.1079 12.9668 26.6413 15.5361C27.1786 16.4361 27.1786 17.5509 26.6413 18.4495ZM16.0439 11.3268C12.9186 11.3268 10.3773 13.8695 10.3773 16.9935C10.3773 20.1175 12.9186 22.6602 16.0439 22.6602C19.1693 22.6602 21.7106 20.1175 21.7106 16.9935C21.7106 13.8695 19.1693 11.3268 16.0439 11.3268ZM16.0439 20.6602C14.0213 20.6602 12.3773 19.0162 12.3773 16.9935C12.3773 14.9708 14.0213 13.3268 16.0439 13.3268C18.0666 13.3268 19.7106 14.9708 19.7106 16.9935C19.7106 19.0162 18.0666 20.6602 16.0439 20.6602Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="row py-2 px-4">
                    <div class="col-md-4 d-flex justify-content-between d-md-block ">
                      <p class="manage-three-para-upper">Referral & Earn</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.ReferandEarn?.toFixed(
                          2
                        )}
                      </p>
                    </div>{" "}
                    <div class="col-md-4 d-flex justify-content-between d-md-block">
                      <p class="manage-three-para-upper">Staking Bonus</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div class="col-md-4 d-flex justify-content-between d-md-block">
                      <p class="manage-three-para-upper">Community reward</p>
                      <p class="manage-three-para-lower" id="total_amount">
                        $
                        {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                  {/* <div class="row py-2">
                    <div class="col-md-4">
                      <p class="manage-three-para-upper">Referral & Earn</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.ReferandEarn?.toFixed(
                          2
                        )}
                      </p>
                    </div>{" "}
                    <div class="col-md-4">
                      <p class="manage-three-para-upper">Staking Bonus</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div class="col-md-4">
                      <p class="manage-three-para-upper">Community reward</p>
                      <p class="manage-three-para-lower" id="total_amount">
                        $
                        {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-12 col-md-6 p-3">
                <div class="manage-grid-2">
                  <div class="manage-grid-head">
                    <div class="manage-circle-flex">
                      <div class="manage-head-circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="33"
                          viewBox="0 0 32 33"
                          fill="none"
                        >
                          <path
                            d="M28 3.99683H4C3.448 3.99683 3 4.44483 3 4.99683C3 5.54883 3.448 5.99683 4 5.99683H5V18.3302C5 21.5542 6.776 23.3302 10 23.3302H15V25.7955L11.4453 28.1648C10.9853 28.4715 10.8613 29.0915 11.168 29.5515C11.4733 30.0115 12.0933 30.1355 12.5547 29.8289L16 27.5315L19.4453 29.8289C19.616 29.9422 19.808 29.9968 20 29.9968C20.3227 29.9968 20.64 29.8408 20.8333 29.5515C21.14 29.0915 21.016 28.4715 20.556 28.1648L17.0013 25.7955V23.3302H22.0013C25.2253 23.3302 27.0013 21.5542 27.0013 18.3302V5.99683H28C28.552 5.99683 29 5.54883 29 4.99683C29 4.44483 28.552 3.99683 28 3.99683ZM25 18.3302C25 20.4328 24.1027 21.3302 22 21.3302H10C7.89733 21.3302 7 20.4328 7 18.3302V5.99683H25V18.3302ZM9.96 16.8289C9.56933 16.4382 9.56933 15.8048 9.96 15.4141L12.6627 12.7115C13.412 11.9622 14.632 11.9622 15.38 12.7115L16.952 14.2834L18.9693 12.2061H18C17.448 12.2061 17 11.7581 17 11.2061C17 10.6541 17.448 10.2061 18 10.2061H21.3333C21.464 10.2061 21.5933 10.2328 21.716 10.2834C21.96 10.3848 22.1547 10.5795 22.256 10.8248C22.3067 10.9475 22.3333 11.0768 22.3333 11.2074V14.5408C22.3333 15.0928 21.8853 15.5408 21.3333 15.5408C20.7813 15.5408 20.3333 15.0928 20.3333 14.5408V13.6222L18.256 15.6995C17.5067 16.4488 16.2867 16.4488 15.5387 15.6995L13.9667 14.1275L11.3747 16.8302C11.18 17.0248 10.924 17.1235 10.668 17.1235C10.412 17.1235 10.1547 17.0235 9.96 16.8289Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      <div
                        class="circle-para text-light"
                        style={{
                          fontSize: "28px",
                        }}
                      >
                        <b>Wallets </b>
                      </div>
                    </div>
                    <div class="manage-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        class="reward_eye"
                      >
                        <path
                          d="M28.3574 14.5107C26.6067 11.5787 22.6773 6.66016 16.0439 6.66016C9.4106 6.66016 5.48112 11.5787 3.73046 14.5107C2.81446 16.0414 2.81446 17.9442 3.73046 19.4762C5.48112 22.4082 9.4106 27.3268 16.0439 27.3268C22.6773 27.3268 26.6067 22.4082 28.3574 19.4762C29.2734 17.9442 29.2734 16.0427 28.3574 14.5107ZM26.6413 18.4495C25.1079 21.0175 21.6906 25.3268 16.0439 25.3268C10.3973 25.3268 6.97994 21.0189 5.4466 18.4495C4.9106 17.5509 4.9106 16.4348 5.4466 15.5361C6.97994 12.9681 10.3973 8.65885 16.0439 8.65885C21.6906 8.65885 25.1079 12.9668 26.6413 15.5361C27.1786 16.4361 27.1786 17.5509 26.6413 18.4495ZM16.0439 11.3268C12.9186 11.3268 10.3773 13.8695 10.3773 16.9935C10.3773 20.1175 12.9186 22.6602 16.0439 22.6602C19.1693 22.6602 21.7106 20.1175 21.7106 16.9935C21.7106 13.8695 19.1693 11.3268 16.0439 11.3268ZM16.0439 20.6602C14.0213 20.6602 12.3773 19.0162 12.3773 16.9935C12.3773 14.9708 14.0213 13.3268 16.0439 13.3268C18.0666 13.3268 19.7106 14.9708 19.7106 16.9935C19.7106 19.0162 18.0666 20.6602 16.0439 20.6602Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="row py-2 px-4">
                    <div class="col-md-6 d-flex justify-content-between d-md-block ">
                      <p class="manage-three-para-upper">Staking Reward</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.data[0].mainWallet?.toFixed(
                          2
                        )}
                      </p>
                    </div>{" "}
                    <div class="col-md-6 d-flex justify-content-between d-md-block">
                      <p class="manage-three-para-upper">Community Reward</p>
                      <p class="manage-three-para-lower" id="total_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.data[0].incomeWallet?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                  {/* <div class="row py-2">
                    <div class="col-md-6">
                      <p class="manage-three-para-upper">Staking Reward</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.data[0].mainWallet?.toFixed(
                          2
                        )}
                      </p>
                    </div>{" "}
                    <div class="col-md-6">
                      <p class="manage-three-para-upper">Community Reward</p>
                      <p class="manage-three-para-lower" id="upcoming_amount">
                        ${" "}
                        {StackingSlice.Wallatedata?.data?.data[0].incomeWallet?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div> */}
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
        </div>
      </Spin>
    </>
  );
};
export default Dashboard;
