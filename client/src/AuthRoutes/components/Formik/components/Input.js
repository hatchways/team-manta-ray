import React from 'react';
import {Field} from 'formik';
import {TextField, Typography} from '@material-ui/core';
import useStyles from '../styles/Input.style';

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
