import React from "react";
import HeroImg from "../../assets/images/banner_img.png.webp";
import "../services/services.css";


const Hero = () => {
  return (
    <div className="hero">
    <div className="container px-4 py-5 mb-4">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mb-4">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={HeroImg}
            className="d-block mx-lg-auto img-fluid"
            alt="Hero Img"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6 ">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Your Health, Our Priority
          </h1>
          <div className="divider mb-3"></div>
          <p className="lead ">
            Welcome to ABSH, where we prioritize your
            well-being. Our dedicated team of healthcare professionals is
            committed to providing exceptional medical care tailored to your
            needs. Experience the convenience of easy online appointment
            booking. Your health journey begins here.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <a href="/login"><button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
            Book an Appointment
            </button></a>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">
              About Us
            </button>
          </div>
        </div>
      </div> 
    </div>
    </div>
 

  );
};

export default Hero;



