import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    toolBar: {
        minHeight: 75,
        display: "grid",
        backgroundColor: "white",
    },
    menuButton: {
        marginRight: theme.spacing(3),
    },
    logo: {
        height: 25,
        marginLeft: theme.spacing(2),
    },
    icon: {
        fontSize: 40,
        justifyContent: "end",
        color: "black",
    },
    appBar: {
        boxShadow: "0px 10px 30px 0px rgba(204, 204, 204, 0.5)",
    },
    drawerDiv: {
        width: 200,
    },
    plateIcon: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 60,
    },
    navBarRight: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 150,
    },
}));

export default useStyles;
