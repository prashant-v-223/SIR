import React, { useEffect } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Wallatedata } from "../../Redux/WallatedatSlice";

function Rewords() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [Profile, setProfile] = React.useState([]);
  const [Profile1, setProfile1] = React.useState([]);
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
      const resultArray = [];
      setProfile1(res.payload.data.profile);
      for (const obj of res.payload.data?.ReffData1) {
        if (obj) {
          resultArray.push({
            totalInvestment: obj.mystack + obj.teamtotalstack,
            username: obj.username,
          });
        }
      }
      let data = resultArray.sort(
        (e, s) => s.totalInvestment - e.totalInvestment
      );
      setProfile(data);
    } else {
      navigation("/");
    }
  };

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
      title: "Name",
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
      title: "Amount",
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
      title: "First Power",
      dataIndex: "amount",
      key: "amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.amount}>
            {record.amount * 0.5} <br />
            My First Power TotalInvestment{" "}
            {Profile.length > 0 ? Profile[0].totalInvestment : 0}
          </Tooltip>
        );
      },
    },
    {
      title: "Second Power",
      dataIndex: "amount",
      key: "amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.amount}>
            {record.amount * 0.25} <br />
            My Second Power TotalInvestment{" "}
            {Profile.length > 1 ? Profile[1].totalInvestment : 0}
          </Tooltip>
        );
      },
    },
    {
      title: "Remaining Power",
      dataIndex: "amount",
      key: "amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={record.amount}>
            {record?.amount * 0.25} <br />
            My Remaining Power TotalInvestment{" "}
            {Profile.length > 2
              ? Profile[2]?.totalInvestment + Profile.length > 3
                ? Profile[3]?.totalInvestment
                : 0 + Profile.length > 4
                ? Profile[4]?.totalInvestment
                : 0
              : 0}
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
            <h1 className="text-crnter d-block m-auto text-dark">My Rewards</h1>
            <div className="d-flex justify-content-between py-4 px-3">
              <div className="">My Rank :{Profile1[0]?.Rank}</div>
              <div className="">My leval :{Profile1[0]?.leval}</div>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
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
