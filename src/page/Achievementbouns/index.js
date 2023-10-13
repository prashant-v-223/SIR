import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Spin, Table, Tooltip } from "antd";
import { Achievementbouns } from "../../Redux/Achievement";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import { BsSearch } from "react-icons/bs";
import Text from "antd/lib/typography/Text";
import InputField from "../../components/InputField";
import moment from "moment";
import { MailFilled } from "@ant-design/icons";
import { ExportToExcel } from "../../ExportToExcel";
function Achievementpage() {
  const AchievementbounsSlice = useSelector(
    (state) => state.AchievementbounsSlice
  );
  const { RangePicker } = DatePicker;
  const [Fillter, setFillter] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [values, setValues] = React.useState({ serch: "" });
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  useEffect(() => {
    getalldata();
  }, []);
  console.log(Alldata);
  const getalldata = async () => {
    const res = await dispatch(
      Achievementbouns({
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
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck?.createdAt
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck?.Amount.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.Note.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.Usernameby.toString().toLowerCase().match(value.toLowerCase())
        );
      });
      setFillter(data);
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
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
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
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: "250px",
      ellipsis: {
        showTitle: false,
      },
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
      <Spin spinning={AchievementbounsSlice && !AchievementbounsSlice.isLoader}>
        <Navbar />
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
              </Col>
              <div className="col-12 p-2 p-lg-3 pt-lg-0">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "Achievement Bonus Details"}
                  scroll={{ x: "1500px " }}
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
      </Spin>
    </>
  );
}

export default Achievementpage;
