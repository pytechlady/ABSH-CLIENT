import React from "react";

const ServiceCard = ({ text, heading, img}) => {
  return (
    <div className="container">
    <section className="mx-auto my-5" style={{maxWidth: "23rem"}}>
  
      <div className="card">
        <div className="card-body d-flex flex-row">
          <div>
            <h5 className="card-title font-weight-bold mb-2 text-uppercase">{heading}</h5>
          </div>
        </div>
        <div className="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
          <img className="img-fluid" src={img}
            alt="Card cap" />
            <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
        </div>
        <div className="card-body">
          <p className="card-text">
           {text}
          </p>
        </div>
      </div>
      
    </section>
  </div>
  );
};

export default ServiceCard;
