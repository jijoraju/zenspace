import React, { useEffect, useReducer, useRef, useState } from "react";

function Policy(props) {
  // Props
  const {onChange, checked, from} = props;
  // Ref
  const disclaimerInput = useRef(null);


  return (
    <div className="policyWrap">
      <h1>Cancellation policy</h1>
      <p className="refundable">
        This booking is non-refundable. <span>Learn more</span>
      </p>

      <div className="policyCheckBox">
      {
        from == 'confirm' ?(
          <p htmlFor="disclaimer">
            Privacy & <a href="#">Terms Policy</a>
          </p>
        ):(
          <>
            <input
              ref={disclaimerInput}
              type="checkbox"
              id="disclaimer"
              name="disclaimer"
              value="Disclaimer"
              defaultChecked={checked}
              onChange={onChange}
            />
            <label htmlFor="disclaimer">
              Please check to acknowledge our Privacy & <a href="#">Terms Policy</a>
            </label>
          </>
        )
      }
      </div>
    </div>
  );
}

export default Policy;
