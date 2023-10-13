import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbaradmin from "../../components/Navbaradmin/Navbaradmin";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Button, Modal, Spin, Table, Tooltip } from "antd";
import { getTransferdata } from "../../Redux/TranfarSlice";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import Text from "antd/lib/typography/Text";
import {
  Adminuserdata,
  Alltranfordata,
  Supportdata,
  userdatablock,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";
import { ExportToExcel } from "../../ExportToExcel";

const { RangePicker } = DatePicker;
function AdminSupport() {
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const [Allreciveddata, setAllreciveddata] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    note: "",
    usename: "",
  });
  const showModal = (e) => {
    setValues({ ...values, usename: e });
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const res = await dispatch(
      Alltranfordata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      setValues({
        note: "",
        usename: "",
      });
      getalldata();
    } else {
      toast.error(res.payload.data.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValues({
      note: "",
    });
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Supportdata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
    setFillter(res.payload.data.data);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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
      title: "username",
      dataIndex: "result",
      key: "sno",
      render: (address) => (
        <Tooltip placement="topLeft" title={address?.username}>
          {address?.username}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      minwidth: "200px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      ellipsis: {
        showTitle: false,
      },
      minwidth: "250px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          <img src={address} alt="" width={80} height={80} />
        </Tooltip>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
     
          truck?.email
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.username
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.leval
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.isActive
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.email
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.teamtotalstack
            .toString()
            .toString()
            .toLowerCase()
            .match(value.toLowerCase())
        );
      });
      console.log(data);
      setAlldata(data);
    } else {
      getalldata();
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
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <Col className="px-3" xs={24} lg={12}>
                <div className="">
                  <Text>Source</Text>
                  <br />
                  <Input
                    showSearch
                    style={{ width: "100%", maxWidth: "300px" }}
                    placeholder="Search"
                    className="mb-4"
                    name="serch"
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col
                className="px-3 d-flex  justify-content-end align-items-center py-3"
                xs={24}
                lg={12}
              >
                <RangePicker size="large" onChange={handleChange1} />
                <ExportToExcel apiData={Fillter} fileName={"Support"} />
              </Col>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "Support"}
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

export default AdminSupport;
