import React, { useEffect, useState } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { Mainwallate123, Wallet123 } from "../../Redux/Mainwallate";

const { RangePicker } = DatePicker;
function Ewallate() {
  const [Alldata, setAlldata] = useState([]);
  const [Fillter, setFillter] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Wallet123({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setFillter(res.payload.data.data.reverse());
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
      title: "Credited",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Amount}>
          {record.type !== 0 ? record.Amount.toFixed(8) : "-"}
        </Tooltip>
      ),
    },
    {
      title: "Debited",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Amount}>
          {record.type === 0 ? record.Amount.toFixed(8) : "-"}
        </Tooltip>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balace",
      key: "balace",
      ellipsis: {
        showTitle: false,
      },
      width: "180px",
      render: (text, record, index) => (
        <Tooltip
          placement="topLeft"
          title={
            record.type !== 0
              ? Number(record.balace + record.Amount).toFixed(8)
              : Number(record.balace - record.Amount).toFixed(8)
          }
        >
          {record.type !== 0
            ? Number(record.balace + record.Amount).toFixed(8)
            : Number(record.balace - record.Amount).toFixed(8)}
        </Tooltip>
      ),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          {record.Note + " "} {record.Usernameby}
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
  const handleChange1 = async (value) => {
    if (value) {
      var startDate = new Date(value[0]).getTime();
      var endDate = new Date(value[1]).getTime();
      var resultProductData = Fillter.filter((a) => {
        return (
          new Date(a.createdAt).getTime() >= new Date(startDate) &&
          new Date(a.createdAt).getTime() <= new Date(endDate)
        );
      });
      setFillter(resultProductData);
    } else {
      const res = await dispatch(
        Wallet123({
          Token:
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token,
        })
      );
      setAlldata(res.payload.data.data);
      setFillter(res.payload.data.data);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Fillter.filter((truck) => {
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
  return (
    <div>
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
            </Col>
            <div className="col-12 p-2 p-lg-3">
              <Table
                columns={columns}
                bordered={true}
                dataSource={Fillter}
                title={() => "UUDT Wallet Report"}
                scroll={{ x: "calc(500px + 50%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ewallate;
