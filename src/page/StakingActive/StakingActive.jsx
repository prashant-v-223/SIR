import React, { useEffect, useState } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Button, Modal, Select, Spin, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { AdminBuystcking, AllBuystack } from "../../Redux/admin";
import { toast } from "react-toastify";
function StakingActive() {
  const [values, setValues] = React.useState({
    username: "",
    Amount: "",
    Walletname: "Main Wallet",
  });
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [Alldata, setAlldata] = React.useState([]);
  const [loding, setloding] = React.useState(!true);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      AllBuystack({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "80px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.result?.username}>
          {record?.result?.username}
        </Tooltip>
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.result?.email}>
          {record?.result?.email}
        </Tooltip>
      ),
    },
    {
      title: "Fullname",
      dataIndex: "Fullname",
      key: "Fullname",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.result?.email}>
          {record?.result?.Fullname}
        </Tooltip>
      ),
    },
    {
      title: "WalletType",
      dataIndex: "walletaddress",
      key: "walletaddress",
      ellipsis: {
        showTitle: false,
      },
      width: "400px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.WalletType}>
          {record?.WalletType}
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
        <Tooltip placement="topLeft" title={record?.Amount}>
          {record?.Amount}
        </Tooltip>
      ),
    },
    {
      title: "transactionHash",
      dataIndex: "transactionHash",
      key: "transactionHash",
      ellipsis: {
        showTitle: false,
      },
      width: "330px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.transactionHash}>
          {record?.transactionHash}
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
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async () => {
    setloding(true);
    const res = await dispatch(
      AdminBuystcking({
        ...values,
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      getalldata();
      setloding(!true);
    } else {
      toast.error(res.payload.data.message);
      getalldata();
      setloding(!true);
    }
  };
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  return (
    <Spin spinning={loding}>
      <div>
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
                    { value: "E-Wallet", label: "E-Wallet" },
                    { value: "Dapp-Wallet", label: "Dapp-Wallet" },
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
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-6">
                <InputField
                  type="number"
                  name="Amount"
                  min={0}
                  placeholder="Enter Amount to Stack"
                  value={values.Amount}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-12 py-4">
                <button
                  style={{
                    background: "#848b02",
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
            </div>
            <Table
              columns={columns}
              dataSource={Alldata}
              bordered={true}
              title={() => "Staking Report"}
              scroll={{ x: "1500px " }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["25", "50", "75", "100"],
                showPageSizeOptions: true,
                current: page,
                onChange: (page, pageSize) => onTabChange(page, pageSize),
              }}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default StakingActive;
