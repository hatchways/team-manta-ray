import React from "react";
import { Field } from "formik";
import { FormControlLabel, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  isChef: {
    marginTop: theme.spacing(-3),
    height: theme.spacing(4),
    "& .MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1": {
      fontWeight: 900,
      fontSize: 12,
    },
  },
}));

const Input = ({ label, name, helperText, ...rest }) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <div className={classes.isChef}>
            <FormControlLabel
              control={<Switch checked={field.name.value} name={name} />}
              label={label}
              labelPlacement="end"
              {...rest}
              {...field}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default Input;
