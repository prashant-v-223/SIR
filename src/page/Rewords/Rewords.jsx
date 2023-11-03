import React, { useEffect } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Wallatedata } from "../../Redux/WallatedatSlice";

function Rewords() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [Profile, setProfile] = React.useState({});
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    const res = await dispatch(
      Wallatedata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      setProfile(res.payload.data);
    } else {
      navigation("/");
    }
  };
  console.log(Profile);
  const data = [
    {
      name: "ACE",
      amount: 1000,
    },
    {
      name: "WARRIOR",
      amount: 7000,
    },
    {
      name: "CADET",
      amount: 20000,
    },
    {
      name: "CAPTAIN",
      amount: 50000,
    },
    {
      name: "COMMANDER",
      amount: 150000,
    },
    {
      name: "PIONEER",
      amount: 300000,
    },
    {
      name: "MASTERMIND",
      amount: 700000,
    },
    {
      name: "RULER",
      amount: 1500000,
    },
    {
      name: "AMBASSADOR",
      amount: 3400000,
    },
    {
      name: "CROWN",
      amount: 7000000,
    },
    {
      name: "CROWN AMBASSADOR",
      amount: 15000000,
    },
  ];
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "100px",
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={index + 1}>
            {index + 1}
          </Tooltip>
        );
      },
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.name}>
            {record.name}
          </Tooltip>
        );
      },
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.amount}>
            {record.amount}
          </Tooltip>
        );
      },
    },
    {
      title: "Active",
      dataIndex: "Active",
      key: "Active",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.Active}>
            {record.Active}
          </Tooltip>
        );
      },
    },
  ];
  return (
    <>
      <Navbar1 />
      <div className="container-fluid blackbg">
        <div className="mainsection">
          <div className="row px-3 pt-4 justify-content-center">
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
              title={() => "Your Staking Details"}
              scroll={{ x: "1500px " }}
              exportable
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Rewords;
