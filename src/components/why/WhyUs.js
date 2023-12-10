import React from "react";
import Doctors from "../../assets/images/doctors.jpeg";
import "../services/services.css";

const WhyUs = () => {
  return (
    <div className="container px-4 py-5">
        <p className="dest-para">Why us</p>
        <h1 className="dest-header">Why patients choose us</h1>
        <div className="lines"></div>
      <img src={Doctors} alt="why us" className="img-responsive w-100" />
      <section className="features">
        <div className="container">
          <div className="feature-block d-lg-flex">
            <div className="feature-item mb-5 mb-lg-0">
              <h4 className="mb-3">Patient-Centric Approach</h4>
              <p className="mb-4">
                We put our patients at the centre of decision-making and involve
                them in their own care as active participants. Taking into
                account not only the your physical condition but also social,
                emotional, and cultural elements
              </p>
            </div>

            <div className="feature-item mb-5 mb-lg-0">
              <h4 className="mb-3">Safe Environment</h4>
              <p className="mb-4">
                We establish physical, psychological, and emotional environments
                that reduce cause harm to and enhance well-being for both our
                patients and healthcare staff.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
