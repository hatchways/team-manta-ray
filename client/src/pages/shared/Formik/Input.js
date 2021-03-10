import React from 'react';
import {Field} from 'formik';
import {TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	formGroup: {
		marginBottom: 20,
		height: theme.spacing(11),
	},
	label: {
		fontWeight: 900,
		fontSize: 12,
	},
	input: {
		margin: '3px 0',
		borderRadius: '0',
	},
}));

const Input = ({label, name, ...rest}) => {
	const classes = useStyles();

	return (
		<Field name={name}>
			{({field, form}) => {
				return (
					<div className={classes.formGroup}>
						<label htmlFor={name}>
							<Typography variant='h6' className={classes.label}>
								{label}
							</Typography>
						</label>
						<TextField
							name={name}
							className={classes.input}
							variant='outlined'
							fullWidth
							margin='normal'
							{...rest}
							{...field}
							helperText={form.touched[name] ? form.errors[name] : ''}
							error={form.touched[name] && Boolean(form.errors[name])}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default Input;
