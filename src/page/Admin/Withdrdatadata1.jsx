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
  Withdrdatadata,
  Withdrdatadata12,
  Withdrdatadatauser,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";

function Withdrdatadata1() {
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [Alldata, setAlldata] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const [values, setValues] = React.useState({
    username: "",
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
      Withdrdatadatauser({
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
        Withdrdatadata({
          Token:
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token,
        })
      );
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
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
        <Tooltip placement="topLeft" title={record.username}>
          {record.username}
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
        <Tooltip placement="topLeft" title={record.email}>
          {record.email}
        </Tooltip>
      ),
    },
    {
      title: "walletaddress",
      dataIndex: "walletaddress",
      key: "walletaddress",
      ellipsis: {
        showTitle: false,
      },
      width: "400px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.walletaddress}>
          {record?.walletaddress}
        </Tooltip>
      ),
    },
    {
      title: "withdrawalAmount",
      dataIndex: "withdrawalAmount",
      key: "withdrawalAmount",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.withdrawalAmount}>
          {record?.withdrawalAmount}
        </Tooltip>
      ),
    },
    {
      title: "Admincharges",
      dataIndex: "Admincharges",
      key: "Admincharges",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          {record.Admincharges}
        </Tooltip>
      ),
    },
    {
      title: "startus",
      dataIndex: "transactionshsh",
      key: "transactionshsh",
      ellipsis: {
        showTitle: false,
      },
      width: "140px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          <p
            className={
              record.transactionshsh === "no"
                ? "btn btn-danger p-2 text-center"
                : record.transactionshsh === "yes"
                ? "btn btn-success p-2  text-center"
                : "btn btn-warning p-2  text-center"
            }
            style={{ width: 90 }}
          >
            {record.transactionshsh === "no"
              ? "failed"
              : record.transactionshsh === "yes"
              ? "success"
              : "pending"}
          </p>
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
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Alldata}
                  bordered={true}
                  title={() => "Withdraw Report"}
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
        </div>
      </Spin>
    </>
  );
}

export default Withdrdatadata1;
