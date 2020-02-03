import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthDebugger from './components/oidc/AuthDebugger';
import FinishSignIn from './components/oidc/FinishSignIn';
import './css/compiled-styles.css';


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true}>
					<Redirect to="/oidc-debug" />
				</Route>
				<Route path="/oidc-debug">
					<AuthDebugger />
				</Route>
				<Route path="/callback">
					<FinishSignIn />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
