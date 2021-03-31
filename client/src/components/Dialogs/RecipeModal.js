import { Button, Dialog, DialogTitle, Fab, Snackbar } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import EditPicture from "./EditPicture";
import { UserDispatchContext } from "../../context/UserContext";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
} from "../../actions/recipeActions";

export const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
  },
  deleteBtn: {
    float: "right",
    margin: "4px",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  btn: {
    borderRadius: "0",
    width: "40%",
    height: theme.spacing(7),
    margin: "0 3px",
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
}));

const RecipeModal = ({ edit, id, recipe, open, onClose, selectedValue }) => {
  const classes = useStyles();

  const dispatch = useContext(UserDispatchContext);

  const [recipePictureUrl, setRecipePictureUrl] = useState(
    edit ? recipe.recipePictureUrl : ""
  );

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const initialValues = {
    name: edit ? recipe.name : "",
    price: edit ? recipe.price : 0,
    ingredients: edit ? recipe.ingredients.join(",") : "",
    requiredStuff: edit ? recipe.requiredStuff.join(",") : "",
    portionDescription: edit ? recipe.portionDescription : "",
    cuisineTags: edit ? recipe.cuisineTags.join(",") : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name of the recipe is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required")
      .positive("Price should be positive")
      .test(
        "maxDigitsAfterDecimal",
        "Only up to two decimals are allowed for price",
        (price) => Number.isInteger(price * 10 ** 2)
      ),
    ingredients: Yup.string().required("Ingredients of the recipe is required"),
    portionDescription: Yup.string().required(
      "Portion Description is required"
    ),
    cuisineTags: Yup.string().required("Cuisine Tags are required"),
  });

  const onSubmit = async (values) => {
    if (!recipePictureUrl) {
      setSnackBarOpen(true);
      return;
    }
    if (edit) {
      editRecipe(dispatch, { ...values, recipePictureUrl, _id: recipe._id });
    } else {
      createRecipe(dispatch, {
        ...values,
        recipePictureUrl,
      });
      setRecipePictureUrl(null);
    }
    onClose(selectedValue);
  };

  const handleDelete = () => {
    deleteRecipe(dispatch, recipe._id);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <div>
        {edit && (
          <Fab
            color="primary"
            onClick={handleDelete}
            className={classes.deleteBtn}
          >
            <DeleteForeverIcon />
          </Fab>
        )}
        <DialogTitle id="simple-dialog-title">
          {edit ? `Edit "${recipe.name}" Recipe` : "Add a recipe"}
        </DialogTitle>

        <EditPicture
          srcData={recipePictureUrl}
          setSrcData={setRecipePictureUrl}
          recipe={true}
        />
        <div className={classes.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Price"
                  name="price"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Ingredients"
                  name="ingredients"
                  helperText="please provide a comma separated list"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Required Stuff"
                  name="requiredStuff"
                  helperText="please provide a comma separated list"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Portion Description"
                  name="portionDescription"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Cuisine Tags"
                  name="cuisineTags"
                  helperText="please provide a comma separated list"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.btn}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Snackbar
            open={snackBarOpen}
            onClose={handleSnackBarClose}
            message="Picture is required"
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default RecipeModal;
