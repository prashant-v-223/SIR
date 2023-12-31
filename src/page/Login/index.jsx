import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "react-bootstrap";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  WalletFilled,
  MailFilled,
  LockFilled,
  UsergroupAddOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Foegotpassword, Signin, Signup } from "../../Redux/authSlice";
import { toast } from "react-toastify";
import { Checkbox, Spin } from "antd";
import bep20Abi from "../../Helpers/bep20Abi.json";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import Web3 from "web3";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const location = useLocation();
  console.log(location.search.split("?")[1]);
  console.log(
    location?.pathname?.split("/").length >= 2
      ? location?.pathname?.split("/")
      : ""[2]
  );
  const [type, settype] = useState(!location.search ? true : false);
  const [check, setcheck] = useState(true);
  const [loadding, setloadding] = useState(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const navigation = useNavigate();
  const projectId = "542464957793e9ac764c03d5f58d44db";
  useEffect(() => {
    localStorage.clear();
  }, []);

  const SignupUser = () => {
    const [finnduser, setfinnduser] = React.useState("");
    const { active, account, library, connector, activate, deactivate, error } =
      useWeb3React();
    const [reCAPTCHA, setReCAPTCHA] = useState("");
    const [otp, setotp] = useState("");
    const [data, setdata] = useState({});
    const [values, setValues] = React.useState({
      Walletaddress: "ssssss",
      Email: "",
      phone: "",
      username: "",
      OTP: "",
      Password: "",
      Reenterpassword: "",
      referralId: location?.pathname?.split("/")[2]
        ? location?.pathname?.split("/")[2]
        : "SIR",
    });

    const [wallet, setWallet] = React.useState("");
    const [eqxBalance, setEqxBalance] = React.useState(0);
    useEffect(() => {
      getdata();
    }, [location]);
    const getdata = async () => {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };
      let response = await fetch(
        `https://api.sirglobal.org/api/user/usernametogetfullname/${
          location?.pathname?.split("/").length >= 2
            ? location?.pathname?.split("/")[2]
            : ""
        }`,
        {
          method: "GET",
          headers: headersList,
        }
      );

      let data = await response.text();
      let res = JSON.parse(data);
      if (res.data.length > 0) {
        setfinnduser(res.data[0].Fullname);
      } else {
        setfinnduser("");
      }
    };
    // const { auth, spinner } = props;
    const getWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        return web3;
      } catch (err) {
        console.log("error", err);
      }
    };

    const getBalance = async () => {
      try {
        console.log(account);
        if (account) {
          let web3 = await getWeb3();
          let contract = await new web3.eth.Contract(
            bep20Abi,
            "0xF3AA64D50dae6eB524c8DC4540e8fcB37ecc8386"
          );
          const decimal = await contract.methods.decimals().call();
          await contract.methods
            .balanceOf(account)
            .call()
            .then((balance) => {
              balance = balance / 10 ** decimal;
              console.log("balance", balance);
            });
        }
      } catch (error) {}
    };

    const [validations, setValidations] = React.useState({
      Walletaddress: "",
      Email: "",
      Password: "",
      phone: "",
      Reenterpassword: "",
      username: "",
      referralId: "",
    });

    const validateAll = () => {
      const { Walletaddress, Email, Password, referralId } = values;
      const validations = {
        Walletaddress: "",
        Email: "",
        Password: "",
        phone: "",
        Reenterpassword: "",
      };
      let isValid = true;
      if (!phone) {
        validations.phone = "PhoneNumber is required!";
        isValid = false;
      }
      if (!Email) {
        validations.Email = "Email is required!";
        isValid = false;
      }
      if (!username) {
        validations.username = "Fullname is required!";
        isValid = false;
      }
      if (!referralId) {
        validations.referralId = "referralId is required!";
        isValid = false;
      }

      if (Email && !/\S+@\S+\.\S+/.test(Email)) {
        validations.Email = "Email format must be as example@mail.com!";
        isValid = false;
      }

      if (!Password) {
        validations.Password = "Password is required!";
        isValid = false;
      } else if (Password.length < 8) {
        validations.Password = "Password must be at least 8 characters long.";
        isValid = false;
      } else if (!/\d/.test(Password) || !/[a-zA-Z]/.test(Password)) {
        validations.Password =
          "Password must contain both letters and numbers.";
        isValid = false;
      }
      if (!Reenterpassword) {
        validations.Reenterpassword = "Confirm Password is required!";
        isValid = false;
      }

      if (Reenterpassword && Reenterpassword !== Password) {
        validations.Reenterpassword = "Passwords must match!";
        isValid = false;
      }
      if (!referralId) {
        validations.referralId = "Referral id is required!";
        isValid = false;
      }
      if (!isValid) {
        setValidations(validations);
      }

      return isValid;
    };

    const validateOne = (e) => {
      const { name } = e.target;
      const value = values[name];
      let message = "";

      if (!value) {
        message = `${
          name === "Reenterpassword" ? "Confirm Password" : name
        } is required!`;
      }
      if (value && name === "Reenterpassword" && value !== values.Password) {
        message = "Passwords must match!";
      }
      setValidations({ ...validations, [name]: message });
    };

    const handleChange = async (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      if (name === "referralId") {
        let headersList = {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        };
        let response = await fetch(
          `https://api.sirglobal.org/api/user/usernametogetfullname/${
            "SIR" + value?.slice(3)
          }`,
          {
            method: "GET",
            headers: headersList,
          }
        );

        let data = await response.text();
        let res = JSON.parse(data);
        if (res.data.length > 0) {
          setfinnduser(res.data[0].Fullname);
        } else {
          setfinnduser("");
        }
      }
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validateAll();
      if (!isValid) {
        return false;
      }
      console.log(values);
      const res = await dispatch(Signup({ ...values, ReCAPTCHA: reCAPTCHA }));
      if (res.payload.data.isSuccess) {
        setShow(!show);
        toast.success(res.payload.data.message);
        localStorage.setItem("data", JSON.stringify(res.payload.data.data));
        setdata(res.payload.data.data);
      } else {
        toast.error(res.payload.data.message);
      }
    };
    const {
      Walletaddress,
      Email,
      Password,
      Reenterpassword,
      referralId,
      username,
      phone,
      OTP,
    } = values;
    const {
      Walletaddress: WalletaddressVal,
      Email: EmailVal,
      Password: PasswordVal,
      Reenterpassword: ReenterpasswordVal,
      referralId: referralIdVal,
      username: usernameVal,
      phone: phoneVal,
    } = validations;
    useEffect(() => {
      setValues((vall) => {
        return { ...vall, Walletaddress: account };
      });
      getBalance();
    }, [account]);

    const connect = async () => {
      try {
        if (!account) {
          if (typeof window.ethereum !== "undefined") {
            handleShow();
          } else {
            handleShow();
          }
        } else {
          deactivate();
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    console.log(localStorage.getItem("data"));
    return (
      <>
        {!show ? (
          <div className="col-12 col-xl-6 px-0 px-lg-5 zindex m-auto">
            <div
              className="flex-column"
              style={{
                minHeight: "100vh",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "15px 7px",
              }}
            >
              <div className="">
                <a href="/">
                  {" "}
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/doubtq-student.appspot.com/o/icon2.png?alt=media&token=7e933aff-37ab-46ae-a0c1-8180c2eaf931&_gl=1*10gdqfi*_ga*OTgwMjYzMTIyLjE2ODM5NTgxMTM.*_ga_CW55HF8NVT*MTY5NzE3NjcxMi4xMC4xLjE2OTcxNzY3NTguMTQuMC4w"
                    alt=""
                    className="m-auto d-block"
                    style={{ width: 70, height: 70 }}
                  />
                </a>
                <p className="text-light text-center pt-3">
                  SIR GLOBAL ACADEMY
                </p>
                <h1 className=" text-light text-center py-0">Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row px-2 px-sm-4">
                    <div className="col-12   group">
                      <InputField
                        type="text"
                        name="Email"
                        placeholder="Enter e-mail address"
                        value={Email}
                        error={EmailVal}
                        icons={<MailFilled />}
                        onChange={handleChange}
                        onBlur={validateOne}
                        style={{
                          border: "1px solid #fff",
                        }}
                      />
                    </div>
                    <div className="col-12   group">
                      <InputField
                        type="text"
                        name="username"
                        placeholder="Enter your Full name"
                        value={username}
                        error={usernameVal}
                        icons={<MailFilled />}
                        onChange={handleChange}
                        onBlur={validateOne}
                        style={{
                          border: "1px solid rgb(255, 255, 255) !important",
                          borderRedios: "4px",
                        }}
                      />
                    </div>{" "}
                    <div className="col-12 ">
                      <div className="form-group   group">
                        <PhoneInput
                          name="phone"
                          value={phone}
                          defaultCountry="IN"
                          placeholder="Enter your Phone Number"
                          className={`form-control d-flex bg-transparent h-100`}
                          onChange={(e) => {
                            setValues({ ...values, ["phone"]: e });
                          }}
                          onBlur={validateOne}
                        />
                        {phoneVal ? (
                          <span className="error">
                            {"PhoneNumber is required!"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 col-md-6  group">
                      <InputField
                        type="Password"
                        name="Password"
                        placeholder="Enter password"
                        value={Password}
                        error={PasswordVal}
                        icons={<LockFilled />}
                        onChange={handleChange}
                        onBlur={validateOne}
                        style={{
                          border: "1px solid #fff",
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-6  group">
                      <InputField
                        type="Password"
                        name="Reenterpassword"
                        placeholder="Re-enter password"
                        icons={<LockFilled />}
                        value={Reenterpassword}
                        error={ReenterpasswordVal}
                        onChange={handleChange}
                        onBlur={validateOne}
                        style={{
                          border: "1px solid #fff",
                        }}
                      />
                    </div>
                    <div className="col-12  group">
                      <InputField
                        type="text"
                        name="referralId"
                        placeholder="Enter Referral Link"
                        value={referralId}
                        error={referralIdVal}
                        icons={<UsergroupAddOutlined />}
                        onChange={async (e) => {
                          handleChange(e);
                        }}
                        onBlur={validateOne}
                        style={{
                          border: "1px solid #fff",
                        }}
                      />
                      {finnduser !== "" && <p className="error">{finnduser}</p>}
                    </div>
                    <ReCAPTCHA
                      sitekey="6LfQRgkpAAAAAKqNb8njjkOG95goA02Xfoed9ahQ"
                      onChange={(er) => {
                        setReCAPTCHA(er);
                      }}
                    />
                    <div
                      className="d-flex align-items-center  text-light"
                      style={{ alignItems: "center" }}
                    >
                      <Checkbox
                        className=" me-3"
                        style={{ fontSize: "20px" }}
                        checked={check}
                        onChange={(e) => {
                          setcheck(e.target.checked);
                        }}
                      />
                      <p className=" mb-0 text-light ">
                        I have read and agree to the
                        <a
                          href="/Termsandconditions"
                          target="_blank"
                          className="px-1 text-light"
                        >
                          Terms and Conditions
                        </a>
                        of SIR Token
                      </p>
                    </div>
                    <p className="">
                      <b>{!check && "Terms and conditions is required"}</b>
                    </p>
                    <div className="col-12 py-0 ">
                      <button
                        type="submit"
                        className={" w-100 text-dark"}
                        disabled={!check}
                        style={{ background: "#dcdc46", height: 55 }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
                <div className="social-message">
                  <div className="line" />
                  <p className="message pt-3">Other Options</p>
                  <div className="line" />
                </div>
                <div className=" px-2 px-sm-4">
                  <a
                    className={"text-light d-block m-auto text-center "}
                    onClick={() => {
                      settype(false);
                    }}
                  >
                    Already Registered? Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 col-xl-7 px-0 px-lg-5 zindex">
            <div
              className="flex-column"
              style={{
                minHeight: "100vh",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "15px 7px",
              }}
            >
              <div className="Box">
                <div className="row px-2 px-sm-4">
                  <h1 className="px-4  pb-2 main-text">verify your account</h1>
                  <div className="col-12 ">
                    <InputField
                      type="text"
                      name="username"
                      placeholder="Enter OTP"
                      value={JSON.parse(localStorage.getItem("data"))?.username}
                      icons={<LockFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 ">
                    <InputField
                      type="OTP"
                      name="OTP"
                      placeholder="Enter OTP"
                      value={OTP}
                      icons={<LockFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 ">
                    <button
                      type="submit"
                      className={" w-100 text-dark"}
                      onClick={async () => {
                        setloadding(!loadding);
                        let headersList = {
                          Accept: "*/*",
                          "Content-Type": "application/json",
                        };

                        let bodyContent = JSON.stringify({
                          username: JSON.parse(localStorage.getItem("data"))
                            ?.username,
                          otp: OTP,
                        });

                        let response = await fetch(
                          "https://api.sirglobal.org/api/registration/signUp/varify",
                          {
                            method: "POST",
                            body: bodyContent,
                            headers: headersList,
                          }
                        );

                        let data = await response.text();
                        if (JSON.parse(data).isSuccess) {
                          settype(!type);
                        } else {
                          toast.error(JSON.parse(data).message);
                        }
                        setloadding(true);
                      }}
                      style={{ background: "#dcdc46", height: 55 }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <Modal show={show} onHide={handleClose} centered>
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
              onBlur={validateOne}
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
              onClick={async () => {}}
            />
          </Modal.Body>
        </Modal> */}
        {/* <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                handleClose();
              }}
            >
              <img
                src={require("../../assets/img/partners/WalletConnect.13798276a43e02957131.png")}
                alt="Wallet Connect Logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "5px" }}
                borderRadius="3px"
              />
              <h6 className="text-light m-0">Wallet Connect</h6>
            </div>
            <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                activate(Injected);
                handleClose();
              }}
            >
              <img
                src={require("../../assets/img/partners/MetaMask Fox.900b5bef784601bc0be8.png")}
                alt="Metamask Logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "5px" }}
                borderRadius="3px"
              />
              <h6 className="text-light m-0"> Metamask</h6>
            </div>
          </Modal.Body>
        </Modal> */}
      </>
    );
  };
  const SignInUser = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [reCAPTCHA, setReCAPTCHA] = useState("");
    const [values, setValues] = React.useState({
      Email:
        location.search.split("?")[1] === "login"
          ? "SIR"
          : location.search.split("?")[1],
      username: "",
      Emailforgot: "SIR",
      Password: location.search.split("?")[2],
    });
    const [validations, setValidations] = React.useState({
      Email: "",
      Emailforgot: "",
      username: "",
      Password: "",
    });

    const validateAll = () => {
      const { Email, Password, Emailforgot, username } = values;
      const validations = {
        Email: "",
        Password: "",
        username: "",
        Emailforgot: "",
      };
      let isValid = true;

      if (!Email) {
        validations.Email = "username is required!";
        isValid = false;
      }

      if (!username) {
        validations.username = "Fullname is required!";
      }

      if (!Emailforgot) {
        validations.Emailforgot = "username is required!";
      }

      if (!Password) {
        validations.Password = "Password is required!";
        isValid = false;
      }
      if (!isValid) {
        setValidations(validations);
      }

      return isValid;
    };

    const validateOne = (e) => {
      const { name } = e.target;
      const value = values[name];
      let message = "";

      if (!value) {
        if (name !== "Emailforgot") {
          message = `${
            name === "Reenterpassword" ? "Confirm Password" : name
          } is required!`;
        } else {
          message = `username is required!`;
        }
      }

      if (value && name === "Reenterpassword" && value !== values.Password) {
        message = "Passwords must match!";
      }
      setValidations({ ...validations, [name]: message });
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
    const handleSubmit1 = async (e) => {
      const validations = {
        Email: "",
        Password: "",
        Emailforgot: "",
      };
      if (!Emailforgot) {
        validations.Emailforgot = "username is required!";
      }
      setValidations(validations);
      if (validations.Emailforgot === "") {
        const res = await dispatch(
          Foegotpassword({ email: values.Emailforgot })
        );
        if (res.payload.data.isSuccess) {
          toast.success(res.payload.data.message);
        } else {
          toast.error(res.payload.data.message);
        }
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      const isValid = validateAll();

      if (!isValid) {
        return false;
      }
      const res = await dispatch(Signin({ ...values, ReCAPTCHA: reCAPTCHA }));
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
        localStorage.setItem("data", JSON.stringify(res.payload));
        navigation("/dashboard");
      } else {
        toast.error(res.payload.data.message);
      }
    };
    const { Email, Emailforgot, Password, username } = values;
    const {
      Email: EmailVal,
      Emailforgot: EmailforgotVal,
      Password: PasswordVal,
      username: usernameVal,
    } = validations;

    return (
      <>
        <div className="col-12 col-xl-6 px-0 px-lg-5 zindex m-auto">
          <div
            className="flex-column"
            style={{
              minHeight: "100vh",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "15px 7px",
            }}
          >
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="loginleft">
                  <a href="/">
                    {" "}
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/doubtq-student.appspot.com/o/icon2.png?alt=media&token=7e933aff-37ab-46ae-a0c1-8180c2eaf931&_gl=1*10gdqfi*_ga*OTgwMjYzMTIyLjE2ODM5NTgxMTM.*_ga_CW55HF8NVT*MTY5NzE3NjcxMi4xMC4xLjE2OTcxNzY3NTguMTQuMC4w"
                      alt=""
                      style={{ width: 70, height: 70 }}
                    />
                  </a>
                  <p className="loghead" style={{ textTransform: "uppercase" }}>
                    SIR Global Academy
                  </p>
                </div>

                <div className="row px-2 px-sm-4">
                  <h1 className="px-4  pb-2 text-center text-light">Login</h1>
                  <div className="col-12   group">
                    <InputField
                      type="text"
                      name="Email"
                      placeholder="Enter Username"
                      value={Email}
                      error={EmailVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12   group">
                    <InputField
                      type="Password"
                      name="Password"
                      placeholder="Enter password"
                      value={Password}
                      error={PasswordVal}
                      icons={<LockFilled />}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <ReCAPTCHA
                    sitekey="6LfQRgkpAAAAAKqNb8njjkOG95goA02Xfoed9ahQ"
                    onChange={(er) => {
                      setReCAPTCHA(er);
                    }}
                  />
                  <div className="col-12 pt-4">
                    <button
                      type="submit"
                      className={" w-100 text-dark"}
                      style={{ background: "#dcdc46", height: 55 }}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <div className="social-message">
                <div className="line" />
                <p className="message pt-3">Other Options</p>
                <div className="line" />
              </div>
              <div className=" px-2 px-sm-4 py-2">
                <a
                  className={"text-light text-center d-block"}
                  onClick={() => {
                    settype(!false);
                  }}
                >
                  Don’t have an account? <b>Sign up</b>
                </a>
              </div>{" "}
              <a
                className={"text-light text-center d-block"}
                onClick={() => setModal2Open(true)}
              >
                Forgot password?
              </a>
              <Modal
                show={modal2Open}
                onHide={() => setModal2Open(false)}
                centered
              >
                <Modal.Header className="pb-5">
                  <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    Enter the email assocSIRed with your account and We will
                    send an email with instructions to reset your password.
                  </p>
                  <div className="group">
                    <InputField
                      type="text"
                      name="Emailforgot"
                      placeholder="Enter Username"
                      value={Emailforgot}
                      error={EmailforgotVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      style={{
                        border: "none !important",
                      }}
                      onBlur={validateOne}
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <button
                    type="submit"
                    className={" text-dark px-4 py-2"}
                    loading={authSlice.isLoader}
                    onClick={() => handleSubmit1()}
                    style={{ background: "#dcdc46" }}
                  >
                    Submit
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Spin spinning={!authSlice.isLoader}>
      <Spin spinning={!loadding}>
        <div className="container-fluid">
          <div
            className="row loginbackimg"
            style={{ minheight: "100vh", height: "100%" }}
          >
            {type ? <SignupUser /> : <SignInUser />}
          </div>
        </div>
        {/* <WalletConnectModalAuth
        projectId={projectId}
        metadata={{
          name: "My Dapp",
          description: "My Dapp description",
          url: "https://my-dapp.com",
          icons: ["https://my-dapp.com/logo.png"],
        }}
      /> */}
      </Spin>
    </Spin>
  );
}

export default Login;
