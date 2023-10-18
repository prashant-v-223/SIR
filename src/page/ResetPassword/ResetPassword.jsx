import React from "react";
import InputField from "../../components/InputField";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Checkbox, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { ChangePassword } from "../../Redux/authSlice";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const ResetPasswordUser = () => {
    const [values, setValues] = React.useState({
      Walletaddress: "",
      Email: "",
      Password: "",
      Reenterpassword: "",
      referralId: "",
    });
    const [validations, setValidations] = React.useState({
      Walletaddress: "",
      Email: "",
      Password: "",
      Reenterpassword: "",
      referralId: "",
    });
    const validateAll = () => {
      const { Password, Reenterpassword } = values;
      const validations = {
        Password: "",
        Reenterpassword: "",
      };
      let isValid = true;

      if (!Password) {
        validations.Password = "Password is required!";
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
      if (value && name === "Email" && !/\S+@\S+\.\S+/.test(value)) {
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
      const isValid = validateAll();
      if (!isValid) {
        return false;
      }
      values.Token = location.pathname.split("/")[2];
      const res = await dispatch(ChangePassword(values));
      if (res.payload.data.isSuccess) {
        navigate("/");
        toast.success(res.payload.data.message);
      } else {
        toast.error(res.payload.data.message);
      }
    };
    const { Password, Reenterpassword } = values;
    const { Password: PasswordVal, Reenterpassword: ReenterpasswordVal } =
      validations;

    return (
      <>
        <div
          className="col-5 d-none d-xl-block col-md-5 p-5"
          style={{
            position: "relative",
          }}
        >
          <div className="p-4">
            <img
              src={require("../../assets/img/Logo.png")}
              alt=""
              className="img-fluid"
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
                Register on  SIR platform easily. World’s topmost
                platform to generate revenue
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-7">
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
                  <h1 className="px-4  pb-4 text-light">Reset Password</h1>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="Password"
                      name="Password"
                      placeholder="Enter password"
                      value={Password}
                      error={PasswordVal}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{ border: "1px solid #fff" }}
                    />
                  </div>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="Password"
                      name="Reenterpassword"
                      placeholder="Re-enter password"
                      value={Reenterpassword}
                      error={ReenterpasswordVal}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{ border: "1px solid #fff" }}
                    />
                  </div>
                  <div className="col-12 pt-4">
                    <button
                      type="submit"
                      className={" w-100 text-light"}
                      style={{ background: "#291274", height: 55 }}
                    >
                      submit
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
          <ResetPasswordUser />
        </div>
      </div>
    </Spin>
  );
}

export default ResetPassword;
