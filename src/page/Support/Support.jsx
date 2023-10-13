import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Formik, Form } from "formik";
import "./support.scss";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin } from "antd";
function Support() {
  const [alldata, setalldata] = useState([]);
  const [upload, setupload] = useState(!false);
  const [upload1, setupload1] = useState(!false);
  const [Data, setData] = useState("");
  const [step, setstep] = useState(!false);
  useEffect(() => {}, [step]);
  const LoginValidation1 = yup.object({
    description: yup.string().required("description is required ."),
  });
  const handleChange1 = (info) => {
    setData(info.target.files[0]);
    toast.success("img upload successfully");
  };
  return (
    <>
      <Spin spinning={!upload1}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div
              className="d-flex justify-content-between align-content-center"
              style={{
                minHeight: "81vh",
                height: "100%",
              }}
            >
              <div className="d-block m-auto">
                <div className="p-4 Boxcard">
                  <h5 className="py-2 text-light">Create your new ticket</h5>
                  <Formik
                    initialValues={{}}
                    validationSchema={LoginValidation1}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                      if (Data !== "") {
                        setupload(!true);
                        const imageRef = ref(storage, `${Data.name + v4()}`);
                        uploadBytes(imageRef, Data).then((snapshot) => {
                          getDownloadURL(snapshot.ref).then(async (url) => {
                            console.log(url);
                            let bodyContent = {
                              description: values.description,
                              img: url,
                            };
                            let headersList = {
                              Accept: "*/*",
                              Authorization: `Bearer ${
                                JSON.parse(localStorage.getItem("data")) &&
                                JSON.parse(localStorage.getItem("data")).data
                                  .token
                              }`,
                              "Content-Type": "application/json",
                            };
                            console.log("url", url);
                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_URL}api/registration/addTicket`,
                              method: "POST",
                              data: bodyContent,
                              headers: headersList,
                            };
                            axios
                              .request(reqOptions)
                              .then((res) => {
                                toast.success("Ticket upload successfully");
                                setstep(!step);
                                setData("");
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
                    {({ values, errors, handleChange }) => (
                      <>
                        <Form>
                          <div className="row">
                            <div className="col-12">
                              <div class="form-floating mb-2">
                                <textarea
                                  className={`form-control ${
                                    errors.Password && "was-validated"
                                  }`}
                                  name="description"
                                  id="floatingInput"
                                  onChange={handleChange}
                                  placeholder="Enter full name"
                                  style={{
                                    height: "100px",
                                    background: "transparent",
                                    color: "#fff",
                                  }}
                                />
                                <label
                                  for="floatingInput"
                                  className="text-light"
                                >
                                  Description of the issue
                                </label>
                                {errors.description ? (
                                  <div className="error text-danger">
                                    {errors.description}
                                  </div>
                                ) : null}
                              </div>
                            </div>
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
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Support;
