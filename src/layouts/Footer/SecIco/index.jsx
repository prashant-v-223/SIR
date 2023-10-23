const SecIco = ({ logo }) => {
  return (
    <div className="col-12 col-md-5">
      <div className="footer-copywrite-info">
        {/* Copywrite */}
        <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
          <img src={logo} alt="logo" />
        </div>
        {/* Social Icon */}
        <div className="footer-social-info wow fadeInUp" data-wow-delay="0.4s">
          <a href="">
            <i className="fa fa-facebook" aria-hidden="true" />
          </a>
          <a href="">
            <i className="fa fa-twitter" aria-hidden="true" />
          </a>
          <a href="">
            <i className="fa fa fa-youtube" aria-hidden="true" />
          </a>
          <a href="https://twitter.com/SIRcoin?s=21&t=q4PgRWbQnOeYwKXzLtJlEw">
            <i className="fa fa-instagram" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecIco;
