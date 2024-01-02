import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { Spin, Table, Tooltip } from "antd";
import CreatableSelect from "react-select/creatable";
import { daireactteam } from "../../Redux/daireactteam";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ExportToExcel } from "../../ExportToExcel";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

function Daireacttermpage() {
  const daireactteamSlice = useSelector((state) => state.daireactteamSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const [values, setValues] = React.useState({ serch: "" });
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      daireactteam({
        serch: values.serch,
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res?.payload?.data.ReffData[0]?.referBY);
    setFillter(res?.payload?.data.ReffData[0]?.referBY);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck.username.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.Rank.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.refferalId
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.refferalBy
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.supporterId
            ?.toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.mainId?.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.walletaddress
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.email.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.createdAt.toString().toLowerCase().match(value.toLowerCase())
        );
      });
      setFillter(data);
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
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "100px",
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
          {record.username + "  " + `(${record.Fullname})`}
        </Tooltip>
      ),
    },
    {
      title: "depthleval",
      dataIndex: "depthleval",
      key: "depthleval",
      filters: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
        { text: "13", value: 13 },
        { text: "14", value: 14 },
        { text: "15", value: 15 },
        { text: "16", value: 16 },
        { text: "17", value: 17 },
        { text: "18", value: 18 },
        { text: "19", value: 19 },
        { text: "20", value: 20 },
      ],
      onFilter: (value, record) => record.depthleval === value - 1,
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.depthleval - b.depthleval,
      width: "150px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address + 1}>
          {address + 1}
        </Tooltip>
      ),
    },
    {
      title: "supporterId",
      dataIndex: "supporterId",
      key: "supporterId",
      sorter: (a, b) => a.username.slice(3, -1) - b.username.slice(3, -1),
      ellipsis: {
        showTitle: false,
      },
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
      sorter: (a, b) => a.username.slice(3, -1) - b.username.slice(3, -1),
      ellipsis: {
        showTitle: false,
      },
      width: "150px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "StatUs",
      dataIndex: "mystack",
      key: "mystack",
      ellipsis: {
        showTitle: false,
      },
      width: "150px",
      sorter: (a, b) => a.mystack - b.mystack,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address ? "ACTIVE" : "INACTIVE"}
        </Tooltip>
      ),
    },
    {
      title: "Stacking",
      dataIndex: "mystack",
      key: "mystack",
      ellipsis: {
        showTitle: false,
      },
      width: "100px",
      sorter: (a, b) => a.mystack - b.mystack,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address ? address : 0}
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
      sorter: (a, b) => a.Rank.length - b.Rank.length,
      width: "150px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Activation date",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultFilteredValue: ["Open"],
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },
  ];
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
  return (
    <>
      <Spin spinning={daireactteamSlice && !daireactteamSlice.isLoader}>
        <Navbar />
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
              </Col>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  bordered={true}
                  pagination={{
                    defaultPageSize: 10,
                    pageSizeOptions: ["25", "50", "75", "100"],
                    showPageSizeOptions: true,
                    showSizeChanger: true,
                    current: page,
                    onChange: (page, pageSize) => onTabChange(page, pageSize),
                  }}
                  title={() => "My SIR Total Team"}
                  scroll={{ x: "calc(1700px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Daireacttermpage;
