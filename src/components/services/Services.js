import React from "react";
import ServiceCard from "./ServiceCard";
import "./services.css";
import Surgery from "../../assets/images/surgery.webp";
import Diagonosis from "../../assets/images/diagnosis.jpg";
import Telemedicine from "../../assets/images/telemedicine.jpg";


const Services = () => {
  return (
    <>
      <div className="container">
        <p className="dest-para">Services</p>
        <h1 className="dest-header">Our Services</h1>
        <div className="lines"></div>
        <div className="row align-items-center">
          <div className="col">
            <ServiceCard
              heading={"General surgery"}
              text={
                "Specialized surgeries such as orthopedic, cardiac, or neurosurgery."
              }
              img={Surgery}
            />
          </div>
          <div className="col">
            <ServiceCard
              heading={"Diagnostic Services"}
              text={
                "Imaging services (X-rays, CT scans, MRIs) and Laboratory tests (blood tests, pathology)."
              }
              img={Diagonosis}
            />
          </div>
          <div className="col">
            <ServiceCard
              heading={"Telemedicine"}
              text={
                "Receive remote diagnosis and treatment from professionals via technology."
              }
              img={Telemedicine}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
