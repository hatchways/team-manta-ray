import { createContext } from "react";

export const AuthContext = createContext({
    //Dummy data for now, will be populated with real auth data from backend later
    isLoggedIn: false,
    avatar: "",
    //Other data
    login: () => {},
    logout: () => {},
});
