const SecCopywrite = ({ img }) => {
  return (
    <div className="footer-copywrite-info">
      <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
        <img src={logo} alt="logo" width={120} height={70} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          ducimus voluptatibus neque illo id repellat quisquam? Autem expedita
          earum quae laborum ipsum ad, a eaque officiis eligendi blanditiis odio
          necessitatibus.
        </p>
      </div>
      <div className="footer-social-info wow fadeInUp " data-wow-delay="0.4s">
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

export default SecCopywrite;
