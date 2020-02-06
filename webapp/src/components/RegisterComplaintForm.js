import React from "react";
import AsyncSelect from "react-select/async";
import oidcClientService from "../services/OidcClientService";
import Alert, { AlertType } from "./Alert";

/** A form for the users to fill and register complaints against a company. */
export default class RegisterComplaintForm extends React.Component {
	/** Default props values used by this component. */
	static defaultProps = {
		isVisible: true,
	}


	/** Constructor. */
	constructor(props) {
		super(props);
		this.state = {
			busy: true,
			formMessage: null,
			complaintCompany: null,
			complaintLocation: null,
			complaintTitle: "",
			complaintDescription: "",
			locationErrorMessage: null,
		};
	}


	/** Initializes the component after it has been rendered for the first time. */
	async componentDidMount() {
		const userProfile = await oidcClientService.getUserIdentityProfile();
		let errorMessage = null;
		if (userProfile == null)
			errorMessage = "Sign in to file a complaint.";
		else if (!userProfile.role.includes("client"))
			errorMessage = "Company accounts cannot file complaints.";


		if (errorMessage)
			this.setState({
				formMessage: <Alert type={AlertType.ERROR} message={errorMessage} />,
			});
		else
			this.setState({
				busy: false,
			});
	}


	/** Called when the user types in the companies' search box to perform a remote search.
	 * @param userInput The text the user has typed in the search box. */
	async searchCompanies(userInput) {
		try {
			// Inputs too small won't trigger requests to the remote server
			if (userInput.length < 2)
				return;

			// Perform the remote search
			const requestUrl = new URL("http://localhost:8080/company/search");
			requestUrl.searchParams.append("name", userInput);

			const fetchResponse = await oidcClientService.apiFetch(requestUrl);
			if (fetchResponse.ok) {
				const options = await fetchResponse.json();
				return options.map(opt => ({ value: opt.id, label: opt.name }));
			}
		} catch (err) {
			console.error(err);
		}

		// In case of failures, just return an empty search collection
		return [];
	}


	/** Called when the user types in the locations' search box to perform a remote search.
	 * @param userInput The text the user has typed in the search box. */
	async searchLocations(userInput) {
		try {
			// Inputs too small won't trigger requests to the remote server
			if (userInput.length < 2)
				return;

			// Perform the remote search
			const requestUrl = new URL("http://localhost:8081/public/search/city");
			requestUrl.searchParams.append("name", userInput);

			const fetchResponse = await oidcClientService.apiFetch(requestUrl);
			if (fetchResponse.ok) {
				const options = await fetchResponse.json();
				return options.map(opt => ({
					label: `${opt.name} / ${opt.state}`,
					value: {
						id: opt.id,
						coordinates: opt.center.coordinates,
					}
				}));
			}
		} catch (err) {
			console.error(err);
		}

		// In case of failures, just return an empty search collection
		return [];
	}


	/** Called when the user clicks the button to retrieve his/her current location, using the browser's location services. */
	retrieveUserPosition() {
		this.setState({locationErrorMessage: null});
		navigator.geolocation.getCurrentPosition(
			userPosition => {
				console.log(userPosition.coords);
				this.setState({
					complaintLocation: {
						label: "Current user location",
						value: {
							id: null,
							coordinates: [userPosition.coords.longitude, userPosition.coords.latitude]
						},
					}
				})
			},
			error => {
				console.error(error);

				let errorMessage;
				switch(error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = "Location permission denied by user.";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Location not available.";
						break;
					case error.TIMEOUT:
						errorMessage = "Location timeout.";
						break;
					default:
						errorMessage = "Unknown location error.";
				}

				this.setState({locationErrorMessage: errorMessage});
			},
			{ timeout: 10000 }
		);
	}


	/** Called when the user clicks the "submit" button of the complaint form. */
	async submitClicked() {
		this.setState({busy: true});

		const { complaintCompany, complaintLocation, complaintTitle, complaintDescription } = this.state;
		const { addLocationFunction } = this.props;

		const dataToSend = {
			complaint: {
				title: complaintTitle,
				description: complaintDescription,
				company: {
					id: complaintCompany
				},
			},
			location: {
				coordinates: complaintLocation.value.coordinates,
			},
		};

		let errorMessage = null;
		try
		{
			const response = await oidcClientService.apiFetch("http://localhost:8080/complaint/", {
				method: "post",
				body: JSON.stringify(dataToSend),
			});
			if (response.ok) {

				addLocationFunction({
					companyId: complaintCompany,
					location: {
						type: "Point",
						coordinates: complaintLocation.value.coordinates,
					}
				});
			}
			else
				errorMessage = `Error in submission. (code: ${response.status})`;
		} catch(err) {
			console.error(err);
			errorMessage = err.message;
		}

		// Displays either a success or an error message
		this.setState({
			busy: false,
			formMessage: <Alert type={errorMessage ? AlertType.ERROR : AlertType.SUCCESS} message={errorMessage || "Complaint successfully registered."} />,
		});
	}


	/** Renders the component. */
	render() {
		const { busy, complaintCompany, complaintLocation, complaintTitle, complaintDescription, formMessage, locationErrorMessage } = this.state;
		const {isVisible} = this.props;

		if (!isVisible)
			return <div />;

		const submitDisabled = (busy || !complaintCompany || !complaintLocation || !complaintTitle || !complaintDescription );
		return (
			<form>
				{formMessage}
				<label className="block">
					Against company:
      				<AsyncSelect
					  	isDisabled={busy}
					  	onChange={selectedValue => this.setState({complaintCompany: selectedValue.value})}
						cacheOptions
						defaultOptions={[]}
						loadOptions={this.searchCompanies} />
				</label>
				<label className="block mt-4">
					Where are you at?
					<Alert className="my-2" message={locationErrorMessage} type={AlertType.ERROR} visible={locationErrorMessage} />
					<div className="flex w-full items-stretch">
						<AsyncSelect className="flex-grow h-full"
							isDisabled={busy}
							value={complaintLocation}
							onChange={selectedOption => this.setState({complaintLocation: selectedOption, locationErrorMessage: null})}
							cacheOptions
							defaultOptions={[]}
							loadOptions={this.searchLocations} />
						<button type="button" className="ml-2 px-2 py-0" onClick={() => this.retrieveUserPosition()} disabled={busy}>
							<i className="fas fa-crosshairs" />
						</button>
					</div>
				</label>
				<label className="block mt-4">
					Title:
					<input className="w-full" disabled={busy} value={complaintTitle} onChange={evt => this.setState({complaintTitle: evt.target.value})} />
				</label>
				<label className="block mt-4">
					Description:
					<textarea className="w-full" rows="5" disabled={busy} value={complaintDescription} onChange={evt => this.setState({complaintDescription: evt.target.value})} />
				</label>
				<div className="flex justify-end mt-2">
					<button type="button" disabled={submitDisabled} onClick={() => this.submitClicked()}>
						<i className={`mr-2 fas ${busy ? "fa-circle-notch fa-spin" : "fa-paper-plane"}`} />
						Submit
					</button>
				</div>
			</form>
		);
	}
}