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
	const [showSearchComplainsForm, setShowSearchComplainsForm] = useState(true);


	/** Adds a new object to the list of complaint locations.
	 * Calling this effectivelly triggers a map update.
	 * @param newComplaintLocation The object to be added to the list.	*/
	function addComplaintLocation(newComplaintLocation) {
		setComplaintLocations([...complaintLocations, newComplaintLocation]);
	}


	// App initialization
	useEffect(() => {
		async function loadInitialData() {
			const response = await fetch("http://localhost:8081/public/search/complaint");
			if (response.ok) {
				const responseData = await response.json();
				setComplaintLocations(responseData);
			}
		};

		loadInitialData();
	}, []);


	return (
		<BrowserRouter>
			<div className="flex">
				<div className="flex flex-col flex-shrink-0 p-4 min-h-screen h-full w-full max-w-sm xl:max-w-md">
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
					<div>
						<div className="flex justify-between text-md xl:text-xl font-bold">
							<div className={`rounded-t-lg p-2 ${showSearchComplainsForm ? "bg-gray-300" : "bg-gray-500"}`}>
								<h1 className="cursor-pointer" onClick={() => setShowSearchComplainsForm(true)}>Complaints map</h1>
							</div>
							<div className={`rounded-t-lg p-2 ${showSearchComplainsForm ? "bg-gray-500" : "bg-gray-300"}`}>
								<h1 className="cursor-pointer" onClick={() => setShowSearchComplainsForm(false)}>Register complaint</h1>
							</div>
						</div>
						<div className="bg-gray-300 rounded-b-lg px-4 py-4">
							<ComplaintsSearch updateLocationsFunction={setComplaintLocations} isVisible={showSearchComplainsForm} />
							<RegisterComplaintForm addLocationFunction={addComplaintLocation} isVisible={!showSearchComplainsForm} />
						</div>
					</div>


					{/* Debug OIDC button */}
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
