import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import MapVisualizer from './components/MapVisualizer';
import AuthDebugger from './components/oidc/AuthDebugger';
import FinishSignIn from './components/oidc/FinishSignIn';
import './css/compiled-styles.css';
import RegisterComplaintForm from './components/RegisterComplaintForm';
import ComplaintsSearch from './components/ComplaintsSearch';


function App() {
	const [complaintLocations, setComplaintLocations] = useState([]);

	return (
		<BrowserRouter>
			<div className="flex">
				<div className="flex flex-col flex-shrink-0 p-4 min-h-screen h-full w-full max-w-md">
					<Link to="/">
						<div className="text-center">
							<div className="text-2xl mb-4">
								<i className="far fa-meh-rolling-eyes" />
								<div>
									<i className="fas fa-star-half-alt" />
									<i className="far fa-star" />
									<i className="far fa-star" />
									<i className="far fa-star" />
									<i className="far fa-star" />
								</div>
							</div>
							<h1 className="text-3xl font-bold">Reclame Aqui</h1>
							<h2 className="text-gray-600">Backend challenge</h2>
						</div>
					</Link>
					<div className="mt-12" />
					<div className="flex justify-center">
						<LoginButton />
					</div>
					<div className="mt-4" />
					<ComplaintsSearch updateLocationsFunction={setComplaintLocations} />
					<div className="mt-4" />
					<RegisterComplaintForm />
					<div className="flex-grow" />
					<Link to="/oidc-debug">
						<i className="fas fa-bug text-gray-300" />
					</Link>
				</div>
				<div className="bg-blue-300 min-h-screen flex-grow">
					<Switch>
						<Route path="/" exact={true}>
							<MapVisualizer complaintLocations={complaintLocations} />
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
