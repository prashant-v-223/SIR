import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import InputField from "../../components/InputField";
import { Signin, profileupdate } from "../../Redux/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { MailFilled } from "@ant-design/icons";
import Navbar1 from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AiFillPhone } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function Profile() {
  const authSlice = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [imagePreviewUrl, setimagePreviewUrl] = useState(
    !JSON.parse(localStorage.getItem("data"))?.data?.profile?.profileimg
      ? "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
      : JSON.parse(localStorage.getItem("data"))?.data?.profile?.profileimg
  );
  const [Data, setData] = useState("");
  const [values, setValues] = React.useState({
    Email: "",
    Emailforgot: "",
    walletaddress: "",
    address: "",
    Password: "",
  });
  const [validations, setValidations] = React.useState({
    Email: "",
    Emailforgot: "",
    address: "",
    walletaddress: "",
    Password: "",
  });
  const handleChange1 = (info) => {
    const imageRef = ref(storage, `${info.target.files[0].name + v4()}`);
    uploadBytes(imageRef, info.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        let bodyContent = {
          profileimg: url,
        };
        let headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token
          }`,
          "Content-Type": "application/json",
        };
        console.log("url", url);
        setData(url);
        toast.success("img upload successfully");
      });
    });
  };
  const ImgUpload = ({ onChange, src }) => (
    <div
      className=""
      style={{
        position: "relative",
        width: "215px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload">
          <img for="photo-upload" src={src} />
        </div>
      </label>
    </div>
  );
  useEffect(() => {
    data();
  }, []);
  const validateAll = () => {
    const { Email, Password, Emailforgot, walletaddress } = values;
    const validations = {
      Email: "",
      Password: "",
      walletaddress: "",
      Emailforgot: "",
      address: "",
    };
    let isValid = true;

    if (!Email) {
      validations.Email = "Email is required!";
      isValid = false;
    }
    if (!address) {
      validations.address = "Email is required!";
      isValid = false;
    }
    if (!address) {
      validations.walletaddress = "walletaddress is required!";
      isValid = false;
    }

    if (!Emailforgot) {
      validations.Emailforgot = "Nominee is required!";
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
  const data = async () => {
    let reqOptions = {
      url: `https://ablcbackend-production-2705.up.railway.app/api/registration/profile:${
        JSON.parse(localStorage.getItem("data")) &&
        JSON.parse(localStorage.getItem("data")).data.token
      }`,
      method: "GET",
    };

    let response = await axios.request(reqOptions);
    localStorage.setItem("data", JSON.stringify({ data: response.data }));
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
        message = `Nominee is required!`;
      }
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
  const handleSubmit1 = async (e) => {
    const validations = {
      Email: "",
      Password: "",
      Emailforgot: "",
      address: "",
      walletaddress: "",
    };
    const { Email, Password, Emailforgot, walletaddress } = values;
    if (!Emailforgot) {
      validations.Emailforgot = "Nominee is required!";
    }
    if (!address) {
      validations.address = "address is required!";
    }
    if (!walletaddress) {
      validations.walletaddress = "walletaddress is required!";
    }
    setValidations(validations);
    if (validations.Emailforgot === "") {
      const res = await dispatch(
        profileupdate({
          Nominee: values.Emailforgot,
          address: values.address,
          walletaddress: values.walletaddress,
          profileimg: Data,
          Token:
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token,
        })
      );
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
        setModal2Open(!modal2Open);
        let reqOptions = {
          url: `https://ablcbackend-production-2705.up.railway.app/api/registration/profile:${
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token
          }`,
          method: "GET",
        };
        let response = await axios.request(reqOptions);
        console.log(response.data);
        localStorage.setItem("data", JSON.stringify({ data: response.data }));
        window.location.reload(false);
      } else {
        toast.error(res.payload.data.message);
      }
    }
  };
  const handleSubmit = async (e) => {
    const isValid = validateAll();

    if (!isValid) {
      return false;
    }
    const res = await dispatch(Signin(values));
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      localStorage.setItem("data", JSON.stringify(res.payload));
      navigation("/dashboard");
    } else {
      toast.error(res.payload.data.message);
    }
  };
  const { Email, Emailforgot, address, Password, walletaddress } = values;
  const {
    Email: EmailVal,
    Emailforgot: EmailforgotVal,
    address: addressVal,
    walletaddress: walletaddressVal,
    Password: PasswordVal,
  } = validations;
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setimagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Spin spinning={!authSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection ">
            <div
              className="d-flex justify-content-between align-content-center"
              style={{
                minHeight: "81vh",
                height: "100%",
              }}
            >
              <div
                className="d-block m-auto w-100 pt-3 pb-5"
                style={{
                  maxWidth: "1080px",
                }}
              >
                <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
                <div className="row ">
                  <div
                    className="col-12 col-md-8 py-2"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/Vector (32).png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.email
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-4 py-2"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/username 1.png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="username"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data1"))?.data
                            ?.profile?.username
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {JSON.parse(localStorage.getItem("data"))?.data?.profile
                  ?.walletaddress && (
                  <div
                    className="row py-3"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div className="col-12">
                      <div class="inner-addon left-addon">
                        <img
                          src={require("../../assets/img/walletaddress 1.png")}
                          alt=""
                        />
                        <input
                          type="text"
                          class="form-control"
                          name="walletaddress"
                          placeholder="Wallet address"
                          value={
                            JSON.parse(localStorage.getItem("data"))?.data
                              ?.profile?.walletaddress
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="row py-2"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon left-addon">
                      <AiFillPhone
                        className="imgs"
                        style={{
                          fontSize: "35px",
                          color: "#00c9c4",
                        }}
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="walletaddress"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.PhoneNumber
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="row py-2"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/Vector (33).png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="Rank"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.Rank
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>{" "}
                {JSON.parse(localStorage.getItem("data"))?.data?.profile
                  ?.Nominee && (
                  <div
                    className="row py-2"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div className="col-12">
                      <div class="inner-addon left-addon">
                        <FaUsersCog
                          className="imgs"
                          style={{
                            fontSize: "35px",
                            color: "#00c9c4",
                          }}
                        />
                        <input
                          type="text"
                          class="form-control"
                          name="Rank"
                          value={
                            JSON.parse(localStorage.getItem("data"))?.data
                              ?.profile?.Nominee
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
                {JSON.parse(localStorage.getItem("data"))?.data?.profile
                  ?.address && (
                  <div
                    className="row py-2"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div className="col-12">
                      <div class="inner-addon left-addon">
                        <img
                          src={require("../../assets/img/myteam 1.png")}
                          alt=""
                        />
                        <input
                          type="text"
                          class="form-control"
                          name="Rank"
                          value={
                            JSON.parse(localStorage.getItem("data"))?.data
                              ?.profile?.address
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* <div
                  className="row py-2"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon left-addon">
                      <img
                        src={
                          "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Tether-USDT-icon.png"
                        }
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control w-100"
                        name="Rank"
                        value={"0x55d398326f99059ff775485246999027b3197955"}
                        disabled
                      />
                    </div>
                  </div>
                </div>{" "}
                <div
                  className="row py-3"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon1 left-addon">
                      <img
                        src={require("../../assets/img/2ffc87ac-289d-4ae5-a0c6-4eb76ed22960.jpg")}
                        alt=""
                        style={{ width: "65px !important" }}
                      />
                      <input
                        type="text"
                        class="form-control w-100"
                        name="Rank"
                        value={"0x0a786cdc660c437f5f286548221232a8d4e53441"}
                        disabled
                      />
                    </div>
                  </div>
                </div> */}
                <div className="col-12 pt-5">
                  <button
                    className="text-light d-flex align-items-center px-4 py-2"
                    style={{
                      background: "rgba(22, 111, 245, 0.91)",
                      color: "#fff",
                    }}
                    onClick={() => setModal2Open(true)}
                  >
                    Edit profile
                  </button>
                </div>
                <Modal
                  show={modal2Open}
                  onHide={() => setModal2Open(false)}
                  centered
                >
                  <Modal.Header >
                    <Modal.Title></Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <InputField
                      type="text"
                      name="walletaddress"
                      placeholder="Enter your USDT- BEP20  Walletaddress"
                      value={walletaddress}
                      error={walletaddressVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                    <InputField
                      type="text"
                      name="Emailforgot"
                      placeholder="Enter Nominee name"
                      value={Emailforgot}
                      error={EmailforgotVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                    <p className="m-0 pb-2 text-light">
                      Add photo ( PNG / JPEG )
                    </p>
                    <div class="" style={{ width: 250 }}>
                      <input
                        className={`form-control`}
                        name="img"
                        type="file"
                        id="floatingInput"
                        onChange={(e) => handleChange1(e)}
                        placeholder="Data.name"
                      />
                    </div>
                    <InputField
                      type="address"
                      name="address"
                      placeholder="Enter address"
                      value={address}
                      error={addressVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </Modal.Body>

                  <Modal.Footer>
                    <button
                      type="submit"
                      className={" text-dark px-4 py-2"}
                      loading={authSlice.isLoader}
                      onClick={() => handleSubmit1()}
                      style={{ background: "#31A872" }}
                    >
                      Submit
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Profile;
