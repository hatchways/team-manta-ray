import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

const CustomerProfile = () => {
  const { userData } = useContext(AuthContext);
  return (
    <>
      <h2>This is the profile page</h2>
      <h3>Name: {userData.name}</h3>
      <h3>Email: {userData.email}</h3>
    </>
  );
};

export default CustomerProfile;
