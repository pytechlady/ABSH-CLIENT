import React from "react";

const Cards = ({ text, heading, fontSize, textTransform }) => {
  const style = {
    fontSize: fontSize ? fontSize : "24px",
    textTransform: textTransform ? textTransform : "uppercase",
  };
  return (
    <div className="card-group container p-3">
      <div className="card mb-3">
        <div className="card-body">
          <div style={style} className="card-title">
            {heading ? heading : "Heading 1"}
          </div>
          <p className="card-text text-dark">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
