const SecContent = () => {
	return(
        <div className="col-12 col-md-7">
          {/* Content Info */}
          <div className="contact_info_area d-sm-flex justify-content-between">
            <div className="contact_info text-center wow fadeInUp" data-wow-delay="0.2s">
              <h5>Useful Links</h5>
              <a href><p>Login</p></a>
              <a href><p>Register</p></a>
            </div>
            {/* Content Info */}
            <div className="contact_info text-center wow fadeInUp" data-wow-delay="0.3s">
              <h5>Privacy</h5>
              <a href><p>Privacy Policy</p></a>
              <a href='asasdad'><p>Terms & Conditions</p></a>
              <a href><p>Disclaimer</p></a>
              <a href><p>About SIR</p></a>
            </div>
            {/* Content Info */}
            <div className="contact_info text-center wow fadeInUp" data-wow-delay="0.4s">
              <h5>Contact Us</h5>
              <p>support@SIR</p>
            </div>
          </div>
        </div>
	)
}

export default SecContent