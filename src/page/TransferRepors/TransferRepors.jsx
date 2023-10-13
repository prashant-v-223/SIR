import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Spin, Table, Tooltip } from "antd";
import { getTransferdata } from "../../Redux/TranfarSlice";

function TransferRepors() {
  const StackingbounsSlice = useSelector((state) => state.TransferdataSlice);
  console.log(StackingbounsSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Allreciveddata, setAllreciveddata] = React.useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      getTransferdata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
    setAllreciveddata(res.payload.data.reciveddata);
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
      title: "Wallet name",
      dataIndex: "tranforWallet",
      key: "tranforWallet",
      minwidth: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
            title: "To User Name",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      minwidth: "200px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address[0]?.username}>
          {address[0]?.username}
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
      minwidth: "250px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address.toFixed(4)}>
          {address.toFixed(4)}
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      minwidth: "350px",
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
  const columns1 = [
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
      title: "Wallet name",
      dataIndex: "tranforWallet",
      key: "tranforWallet",
      minwidth: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "From username",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      minwidth: "200px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address[0]?.username}>
          {address[0]?.username}
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
      minwidth: "250px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address.toFixed(4)}>
          {address.toFixed(4)}
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      minwidth: "350px",
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
        <Navbar />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Alldata}
                  title={() => "Transfer Coins Details"}
                  scroll={{ x: "1500px " }}
                />
              </div>
              <div className="col-12 p-2 p-lg-3">
                {Allreciveddata.length > 0 && (
                  <Table
                    columns={columns1}
                    dataSource={Allreciveddata}
                    title={() => "Received coin details"}
                    scroll={{ x: "1500px " }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default TransferRepors;
