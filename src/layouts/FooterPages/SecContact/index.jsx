import SectionHeading from "../../../components/SectionHeading";
import Form from "./Form";

const SecContact = () => {
  return (
    <div className="contact_us_area pt-5 mt-5" id="contact">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12">
            <SectionHeading title="Contact With Us" />
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default SecContact;
