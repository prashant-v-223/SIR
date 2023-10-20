import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import InputField from "../../components/InputField";
import Button from "../../components/ButtonField";
import "./Withdrawal.scss";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { InputNumber, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  Wallatedata,
  getdappWallatedata,
  getdappWallatedata1,
} from "../../Redux/WallatedatSlice";
import { Transferdata } from "../../Redux/TranfarSlice";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import CreatableSelect from "react-select/creatable";
import { apiList } from "../../Redux/api";
import axios from "axios";
function Withdrawal() {
  const navigation = useNavigate();
  const WallatedatSlice = useSelector((state) => state.WallatedatSlice);
  const [Alldata, setAlldata] = React.useState([]);
  const [Profile, setProfile] = React.useState({});
  const [Wallet, setWallet] = React.useState("Main Wallet");
  const [open, setopen] = React.useState(false);
  const [open1, setopen1] = React.useState(false);
  const [otp, setotp] = React.useState("");
  const [address, setaddress] = React.useState("");
  const [WalletAmountcal, setWalletAmountcal] = React.useState(0);
  const handleClose = () => setopen(!false);
  let refurserdata =
    WallatedatSlice.Wallatedata?.data &&
    WallatedatSlice.Wallatedata?.data?.ReffData1.map((e, i) => {
      return {
        value: e._id,
        label: e.username,
      };
    });
  const [Username1, setUsername1] = React.useState("");
  const [Username, setUsername] = React.useState("");
  const [values, setValues] = React.useState({
    Amount: "",
    Amount1: "",
  });
  const [validations, setValidations] = React.useState({
    Amount: "",
    username: "",
  });
  const { Amount, Amount1, username } = values;
  const {
    Amount: AmountVal,
    Amount1: Amount1val,
    username: UsernameVal,
  } = validations;
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
    setValidations({ ...validations, [name]: message });
  };
  const dispatch = useDispatch();
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
    setAlldata(res.payload.data.data);
    setWalletAmountcal(res.payload.data.data[0]?.mainWallet);
    setProfile(res.payload.data.profile);
  };
  const onChange = (value) => {
    setWallet(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validateAll = () => {
    const { Amount, Amount1, username } = values;
    const validations = {
      Amount: "",
      Amount1: "",
      username: "",
    };
    let isValid = true;

    if (!Amount) {
      validations.Amount = "Amount is required!";
      isValid = false;
    }
    if (!Amount1) {
      validations.Amount1 = "Amount is required!";
      isValid = false;
    } else if (Amount1 > 50) {
      validations.Amount1 = "Amount is not valid required!";
    }
    if (!username) {
      validations.username = "Username is required!";
      isValid = false;
    }
    if (!isValid) {
      setValidations(validations);
    }
    return validations;
  };

  const handleSubmit = async (e) => {
    console.log(validateAll());
    if (validateAll().Amount === "" && validateAll().username === "") {
      setopen1(!open1);
      setotp("");
      let headersList = {
        Accept: "*/*",
        Authorization: `${
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token
        }`,
      };

      let reqOptions = {
        url: apiList.tranferotpsend,
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      // const res = await dispatch(
      //   tranferotpsend({
      //     Token:
      //       JSON.parse(localStorage.getItem("data")) &&
      //       JSON.parse(localStorage.getItem("data")).data
      //         .token,
      //   })
      // );
      // if (res.payload.data.isSuccess) {
      //   setotp("");
      //   toast.success(res.payload.data.message);
      //   setopen1(!open1);
      // } else {
      //   toast.error(res.payload.data.message);
    }
  };

  return (
    <>
      <Spin spinning={!WallatedatSlice?.isLoader}>
        <>
          <Navbar />
          <div className="container-fluid blackbg">
            <div className="mainsection">
              <div className="row px-3 pt-4">
                <div className="col-12 col-md-6 pb-4 pb-md-0">
                  <div className="Boxcard p-4">
                    <h6 className="text-light d-flex ">
                      Withdraw USDT
                      <img
                        src={require("../../assets/img/Vector (28).png")}
                        alt=""
                        className="img-fluid mx-3"
                      />{" "}
                    </h6>
                    <div className="Withdrawalbox px-4 py-5 my-3 d-sm-flex">
                      <div className="d-flex justify-content-center align-items-center img-div1">
                        <img
                          src={require("../../assets/img/Vector (26).png")}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="img-div2">
                        <p className="m-0 text-light">
                          USDT Withdrawals are activated after 15days of your
                          staking. USDT Token are released as bonus in
                          withdrawal process. You can withdraw your rewards
                          everyday.
                        </p>
                      </div>
                    </div>
                    <div className="Withdrawalbox px-4 py-4 mt-4">
                      <div className="d-lg-flex justify-content-around">
                        <div className="px-3 py-2 py-lg-0">
                          <h6 className="m-0 text-light text-center">
                            SIRMain Wallet Balance
                          </h6>
                        </div>
                        <div className="px-3 py-2 py-lg-0">
                          <h6 className="m-0 text-light text-center">
                            {Alldata[0]?.mainWallet?.toFixed(4)} USDT
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6 my-4">
                        <div
                          className="Withdrawalboxp py-3 d-flex justify-content-center"
                          onClick={() => {
                            setWalletAmountcal((data) => {
                              return (Alldata[0]?.mainWallet * 25) / 100;
                            });
                          }}
                        >
                          <h6 className="m-0">
                            <HiArrowsRightLeft
                              className="mx-2"
                              style={{ fontSize: "20px", fontWeight: 900 }}
                            />
                            Withdraw 25%
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 mb-3 mt-lg-4 ">
                        <div
                          className="Withdrawalboxp py-3 d-flex justify-content-center"
                          onClick={() => {
                            setWalletAmountcal((data) => {
                              return (Alldata[0]?.mainWallet * 50) / 100;
                            });
                          }}
                        >
                          <h6 className="m-0">
                            <HiArrowsRightLeft
                              className="mx-2"
                              style={{ fontSize: "20px", fontWeight: 900 }}
                            />
                            Withdraw 50%
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 mb-3 mb-lg-0 ">
                        <div
                          className="Withdrawalboxp py-3 d-flex justify-content-center"
                          onClick={() => {
                            setWalletAmountcal((data) => {
                              return (Alldata[0]?.mainWallet * 75) / 100;
                            });
                          }}
                        >
                          <h6 className="m-0">
                            <HiArrowsRightLeft
                              className="mx-2"
                              style={{ fontSize: "20px", fontWeight: 900 }}
                            />
                            Withdraw 75%
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 mb-3 mb-lg-0 ">
                        <div
                          className="Withdrawalboxp py-3 d-flex justify-content-center"
                          onClick={() => {
                            setWalletAmountcal((data) => {
                              return (Alldata[0]?.mainWallet * 100) / 100;
                            });
                          }}
                        >
                          <h6 className="m-0">
                            <HiArrowsRightLeft
                              className="mx-2"
                              style={{ fontSize: "20px", fontWeight: 900 }}
                            />
                            Withdraw 100%
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-12 col-sm-9 text-light">
                        <label htmlFor="" className="mb-1 text-light ">
                          <b>Amount in USDT</b>
                        </label>
                        <InputNumber
                          size="large"
                          className="w-100 mb-3"
                          onChange={onChange}
                          value={WalletAmountcal}
                          style={{
                            padding: "10px 0px",
                            border: "1px solid #fff !important",
                          }}
                        />
                      </div>
                      <div className="col-12 col-sm-3 text-light">
                        <Button
                          className={" w-100 text-light"}
                          Stake={!false}
                          style={{
                            background: "#848b02",
                            height: 65,
                            border: "none",
                          }}
                          label={"Withdraw "}
                          onClick={async () => {
                            const res = await dispatch(
                              getdappWallatedata({
                                Token:
                                  JSON.parse(localStorage.getItem("data")) &&
                                  JSON.parse(localStorage.getItem("data")).data
                                    .token,
                              })
                            );
                            if (res.payload.data.isSuccess) {
                              setotp("");
                              toast.success(res.payload.data.message);
                              setopen(!false);
                            } else {
                              toast.error(res.payload.data.message);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 pb-4 pb-md-0">
                  {/* <div className="Boxcard p-4">
                    <h6 className="text-light d-flex ">
                      Transfer USDT
                      <img
                        src={require("../../assets/img/Vector (28).png")}
                        alt=""
                        className="img-fluid mx-3"
                      />{" "}
                    </h6>
                    <div className="Withdrawalbox px-3 py-4 my-4 d-sm-flex">
                      <div className="d-flex justify-content-center align-items-center img-div1">
                        <img
                          src={require("../../assets/img/Vector (26).png")}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="img-div2">
                        <p className="m-0 text-light">
                          You can transfer your  SIR wallet coins to your
                          downline team members. Transfers will be deposited in
                           SIR E-Wallet only.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6  py-2">
                        <Select
                          style={{ width: "100%" }}
                          name="Walletoname"
                          defaultValue={"Main Wallet"}
                          placeholder="Select Wallet To Transfer From"
                          size="large"
                          className="my-2"
                          options={[
                            {
                              value: "Main Wallet",
                              label: `Main Wallet`,
                            },
                            { value: "E-Wallet", label: "E-Wallet" },
                          ]}
                          onChange={onChange}
                        />
                      </div>
                      <div className="#848b02col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center py-2">
                        <div className="w-100">
                          <InputField
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={values.username}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>
                        <div className="w-100">
                          {UsernameVal !== "" && (
                            <p className="error">{UsernameVal}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-12 py-2">
                        <InputField
                          type="number"
                          name="Amount"
                          min={0}
                          placeholder="Enter Amount of USDT Coin to Transfer"
                          value={Amount}
                          pattern="[0-9]*"
                          error={AmountVal}
                          onChange={(e) => {
                            e.target.validity.valid && handleChange(e);
                          }}
                          onBlur={validateOne}
                        />
                      </div>
                      <div className="col-12 py-2 ">
                        <InputField
                          type="text"
                          name="Walletaddress"
                          placeholder={
                            Wallet === "Main Wallet"
                              ? "USDT Balance in Main Wallet"
                              : "USDT Balance in E-Wallet"
                          }
                          value={
                            Wallet === "Main Wallet"
                              ? WallatedatSlice.Wallatedata?.data?.data[0]
                                  ?.mainWallet
                              : WallatedatSlice.Wallatedata?.data?.data[0]
                                  ?.v4xWallet
                          }
                          disabled={true}
                        />
                      </div>
                      <div className="col-12 pt-4">
                        <Button
                          className={" w-100 text-light"}
                          Stake={!false}
                          style={{
                            background: "#848b02",
                            height: 60,
                            border: "none",
                          }}
                          onClick={() => handleSubmit()}
                          label={"Send"}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="Boxcard p-4 mb-4">
                    <h6 className="text-light d-flex pb-3">
                      View your transfer reports here
                    </h6>
                    <Button
                      className={" w-100 text-light my-2"}
                      Stake={!false}
                      style={{
                        background: "#848b02",
                        height: 60,
                        border: "none",
                      }}
                      label={" SIRToken Transfer Report "}
                      onClick={() => {
                        navigation("/transfer/income");
                      }}
                    />
                  </div>
                  <div className="Boxcard p-4 my-4">
                    <h6 className="text-light d-flex pb-3">Withdraw USDT</h6>
                    <Button
                      className={" w-100 text-light"}
                      Stake={!false}
                      style={{
                        background: "#848b02",
                        height: 60,
                        border: "none",
                      }}
                      onClick={() => {
                        navigation("/Withdrdata");
                      }}
                      label={" SIRMain Wallet Withdrawal Report"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        <Modal show={open1} centered>
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
              onClick={async () => {
                const res = await dispatch(
                  Transferdata({
                    Username: username,
                    otp: otp,
                    Wallet: Wallet,
                    Amount: Amount,
                    Token:
                      JSON.parse(localStorage.getItem("data")) &&
                      JSON.parse(localStorage.getItem("data")).data.token,
                  })
                );
                if (res.payload.data.isSuccess) {
                  setopen1(!open1);
                  toast.success(res.payload.data.message);
                  getalldata();
                } else {
                  toast.error(res.payload.data.message);
                }
              }}
            />
          </Modal.Body>
        </Modal>
        <Modal show={open} centered>
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
              onClick={async () => {
                setopen(!open);
                const res = await dispatch(
                  getdappWallatedata1({
                    otp: otp,
                    walletaddress: address,
                    Amount: WalletAmountcal,
                    Remark: "main wallate",
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
      </Spin>
    </>
  );
}

export default Withdrawal;
