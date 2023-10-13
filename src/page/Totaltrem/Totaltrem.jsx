import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Col, Input } from "antd";
import CreatableSelect from "react-select/creatable";
import Text from "antd/lib/typography/Text";
import { DatePicker, Tooltip, Spin, Table } from "antd";
import { indaireactteam } from "../../Redux/indaireactteam";
import { ExportToExcel } from "../../ExportToExcel";
import { RiFileExcel2Line } from "react-icons/ri";
const { RangePicker } = DatePicker;
function Totaltrempage() {
  const indaireactteamSlice = useSelector((state) => state.indaireactteamSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      indaireactteam({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res?.payload?.data.ReffData);
    setFillter(res?.payload?.data.ReffData);
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
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
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
      title: "Direct SponserId",
      dataIndex: "refferalBy",
      key: "refferalBy",
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
      title: "Created At",
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
  return (
    <>
      <Spin spinning={indaireactteamSlice && !indaireactteamSlice.isLoader}>
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
                    onSelect={handleChange}
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
                <RangePicker
                  size="large"
                  onChange={handleChange1}
                  onPressEnter={handleChange1}
                />
              </Col>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  bordered={true}
                  dataSource={Fillter}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["25", "50", "75", "100"],
                    showPageSizeOptions: true,
                    current: page,
                    onChange: (page, pageSize) => onTabChange(page, pageSize),
                  }}
                  title={() => "UUDT Direct Team"}
                  scroll={{ x: "calc(1450px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Totaltrempage;
