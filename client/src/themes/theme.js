import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            // could customize the h1 variant as well
        },
    },
    palette: {
        primary: { main: "#DF1B1B" },
        secondary: { main: "#FF510C" },
        cardBackground: { main: "#fff" },
    },
});
