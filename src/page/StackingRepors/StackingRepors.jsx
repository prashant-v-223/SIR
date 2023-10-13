import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import Text from "antd/lib/typography/Text";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import { Spin, Table, Tooltip } from "antd";
import { ExportToExcel } from "../../ExportToExcel";

const { RangePicker } = DatePicker;
function StackingRepors() {
  const StackingbounsSlice = useSelector((state) => state.StackingbounsSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Fillter, setFillter] = React.useState([]);
  const [Alldata, setAlldata] = React.useState([]);
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
      Stackingbouns({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(
      res.payload.data.data.filter((e) => {
        return e.Note === "You Got Staking Bonus Income.";
      })
    );
    setFillter(
      res.payload.data.data.filter((e) => {
        return e.Note === "You Got Staking Bonus Income.";
      })
    );
  };
  let newdata = console.log("newdata");
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "110px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
      minwidth: "400px",
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
      width: "200px",
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
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toDateString()}>
          {new Date(address).toDateString()}
        </Tooltip>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck?.Note?.toString().toLowerCase().match(value.toLowerCase()) ||
          truck?.Amount?.toString().toLowerCase().match(value.toLowerCase())
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
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
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
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "Staking Bonus Details"}
                  scroll={{ x: "1500px " }}
                  bordered={true}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    current: page,
                    pageSizeOptions: ["25", "50", "75", "100"],
                    showPageSizeOptions: true,
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

export default StackingRepors;
