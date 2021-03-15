import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../Context/UserContext";

const TestComponent = ({ history }) => {
  const { loading, error, userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) {
      history.replace("/login");
    }
  }, [userInfo, history]);

  return (
    <div>
      <NavBar />
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userInfo && (
            <>
              <h1>Name: {userInfo.name}</h1>
              <h2>Email: {userInfo.email}</h2>
              {userInfo.isChef === false && <h3>Not a chef</h3>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TestComponent;
