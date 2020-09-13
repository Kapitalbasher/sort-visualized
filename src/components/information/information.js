import React, { useState } from "react";
import "./information.css";

const Information = ({ sort }) => {
  const [information, setInformation] = useState(() => {
    for (let v of sort.algorithms) {
      if (v.name === "bubble") {
        return v;
      }
    }
  });

  sort.setInformation = setInformation;
  return (
    <section className="info-container">
      <div className="info">
        <div className="description">
          <h3>Description:</h3>
          <p>{information.description}</p>
        </div>
        <div className="bigO">
          <h3>Big O: </h3>
          <p>{information.bigO}</p>
        </div>
      </div>
      {/* <div className="info-invisible">
        <div className="description">
          <h3>Description:</h3>
          <p>{information.description}</p>
        </div>
        <div className="bigO">
          <h3>Big O: </h3>
          <p>{information.bigO}</p>
        </div>
      </div> */}
    </section>
  );
};
export default Information;
