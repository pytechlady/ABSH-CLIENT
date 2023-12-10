import React from "react";
import Cards from "../services/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faFilePrescription,
  faLaptop,
  faUserDoctor,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import "../services/services.css";

const SubHero = () => {
  return (
    <div className="container mb-5">
      <section className="features">
        <div className="row align-items-center feature-block">
          <div className="col feature-item">
            <Cards
              heading={
                <div className="d-flex justify-content-start">
                  <FontAwesomeIcon
                    className="me-2 feature-icon"
                    icon={faCalendarCheck}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                  <FontAwesomeIcon
                    className="feature-icon"
                    icon={faFilePrescription}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                </div>
              }
              text={
                <div>
                  <span>Easy Booking</span>
                  <h4 className="mb-3">Online Appoinment</h4>
                  <p className="mb-4">
                    Book appointments effortlessly with our user-friendly online
                    platform.
                  </p>
                </div>
              }
            />
          </div>
          <div className="col feature-item">
            <Cards
              heading={
                <div className="d-flex justify-content-start">
                  <FontAwesomeIcon
                    className="me-2"
                    icon={faUserDoctor}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                  <FontAwesomeIcon
                    icon={faUserNurse}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                </div>
              }
              text={
                <div>
                  <span>Specialized Care</span>
                  <h4 className="mb-3">Professional Staffs</h4>
                  <p className="mb-4">
                    Access specialized care with our experienced team of doctors
                    and healthcare providers.
                  </p>
                </div>
              }
            />
          </div>
          <div className="col feature-item">
            <Cards
              heading={
                <div className="d-flex justify-content-start">
                  <FontAwesomeIcon
                    className="me-2"
                    icon={faClock}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                  <FontAwesomeIcon
                    icon={faLaptop}
                    flip
                    style={{ color: "#0d6efd" }}
                    size="2xl"
                  />
                </div>
              }
              text={
                <div>
                  <span>24/7 Access</span>
                  <h4 className="mb-3">Emergency Cases</h4>
                  <p>
                    Our services are available 24/7 for your convenience. Get
                    Conneted with us for any urgency .
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubHero;
