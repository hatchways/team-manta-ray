import React from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import {theme} from './themes/theme';
import Login from './pages/AuthRoutes/pages/Login';
import Signup from './pages/AuthRoutes/pages/Signup';

import './App.css';

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/'>
					<Redirect to='/signup' />
				</Route>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
