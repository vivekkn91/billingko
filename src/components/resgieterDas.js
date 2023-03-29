import React from "react";
import Form from "./registerFrom";

function loginForm_overview() {
  return (
    <>
      <div className="split left1">
        <div class="centered">
          <h2 style={{ fontSize: "50px", margin: "-20px auto", color: "red" }}>
            BillingKO
          </h2>
          <p>billing app</p>
        </div>
      </div>
      <div className="split2 right2">
        <div class="centeredright">
          <Form />
        </div>
      </div>
    </>
  );
}
export default loginForm_overview;
