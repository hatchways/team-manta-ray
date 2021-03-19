import React from "react";
import AuthGuard from "../hocs/AuthGuard";

const SuccessPage = AuthGuard(() => {
  return (
    <div>
      <h3 style={{ marginTop: "20px" }}>Payment successful</h3>
    </div>
  );
});

export default SuccessPage;
