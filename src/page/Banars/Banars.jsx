import React, { useEffect, useState } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Mainwallate123, V4XWallet123 } from "../../Redux/Mainwallate";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import axios from "axios";
import { Button, Table, Tooltip } from "antd";

function Banars() {
  const [alldata, setalldata] = useState([]);
  const [upload, setupload] = useState(!false);
  const [Data, setData] = useState("");
  const [step, setstep] = useState(!false);
  const handleChange1 = (info) => {
    setData(info.target.files[0]);
    toast.success("img upload successfully");
  };
  useEffect(() => {
    Alldata();
  }, []);
  const Alldata = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("data")) &&
        JSON.parse(localStorage.getItem("data")).data.token
      }`,
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/admin/addbenars`,
      method: "GET",
      headers: headersList,
    };
    axios
      .request(reqOptions)
      .then((res) => {
        setalldata(res.data.data);
      })
      .catch((err) => {
        toast.error("network error");
      });
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
      title: "Img",
      dataIndex: "img",
      key: "img",
      minwidth: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <img
          src={address}
          alt=""
          className="img-fluid"
          width={100}
          height={100}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      minwidth: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },
    {
      title: "IMG Delete",
      dataIndex: "_id",
      key: "_id",
      minwidth: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Button
          className=""
          onClick={async () => {
            let headersList = {
              Accept: "*/*",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("data")) &&
                JSON.parse(localStorage.getItem("data")).data.token
              }`,
              "Content-Type": "application/json",
            };
            let bodyContent = { _id: address };
            let reqOptions = {
              url: `${process.env.REACT_APP_API_URL}api/admin/removebenars`,
              method: "DELETE",
              data: bodyContent,
              headers: headersList,
            };
            axios
              .request(reqOptions)
              .then((res) => {
                Alldata();
              })
              .catch((err) => {
                toast.error("network error");
              });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Navbar1 />
      <div className="container-fluid blackbg">
        <div className="mainsection">
          <div className="row p-4">
            <div className="col-12">
              <p className="m-0 pb-2 text-light">
                Add photo / Attachment ( PNG / JPEG )
              </p>
              <div class="" style={{ width: 250 }}>
                <input
                  className={`form-control`}
                  name="img"
                  type="file"
                  id="floatingInput"
                  onChange={(e) => handleChange1(e)}
                  placeholder="Data.name"
                />
              </div>
            </div>
            <div className="col-12 py-4">
              <button
                type="submit"
                className="text-light d-flex align-items-center px-4 py-2 m-1"
                style={{
                  background: "rgba(22, 111, 245, 0.91)",
                  color: "#fff",
                }}
                onClick={() => {
                  if (Data !== "") {
                    setupload(!true);
                    const imageRef = ref(storage, `${Data.name + v4()}`);
                    uploadBytes(imageRef, Data).then((snapshot) => {
                      getDownloadURL(snapshot.ref).then(async (url) => {
                        console.log(url);
                        let bodyContent = {
                          img: url,
                        };
                        let headersList = {
                          Accept: "*/*",
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("data")) &&
                            JSON.parse(localStorage.getItem("data")).data.token
                          }`,
                          "Content-Type": "application/json",
                        };
                        console.log("url", url);
                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_URL}api/admin/addbenars`,
                          method: "POST",
                          data: bodyContent,
                          headers: headersList,
                        };
                        axios
                          .request(reqOptions)
                          .then((res) => {
                            toast.success("Baner upload successfully");
                            setstep(!step);
                            Alldata();
                            setupload(true);
                          })
                          .catch((err) => {
                            toast.error("network error");
                          });
                      });
                    });
                  } else {
                    toast.error("upload img");
                    setData("");
                    setupload(true);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="row p-4">
            <h4 className="text-light">All upload Banners </h4>
            {alldata.map((e) => {
              return <div className="col-12 col-md-6 col-lg-3"></div>;
            })}{" "}
            <Table
              columns={columns}
              dataSource={alldata}
              title={() => "Transfer Coins Details"}
              scroll={{ x: "1500px " }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banars;
