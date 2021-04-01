import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Card,
  Hidden,
  Dialog,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import defaultUserImage from "../../assets/defaultUserImage.png";
import plate from "../../assets/plate.svg";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
  img: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    objectFit: "cover",
    margin: "auto",
    borderRadius: "50%",
  },
  emptyText: {
    padding: theme.spacing(20, 10),
  },
  chefCard: {
    padding: theme.spacing(2),
    // margin: "10px auto",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.1),
      margin: "0",
      marginBottom: theme.spacing(1),
    },
  },
  recipeCard: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.1),
    },
  },
  recipeCardItem: {
    padding: theme.spacing(1),

    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.1),
    },
  },
  btn: {
    borderRadius: "0",
    margin: "auto",
    width: "40%",
    height: theme.spacing(6),
    textDecoration: "none",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1.2),
    },
    "& button": {
      height: "100%",
      width: "100%",
      borderRadius: "0",
      textTransform: "capitalize",
    },
  },
  clearBtn: {
    borderRadius: "0",
    textTransform: "capitalize",
  },

  btnGroup: {
    "& button": {
      borderRadius: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

const OrderDetails2 = ({
  items,
  user,
  isChef,
  orderId,
  open,
  onClose,
  selectedValue,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClose = () => {
    onClose(selectedValue);
    contactHandler(user._id);
  };

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  if (!user || !items) return null;

  const contactHandler = async (recipient) => {
    try {
      await axios.post("/api/chat/contact", {
        recipient,
      });
      history.push(`/chat/${recipient}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <List dense className={classes.root}>
        <ListItem dense>
          <ListItemText>
            <Typography variant="h6">{`Order ${orderId}`}</Typography>
          </ListItemText>
        </ListItem>

        <ListItem alignItems="center">
          <Grid
            container
            item
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
            square
            component={Card}
            className={classes.chefCard}
          >
            <Grid item>
              <Typography>{isChef ? `Customer` : `Chef`}</Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <img
                  src={user.profilePictureUrl || defaultUserImage}
                  alt="profileImage"
                  className={classes.img}
                />
              </Grid>
              <Hidden smDown>
                <Grid item container direction="column" xs={9}>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <Typography>Name:</Typography>
                    </Grid>
                    <Grid item>{user.name}</Grid>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <Typography>{isChef ? "About:" : "Bio:"}</Typography>
                    </Grid>
                    <Grid item>{user.bio}</Grid>
                  </Grid>
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <Typography>
                        {isChef ? "Favorit Cuisines:" : "Specialties:"}
                      </Typography>
                    </Grid>
                    <Grid item>{user.cuisines.join(",")}</Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            className={classes.recipeCard}
          >
            {items.map((item) => {
              if (!item) return null;
              return (
                <Grid
                  container
                  item
                  key={item._id}
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  component={Card}
                  xs={12}
                  className={classes.recipeCardItem}
                >
                  <Grid item xs={1}>
                    <Avatar alt="recipe" src={item.image || plate} />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="flex-start"
                    xs={6}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item>
                      <span>{`${item.quantity} x $${item.price}`}</span>{" "}
                    </Grid>
                  </Grid>
                  <Hidden smDown>
                    <Grid item>
                      $ {addDecimals(item.quantity * item.price)}
                    </Grid>
                  </Hidden>
                  <Grid item xs={2} md={1}></Grid>
                </Grid>
              );
            })}
          </Grid>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography gutterBottom variant="h6">
              Total Price
            </Typography>
          </ListItemText>
          <ListItemText>
            <Typography gutterBottom variant="h6">
              {" "}
              $
              {addDecimals(
                items.reduce(
                  (acc, cur) =>
                    cur ? acc + cur.price * cur.quantity : acc + 0,
                  0
                ),
                2
              )}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.btnSection}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            onClick={handleClose}
            className={classes.btn}
          >
            {isChef ? "Contact Customer" : "Contact Chef"}
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default OrderDetails2;
