import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import oidcClientService from "../services/OidcClientService";


/** Controls for performing a search for complaints. */
export default class ComplaintsSearch extends React.Component {
	/** Constructor. */
	constructor(props) {
		super(props);
		this.state = {
			busy: true,
			company: null,
			states: [],
			selectedState: null,
			cities: [],
			selectedCity: null,
			selectedCompany: null,
		};
	}


	/** Initializes the component, after it has been rendered for the first time. */
	async componentDidMount() {
		try
		{
			// Load states data
			const response = await fetch("http://localhost:8081/public/search/state");
			if (response.ok) {
				const statesArray = await response.json();
				const statesOptions :Array = statesArray.map(s => ({
					label: `${s.abbreviation} / ${s.name}`,
					value: s.abbreviation,
				}));
				statesOptions.unshift({
					label: "All states",
					value: null,
				});
				this.setState({states: statesOptions, selectedState: statesOptions[0]});
			}
		} catch (err) {
			console.error.log(err);
		}

		this.setState({busy: false});
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


	/** Called when the user selects a new state from the dropdown list. */
	async stateChanged(newState) {
		this.setState({selectedState: newState});

		try {
			const requestUrl = new URL("http://localhost:8081/public/search/city");
			requestUrl.searchParams.append("state", newState.value);

			const response = await fetch(requestUrl);
			if (response.ok) {
				const options = await response.json();
				const cities = options.map(opt => ({ value: opt.ibgeCode, label: opt.name }));
				cities.unshift({
					label: "All cities",
					value: null,
				});
				this.setState({cities, selectedCity: cities[0]});
			}
		} catch (err) {
			console.error(err);
		}
	}


	/** Called when the user clicks the "search" button. */
	async searchClicked() {
		const {selectedState, selectedCity, selectedCompany} = this.state;

		const selectedStateAbbreviation = !selectedState ? null : selectedState.value,
			selectedCityIbge = !selectedCity ? null : selectedCity.value,
			selectedCompanyId = !selectedCompany ? null : selectedCompany.value;

		let targetApiUrl = null;
		if (selectedCityIbge) {
			targetApiUrl = new URL("http://localhost:8081/public/search/complaint/by-city");
			targetApiUrl.searchParams.append("ibge", selectedCityIbge);
		}
		else if (selectedStateAbbreviation)
			targetApiUrl = new URL(`http://localhost:8081/public/search/complaint/by-state/${selectedStateAbbreviation}`);
		else
			throw new Error("Unsupported search type (only search by city or by state are currently available)");

		if (selectedCompanyId)
			targetApiUrl.searchParams.append("company", selectedCompanyId);

		const response = await fetch(targetApiUrl);
		if (response.ok) {
			const complaintLocations = await response.json();
			const {updateLocationsFunction} = this.props;
			updateLocationsFunction(complaintLocations);
		}
	}


	/** Renders the component. */
	render() {
		const {busy, states, selectedState, cities, selectedCity, selectedCompany} = this.state;

		const selectedStateAbbreviation = !selectedState ? null : selectedState.value;
		const selectedCityIbge = !selectedCity ? null : selectedCity.value;

		const submitDisabled = !selectedStateAbbreviation && !selectedCityIbge;
		return (
			<form className="bg-gray-300 border-gray-700 rounded-lg w-full max-w-xl px-4 py-2">
				<h1 className="text-xl font-bold">Complaints map</h1>
				<label className="block mt-4">
					State:
      				<Select isDisabled={busy}
						options={states}
						value={selectedState}
						onChange={newState => this.stateChanged(newState)} />
				</label>
				<label className="block mt-4">
					City:
					<div className="flex w-full items-stretch">
						<Select className="flex-grow h-full" isDisabled={busy || !selectedState || !selectedState.value}
							options={cities}
							value={selectedCity}
							onChange={newCity => this.setState({selectedCity: newCity})} />
					</div>
				</label>
				<label className="block mt-4">
					Company:
					<div className="flex">
						<AsyncSelect
							className="flex-grow"
							isDisabled={busy}
							value={selectedCompany}
							onChange={selectedValue => this.setState({selectedCompany: selectedValue})}
							cacheOptions
							defaultOptions={[]}
							loadOptions={this.searchCompanies} />
						<button type="button" className="px-2 py-1 ml-2" title="Clear search" onClick={() => this.setState({selectedCompany: null})}>
							<i className="fas fa-times-circle" />
						</button>
					</div>
				</label>
				<div className="flex justify-end mt-2">
					<button type="button" disabled={busy || submitDisabled} onClick={() => this.searchClicked()}>
						<i className={`mr-2 fas ${busy ? "fa-circle-notch fa-spin" : "fa-search"}`} />
						Search
					</button>
				</div>
			</form>
		);
	}
}