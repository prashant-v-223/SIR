import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Spin, Table, Tooltip } from "antd";
import { Col, DatePicker, Input } from "antd";
import {
  Adminprice,
  GETprice,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";
import { ExportToExcel } from "../../ExportToExcel";
const { RangePicker } = DatePicker;
function Livaprice() {
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Fillter, setFillter] = React.useState([]);
  const [Alldata, setAlldata] = React.useState([]);
  const [values, setValues] = React.useState({
    Amount: "",
  });
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      GETprice({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
    setFillter(res.payload.data.data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(values.Amount);
    if (values.Amount > 0) {
      const res = await dispatch(
        Adminprice({
          price: values.Amount,
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

  const handleChange1 = (value) => {
    if (value) {
      var startDate = new Date(value[0]).getTime();
      var endDate = new Date(value[1]).getTime();
      var resultProductData = Alldata.filter((a) => {
        return (
          new Date(a.createdAt).getTime() >= new Date(startDate) &&
          new Date(a.createdAt).getTime() <= new Date(endDate)
        );
      });
      console.log(resultProductData);
      setFillter(resultProductData);
    } else {
      getalldata();
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
      title: "price",
      dataIndex: "price",
      key: "price",
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
              <div className="col-12 col-md-10 p-2 p-lg-3">
                <InputField
                  type="number"
                  name="Amount"
                  min={0}
                  placeholder="Enter Amount"
                  value={values.Amount}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-12 col-md-2 p-2 p-lg-3">
                <button
                  style={{
                    background: "#0c7f52",
                    color: "#fff",
                    height: 60,
                    width: 180,
                    border: "none",
                  }}
                  className="d-block m-auto"
                  onClick={() => handleSubmit()}
                >
                  submit
                </button>
              </div>
              <Col
                className="px-3 d-flex  justify-content-start align-items-center pb-3"
                xs={24}
                lg={12}
              >
                <RangePicker size="large" onChange={handleChange1} />
                <ExportToExcel apiData={Fillter} fileName={"PriceDetails"} />
              </Col>
              <div className="col-12">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "Price Details"}
                  scroll={{ x: "1500px " }}
                  bordered={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Livaprice;
