import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbaradmin from "../../components/Navbaradmin/Navbaradmin";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Button, Modal, Select, Spin, Table, Tooltip } from "antd";
import { getTransferdata } from "../../Redux/TranfarSlice";
import {
  Adminprice,
  Adminuserdata,
  Alltranfordata,
  userdatablock,
  AdminsendAmount,
  Admintranfor,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";

function AdminTransfer() {
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const [finnduser, setfinnduser] = React.useState("");
  const [Alldata, setAlldata] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const [values, setValues] = React.useState({
    username: "SIR",
    Amount: "",
    Walletname: "Main Wallet",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Admintranfor({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
  };
  const handleSubmit = async (e) => {
    if (values.username !== "" || values.Amount > 0) {
      const res = await dispatch(
        AdminsendAmount({
          username: values.username,
          price: values.Amount,
          Walletname: values.Walletname,
          Token:
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token,
        })
      );
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
        getalldata();
      } else {
        toast.error(res.payload.data.message);
      }
    }
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "120px",
      render: (text, object, index) => (
        <Tooltip placement="topLeft" title={index + 1}>
          {index + 1}
        </Tooltip>
      ),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Amount}>
          {record.type !== 0 ? record.Amount : "-"}
        </Tooltip>
      ),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          {record.Note + " "}
        </Tooltip>
      ),
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.username}>
          {record.username + " "}
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <div className="col-6">
                <Select
                  style={{ width: "100%" }}
                  name="Walletname"
                  defaultValue={"Main Wallet"}
                  placeholder="Select Wallet To Transfer From"
                  size="large"
                  className="my-2"
                  options={[
                    {
                      value: "Main Wallet",
                      label: `Main Wallet`,
                    },
                  ]}
                  onChange={(e) => {
                    setValues({ ...values, Walletname: e });
                  }}
                />
              </div>
              <div className="col-6">
                <InputField
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  style={{ color: "#fff !important", border: "1px solid #fff" }}
                  value={values.username}
                  onChange={async (e) => {
                    handleChange(e);
                    let headersList = {
                      Accept: "*/*",
                      "User-Agent":
                        "Thunder Client (https://www.thunderclient.com)",
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("data")) &&
                        JSON.parse(localStorage.getItem("data")).data.token
                      }`,
                    };
                    let response = await fetch(
                      `https://api.sirglobal.org/api/user/usernametogetfullname/${e.target.value}`,
                      {
                        method: "GET",
                        headers: headersList,
                      }
                    );

                    let data = await response.text();
                    let res = JSON.parse(data);
                    if (res.data.length > 0) {
                      console.log("data", res.data[0].Fullname);
                      setfinnduser(res.data[0].Fullname);
                    } else {
                      setfinnduser("");
                    }
                  }}
                />{" "}
                {finnduser !== "" && <p className="error">{finnduser}</p>}
                {/* <InputField
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  style={{ color: "#fff !important", border: "1px solid #fff" }}
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                /> */}
              </div>
              <div className="col-6">
                <InputField
                  type="number"
                  name="Amount"
                  min={0}
                  placeholder="Enter Amount to Tranfer"
                  style={{ color: "red !important", border: "1px solid #fff" }}
                  value={values.Amount}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-12 py-4">
                <button
                  style={{
                    background: "#31A872",
                    color: "#fff",
                    height: 60,
                    width: 180,
                    border: "none",
                  }}
                  className="d-block m-auto"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Alldata}
                  bordered={true}
                  title={() => "All Transactions"}
                  scroll={{ x: "1500px " }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default AdminTransfer;
