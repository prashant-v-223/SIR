import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, DatePicker, Modal, Spin, Table, Tooltip } from "antd";
import CreatableSelect from "react-select/creatable";
import { Col, Input } from "antd";
import Text from "antd/lib/typography/Text";
import {
  Adminuserdata,
  Adminwallateblock,
  Emailcheng,
  userdatablock,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ExportToExcel } from "../../ExportToExcel";
const { RangePicker } = DatePicker;
function Admin() {
  const navigation = useNavigate();
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const [Allreciveddata, setAllreciveddata] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
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
      userdatablock({
        usename: values.usename,
        note: values.note,
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
  const handleOk2 = async () => {
    setIsModalOpen2(false);
    const res = await dispatch(
      Emailcheng({
        username: values.usename,
        note: values.note,
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
    setIsModalOpen2(false);
    setValues({
      note: "",
    });
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Adminuserdata({
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
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "120px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      width: "300px",
      sorter: (a, b) => a.username.slice(3, -1) - b.username.slice(3, -1),
      render: (text, record, index) => (
        <Tooltip
          placement="topLeft"
          title={record.username + `(${record.Fullname})`}
        >
          {record.username + `(${record.Fullname})`}
        </Tooltip>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      width: "300px",
      sorter: (a, b) => a.email.length - b.email.length,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "SponserId",
      dataIndex: "supporterId",
      key: "supporterId",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.username.slice(3, -1) - b.username.slice(3, -1),
      width: "150px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "mainId",
      dataIndex: "mainId",
      key: "mainId",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.username.slice(3, -1) - b.username.slice(3, -1),
      width: "150px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      key: "Rank",
      ellipsis: {
        showTitle: false,
      },
      width: "150px",
      sorter: (a, b) => a.Rank.length - b.Rank.length,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },

    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.isActive - b.isActive,
      render: (text, record, index) => (
        <Tooltip
          placement="topLeft"
          title={record.isActive ? "Block" : "UNBLOCK"}
        >
          <p> {!record.isActive ? "Block" : "UNBLOCK"}</p>
        </Tooltip>
      ),
    },
    {
      title: "User block",
      dataIndex: "isActive",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.isActive - b.isActive,
      render: (text, record, index) => (
        <Button className="" onClick={() => showModal(record.username)}>
          {record.isActive ? "Block" : "UNBLOCK"}
        </Button>
      ),
    },
    {
      title: "wallate block",
      dataIndex: "iswalletActive",
      key: "createdAt",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Button
          className="d-block m-auto"
          onClick={async () => {
            const res = await dispatch(
              Adminwallateblock({
                username: record.username,
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
          }}
        >
          {record.iswalletActive ? "Block" : "UNBLOCK"}
        </Button>
      ),
    },
    {
      title: "Edit Email",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Button
          className="d-block m-auto"
          onClick={async () => {
            setIsModalOpen2(true);
            setValues({ ...values, usename: record.username });
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.note.length - b.note.length,
      render: (address) => (
        <>
          <Tooltip placement="topLeft" title={address?.toString()}>
            <p className="">{address ? address.toString() : ""}</p>
          </Tooltip>
        </>
      ),
    },
    {
      title: "View Account",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Button
          className="d-block m-auto"
          onClick={() =>
            navigation(`/login?${record.username}?${record.password}`)
          }
        >
          <BsEyeFill />
        </Button>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck?.email.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.username.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.leval.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.isActive.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.email.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.teamtotalstack
            .toString()
            .toLowerCase()
            .match(value.toLowerCase())
        );
      });
      console.log(data);
      setFillter(data);
    } else {
      getalldata();
    }
  };
  const onChange1 = (value) => {
    console.log(value);
    if (value["label"] === "All") {
      getalldata();
    } else {
      let data = Alldata.filter((truck) => {
        return truck.Rank.toString()
          .toLowerCase()
          .match(value["label"].toLowerCase());
      });
      setFillter(data);
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
              <Col className="px-3 d-flex flex-wrap" xs={24} lg={12}>
                <div
                  className="me-md-3"
                  style={{ width: "100%", maxWidth: "300px" }}
                >
                  <Text>Source</Text>
                  <br />
                  <Input
                    showSearch
                    style={{ width: "100%", maxWidth: "300px" }}
                    placeholder="Search"
                    name="serch"
                    onChange={handleChange}
                  />
                </div>
                {/* <div
                  className="ms-md-3"
                  style={{ width: "100%", maxWidth: "300px" }}
                >
                  <Text>Source</Text>
                  <br />
                  <CreatableSelect
                    isClearable
                    options={[
                      {
                        value: "All",
                        label: "All",
                      },
                      {
                        value: "DIRECT",
                        label: "DIRECT",
                      },
                      {
                        value: "COMMUNITY ⭐",
                        label: "COMMUNITY ⭐",
                      },
                      {
                        value: "COMMUNITY ⭐⭐",
                        label: "COMMUNITY ⭐⭐",
                      },
                      {
                        value: "COMMUNITY ⭐⭐⭐",
                        label: "COMMUNITY ⭐⭐⭐",
                      },
                      {
                        value: "COMMUNITY ⭐⭐⭐⭐",
                        label: "COMMUNITY ⭐⭐⭐⭐",
                      },
                      {
                        value: "COMMUNITY ⭐⭐⭐⭐⭐",
                        label: "COMMUNITY ⭐⭐⭐⭐⭐",
                      },
                      {
                        value: "COMMUNITY ⭐⭐⭐⭐⭐⭐",
                        label: "COMMUNITY ⭐⭐⭐⭐⭐⭐",
                      },
                      {
                        value: "COMMUNITY ⭐B",
                        label: "COMMUNITY ⭐B",
                      },
                      {
                        value: "COMMUNITY ⭐A",
                        label: "COMMUNITY ⭐A",
                      },
                      {
                        value: "COMMUNITY ⭐TRUST",
                        label: "COMMUNITY ⭐TRUST",
                      },
                      {
                        value: "CORE TEAM",
                        label: "CORE TEAM",
                      },
                    ]}
                    placeholder="User Rank"
                    onChange={onChange1}
                  />
                </div> */}
              </Col>
              <Col
                className="px-3 d-flex  justify-content-end align-items-center py-3"
                xs={24}
                lg={12}
              >
                <RangePicker size="large" onChange={handleChange1} />
                <ExportToExcel apiData={Fillter} fileName={"UserAllDetails"} />
              </Col>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "User All Details"}
                  scroll={{ x: "2000px" }}
                  bordered={true}
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
        <Modal
          title="Basic Modal"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <InputField
            type="text"
            placeholder="note"
            name="note"
            value={values.note}
            disabled={!true}
            onChange={onChange}
            style={{
              color: "#000 !important",
            }}
          />
        </Modal>
        <Modal
          title="Email Chenge"
          centered
          open={isModalOpen2}
          onOk={handleOk2}
          onCancel={handleCancel}
        >
          <InputField
            type="email "
            placeholder="Email"
            name="note"
            value={values.note}
            disabled={!true}
            onChange={onChange}
            style={{
              color: "#000 !important",
            }}
          />
        </Modal>
      </Spin>
    </>
  );
}

export default Admin;
