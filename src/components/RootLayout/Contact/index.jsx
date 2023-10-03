import React from "react";
import {  Link } from "react-router-dom";

function Contact() {
  return (
    <div
      className="layoutContact"
    >
      <div className="layoutContact-Box">
        <div className="layoutContact-Box-left">
          <p>Let’s talk about the next great hybrid workspace culture.</p>
        </div>

        <div className="layoutContact-Box-right">

          <Link className="layoutContact-Box-right-button" to="/contact">
            TALK TO US
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
