import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../shared/context/auth-context";
import { login } from "../../../mockAPI";

const Login = () => {
    const { setIsLoggedIn, setUserData } = useContext(AuthContext);

    return (
        <>
            <h2>LOG IN PAGE</h2>
            <Button
                variant="contained"
                onClick={async () => {
                    const userData = await login(); //Get data from mock API
                    setUserData(userData);
                    setIsLoggedIn(true);
                }}
            >
                LOG IN
            </Button>
        </>
    );
};

export default Login;
