import React, { useEffect } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Wallatedata } from "../../Redux/WallatedatSlice";
import Progress from "antd/lib/progress";

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
            totalInvestment: obj.teamtotalstack,
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
      amount1: 1000,
      rewordshow: Profile1[0]?.Rank === "Trainee",
      renk: 1,
    },
    {
      name: "WARRIOR",
      amount: 7000,
      amount1: 8000,
      rewordshow: Profile1[0]?.Rank === "ACE",
      renk: 2,
    },
    {
      name: "CADET",
      amount: 20000,
      amount1: 28000,
      rewordshow: Profile1[0]?.Rank === "WARRIOR",
      renk: 3,
    },
    {
      name: "CAPTAIN",
      amount: 50000,
      amount1: 78000,
      rewordshow: Profile1[0]?.Rank === "CADET",
      renk: 4,
    },
    {
      name: "COMMANDER",
      amount: 150000,
      amount1: 228000,
      rewordshow: Profile1[0]?.Rank === "CAPTAIN",
      renk: 5,
    },
    {
      name: "PIONEER",
      amount: 300000,
      amount1: 528000,
      rewordshow: Profile1[0]?.Rank === "COMMANDER",
      renk: 6,
    },
    {
      name: "MASTERMIND",
      amount: 700000,
      amount1: 12528000,
      rewordshow: Profile1[0]?.Rank === "PIONEER",
      renk: 7,
    },
    {
      name: "RULER",
      amount: 1500000,
      amount1: 14028000,
      rewordshow: Profile1[0]?.Rank === "MASTERMIND",
      renk: 8,
    },
    {
      name: "AMBASSADOR",
      amount: 3400000,
      amount1: 17428000,
      rewordshow: Profile1[0]?.Rank === "RULER",
      renk: 9,
    },
    {
      name: "CROWN",
      amount: 7000000,
      amount1: 24428000,
      rewordshow: Profile1[0]?.Rank === "AMBASSADOR",
      renk: 10,
    },
    {
      name: "CROWN AMBASSADOR",
      amount: 15000000,
      amount1: 39428000,
      rewordshow: Profile1[0]?.Rank === "CROWN",
      renk: 11,
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
        let a = record.amount1 * 0.5;
        let b = record.amount * 0.5;
        console.log("data[index]", Profile);
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.rewordshow
                ? (Profile[0]?.totalInvestment / a) * 100 > 100
                  ? 100 + "%"
                  : (Profile[0]?.totalInvestment / a) * 100
                  ? (Profile[0]?.totalInvestment / a) * 100
                  : 0 + "%"
                : 0 + "%"
            }
          >
            <Progress
              type="circle"
              percent={
                record.rewordshow
                  ? (Profile[0]?.totalInvestment / (record.amount1 * 0.5)) *
                    0.5 *
                    100
                  : 0
              }
              format={() => (
                <h6 className="mx-auto d-block p-0 text-center w-100 mb-4">
                  {b}
                </h6>
              )}
            />
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
        console.log("sec", Profile);
        let a = record.amount1 * 0.25;
        let b = record.amount * 0.25;
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.rewordshow
                ? Profile[1]?.totalInvestment
                  ? (Profile[1]?.totalInvestment / a) * 100 >= 100
                    ? 100 + "%"
                    : (Profile[1]?.totalInvestment / a) * 100 + "%"
                  : 0 + "%"
                : 0 + "%"
            }
          >
            <Progress
              type="circle"
              percent={
                record.rewordshow
                  ? (Profile[1]?.totalInvestment / a) * 100 >= 100
                    ? 100
                    : (Profile[1]?.totalInvestment / a) * 100
                  : 0
              }
              format={() => (
                <h6 className="mx-auto d-block p-0 text-center w-100 mb-4">
                  {b}
                </h6>
              )}
            />
          </Tooltip>
          // <Tooltip placement="topLeft" title={record.amount}>
          //   {record.amount * 0.25} <br />
          //   My Second Power TotalInvestment{" "}
          //   {Profile.length > 1 ? Profile[1].totalInvestment : 0}
          // </Tooltip>
        );
      },
    },
    {
      title: "Remaining Legs",
      dataIndex: "amount",
      key: "amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        let a = record.amount1 * 0.25;
        let b = record.amount * 0.25;
        let lastteamtotalstack = 0;
        const lastThreeObjects = Profile?.slice(2, -1);
        for (let index = 0; index < lastThreeObjects.length; index++) {
          lastteamtotalstack += lastThreeObjects[index].totalInvestment;
        }
        console.log("lastteamtotalstack", lastteamtotalstack);
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.rewordshow
                ? (lastteamtotalstack / a) * 100 >= 100
                  ? 100 + "%"
                  : (lastteamtotalstack / a) * 100
                  ? (lastteamtotalstack / a) * 100
                  : 0 + "%"
                : 0 + "%"
            }
          >
            <Progress
              type="circle"
              percent={
                record.rewordshow
                  ? !lastteamtotalstack
                    ? 0
                    : lastteamtotalstack
                  : 0
              }
              format={() => (
                <h6 className="mx-auto d-block p-0 text-center w-100 mb-4">
                  {b}
                </h6>
              )}
            />
          </Tooltip>
        );
        // <Tooltip placement="topLeft" title={record.amount}>
        //   {record?.amount * 0.25} <br />
        //   My Remaining Power TotalInvestment{" "}
        //   {Profile.length > 2
        //     ? Profile[2]?.totalInvestment + Profile.length > 3
        //       ? Profile[3]?.totalInvestment
        //       : 0 + Profile.length > 4
        //       ? Profile[4]?.totalInvestment
        //       : 0
        //     : 0}
        // </Tooltip>
      },
    },
    {
      title: "status",
      dataIndex: "rewordshow",
      key: "rewordshow",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <h5>
            {record.renk === index + 1 && record.rewordshow
              ? !record.rewordshow
                ? "Completed"
                : "In Progress"
              : "Pending"}
          </h5>
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
              <div className="">My level:{Profile1[0]?.leval}</div>
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
