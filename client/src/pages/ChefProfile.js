import React, { useContext } from "react";
// import { AuthContext } from "../context/auth-context";
import NavBar from "../components/NavBar";

const ChefProfile = () => {
  // const { userData } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <h2>This is the chef profile page</h2>
      {/* <h3>Name: {userData.name}</h3>
      <h3>Email: {userData.email}</h3> */}
    </>
  );
};

export default ChefProfile;
