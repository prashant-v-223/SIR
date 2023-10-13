import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/ButtonField";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "react-bootstrap";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import { useDispatch } from "react-redux";
import Logo from "../../assets/img/Logo.png";
import { useSelector } from "react-redux";
import {
  WalletFilled,
  MailFilled,
  LockFilled,
  UsergroupAddOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { adminSignin } from "../../Redux/authSlice";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
function Adminlogin() {
  const location = useLocation();
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const navigation = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const SignInUser = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [values, setValues] = React.useState({
      Email: "",
      Emailforgot: "",
      Password: "",
    });
    const [validations, setValidations] = React.useState({
      Email: "",
      Emailforgot: "",
      Password: "",
    });

    const validateAll = () => {
      const { Email, Password, Emailforgot } = values;
      const validations = {
        Email: "",
        Password: "",
        Emailforgot: "",
      };
      let isValid = true;

      if (!Email) {
        validations.Email = "Email is required!";
        isValid = false;
      }

      if (!Emailforgot) {
        validations.Emailforgot = "Email is required!";
      }

      if (Emailforgot && !/\S+@\S+\.\S+/.test(Emailforgot)) {
        validations.Emailforgot = "Email format must be as example@mail.com!";
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
          message = `Email is required!`;
        }
      }

      if (value && name === "Emailforgot" && !/\S+@\S+\.\S+/.test(value)) {
        message = "Email format must be as example@mail.com!";
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
    const handleSubmit = async (e) => {
      e.preventDefault();

      const isValid = validateAll();

      if (!isValid) {
        return false;
      }
      const res = await dispatch(adminSignin(values));
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
        localStorage.setItem("data", JSON.stringify(res.payload));
        navigation("/admin/dashboard");
      } else {
        toast.error(res.payload.data.message);
      }
    };
    const { Email, Password } = values;
    const { Email: EmailVal, Password: PasswordVal } = validations;

    return (
      <>
        <div
          className="col-5 d-none d-xl-block col-md-5 p-5"
          style={{
            position: "relative",
          }}
        >
          {" "}
          <div className="p-4">
            <img
              src={require("../../assets/img/Logo.png")}
              alt=""
              width={200}
              onClick={() => {
                navigation("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "19%",
              width: "100%",
              left: "0",
              padding: "5%",
            }}
          >
            <div className="px-5">
              <h1 className="text-light">
                Start-up <br /> your account
              </h1>
              <p
                className="text-light pe-5 me-5 py-2"
                style={{ fontSize: "18px" }}
              >
                Register on UUDT platform easily. World’s topmost
                platform to generate revenue
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-7 px-0 px-lg-5">
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
              <form onSubmit={handleSubmit}>
                <div className="row px-2 px-sm-4">
                  <h1 className="px-4  pb-4 text-light">Login</h1>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="text"
                      name="Email"
                      placeholder="Enter E-Mail"
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
                  <div className="col-12  py-md-1">
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
                  <div className="col-12 pt-4">
                    <button
                      type="submit"
                      className={" w-100 text-light"}
                      style={{ background: "#0b535d", height: 55 }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Spin spinning={!authSlice.isLoader}>
      <div className="container-fluid">
        <div
          className="row loginbackimg"
          style={{ minheight: "100vh", height: "100%" }}
        >
          <SignInUser />
        </div>
      </div>
    </Spin>
  );
}

export default Adminlogin;
