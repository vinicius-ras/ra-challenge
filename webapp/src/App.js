import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import MapVisualizer from './components/MapVisualizer';
import AuthDebugger from './components/oidc/AuthDebugger';
import FinishSignIn from './components/oidc/FinishSignIn';
import './css/compiled-styles.css';


function App() {
	return (
		<BrowserRouter>
			<div className="flex max-w-full">
				<div className="p-4 w-64">
					<h1 className="text-3xl">Reclame Aqui</h1>
					<h2 className="text-gray-600">Backend challenge</h2>
					<LoginButton />
				</div>
				<div className="bg-red-500 h-screen flex-grow">
					<Switch>
						<Route path="/" exact={true}>
							<MapVisualizer />
						</Route>
						<Route path="/oidc-debug">
							<AuthDebugger />
						</Route>
						<Route path="/callback">
							<FinishSignIn />
						</Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
