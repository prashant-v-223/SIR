const SecIco = ({ logo }) => {
  return (
    <>
      <div className="col-12 col-md-5">
        <div className="footer-copywrite-info">
          {/* Copywrite */}
          <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
            <div className="footer-logo">
              <a href="#">
                <img src={require("../../../assets/img/Logo.png")} alt="logo" />
              </a>
            </div>
          </div>
          {/* Social Icon */}
          <div
            className="footer-social-info wow fadeInUp d-block m-auto ps-3"
            data-wow-delay="0.4s"
          >
            <div
              className="footer-social-info wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <a href="">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
              <a href="">
                <i class="fa fa-telegram" aria-hidden="true"></i>
              </a>
              <a href="">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa fa-youtube" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecIco;
