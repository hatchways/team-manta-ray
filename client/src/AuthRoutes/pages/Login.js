import React, {useState} from 'react';
import {
	Grid,
	CssBaseline,
	Paper,
	Typography,
	Button,
	Snackbar,
} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import useStyles from '../styles/Auth.style';
import Banner from '../components/Banner/components/Banner';
import FormikControl from '../components/Formik/components/FormikControl';

const Login = () => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email format')
			.required('Email is Required'),
		password: Yup.string()
			.required('Password is Required')
			.min(6, 'Password too short'),
	});

	const onSubmit = (values) => {
		console.log(values);
		setOpen(true);
	};

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<img src='/images/logo.jpg' alt='logo' className={classes.margin} />
				<div className={classes.paper}>
					<Typography variant='h3'>Login</Typography>
					<div className={classes.form}>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}>
							{(formik) => (
								<Form>
									<FormikControl
										control='input'
										type='email'
										label='EMAIL'
										name='email'
									/>
									<FormikControl
										control='input'
										type='password'
										label='PASSWORD'
										name='password'
									/>
									<Button
										type='submit'
										variant='contained'
										color='secondary'
										className={classes.btn}>
										Sign In
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
				<Snackbar
					open={open}
					onClose={handleClose}
					message='Invalid Email or Password'
					autoHideDuration={4000}
					className={classes.alert}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
				/>
			</Grid>
			<Banner />
		</Grid>
	);
};

export default Login;
