import React from "react";
import AsyncSelect from "react-select/async";
import oidcClientService from "../services/OidcClientService";

/** A form for the users to fill and register complaints against a company. */
export default class RegisterComplaintForm extends React.Component {
	/** Constructor. */
	constructor(props) {
		super(props);
		this.state = {
			busy: false,
			formMessage: null,
			complaintCompany: null,
			complaintTitle: "",
			complaintDescription: "",
		};
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


	/** Called when the user clicks the "submit" button of the complaint form. */
	async submitClicked() {
		this.setState({busy: true});

		const { complaintTitle, complaintDescription, complaintCompany } = this.state;
		const dataToSend = {
			title: complaintTitle,
			description: complaintDescription,
			company: {id:complaintCompany},
		};

		let errorMessage = null;
		try
		{
			const response = await oidcClientService.apiFetch("http://localhost:8080/complaint/", {
				method: "post",
				body: JSON.stringify(dataToSend),
			});
			if (!response.ok)
				errorMessage = `Error in submission. (code: ${response.status})`;
		} catch(err) {
			console.error(err);
			errorMessage = err.message;
		}

		// Displays either a success or an error message
		this.setState({
			busy: false,
			formMessage: (
				<div className={`p-2 mt-4 rounded-lg border ${errorMessage ? "bg-red-300 text-red-600 border-red-600" : "bg-green-300 text-green-600 border-green-600"}`}>
					{errorMessage || "Complaint successfully registered."}
				</div>
			),
		});

	}


	/** Renders the component. */
	render() {
		const { busy, complaintCompany, complaintTitle, complaintDescription, formMessage } = this.state;
		const submitDisabled = (busy || !complaintCompany || !complaintTitle || !complaintDescription );

		return (
			<form className="bg-gray-300 border-gray-700 rounded-lg w-full max-w-xl px-4 py-2">
				<h1 className="text-xl font-bold">Register complaint</h1>
				{formMessage}
				<label className="block mt-4">
					Against company:
      				<AsyncSelect
					  	onChange={selectedValue => this.setState({complaintCompany: selectedValue.value})}
						cacheOptions
						defaultOptions={[]}
						loadOptions={this.searchCompanies} />
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