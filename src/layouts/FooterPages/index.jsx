import { FooterLogo, FooterPattern, FooterBg1 } from "../../utils/allImgs";

import "./footer.css";

import SecContact from "./SecContact";
import SecIco from "./SecIco";
import SecContent from "./SecContent";
import { useState } from "react";

const Footer = () => {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [Description, setDescription] = useState("");
  const [Timetocontact, setTimetocontact] = useState("");
  const [budget, setbudget] = useState("");

  function sendEmail() {
    var recipient = "";
    var subject = "Talk to us";
    var body = `name : ${name}, number: ${number},Description: ${Description}, Timetocontact:${Timetocontact},budget:${budget}`;
    console.log(body);

    var mailtoLink =
      "mailto:" +
      recipient +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoLink;
  }
  return (
    <footer className="footer-area bg-img">
      {/* <SecContact /> */}

      <div className="" id="contact">
        <div class="Contact_us">
          <div class="container py-5">
            <div class="contact_us_title mt-4">
              <h3 className="py-5">
                <span class="call_icon">
                  <i
                    class="fa fa-phone"
                    aria-hidden="true"
                    style={{ fontSize: "50px" }}
                  ></i>{" "}
                </span>
                Talk to us
              </h3>
              <p
                style={{
                  color: "rgb(48 196 139)",
                }}
              >
                Leave your details below and we’ll contact you to discuss
                purchasing  SIR.
              </p>
            </div>

            <div class="contact_form">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>

                <div class="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Mobile number"
                    onChange={(e) => {
                      setnumber(e.target.value);
                    }}
                  />
                </div>

                <div class="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Description / suggestion"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div class="col-lg-4 col-md-4">
                  <select
                    onChange={(e) => {
                      setTimetocontact(e.target.value);
                    }}
                  >
                    <option>Best Time to contact</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>

                <div class="col-lg-4 col-md-4">
                  <select
                    onChange={(e) => {
                      setbudget(e.target.value);
                    }}
                  >
                    <option>Investment budget</option>
                    <option> 1000UUDT-5000UUDT</option>
                    <option> 5000UUDT-10000UUDT</option>
                    <option> 10000UUDT-25000UUDT</option>
                    <option> 25000UUDT-50000UUDT</option>
                    <option> 50000UUDT+</option>
                  </select>
                </div>
              </div>

              <div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck"
                  />
                  <label class="custom-control-label" for="customCheck">
                    By submitting this form,I agree to the terms and privacy of
                    UUDT
                  </label>
                </div>
              </div>

              <div class="submit_btn_contact">
                <button
                  onClick={() => {
                    sendEmail();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer-content-area "
        style={{
          background: "#0b3645",
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <SecIco logo={FooterLogo} />
            <SecContent />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
