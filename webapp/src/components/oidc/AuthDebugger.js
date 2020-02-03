import React, { useState, useEffect } from "react";
import oidcClientService from "../../services/OidcClientService";

/** Component for visually debugging the OpenID Connect service, provided to the web application by
 * the {@link OidcClientService} object. */
export default function AuthDebugger() {
	const [responseText, setResponseText] = useState("");
	const [renderedTokens, setRenderedTokens] = useState("");


	/** Performs an API call with the user's current credentials. */
	async function performApiCall() {
		try {
			const response = await oidcClientService.apiFetch("http://localhost:8080/complaint/", {
				method: "post",
				body: JSON.stringify({
					title: "my javascript obj",
					description: "my description from js"
				})
			});

			let result;
			try {
				result = await response.json();
				result = JSON.stringify(result, null, 4);
			} catch (jsonErr) {
				result = jsonErr.message;
			}

			setResponseText(`HTTP ${response.status} (${response.statusText}):\n${result}`);
		} catch (err) {
			setResponseText(`FETCH ERROR: ${err.message}`);
			console.error(err);
		}
	}


	// Component initialization procedures
	useEffect(() => {
		(async () => {
			const usr = await oidcClientService.getUser();
			if (usr) {
				const tokensToRender = {
					"Token Type": usr.token_type,
					"Scope": usr.scope,
					"Session": usr.session_state,
					"Access token": usr.access_token,
					"Identity token": usr.id_token,
					"Profile": JSON.stringify(usr.profile, null, 4),
				}

				const rendered = Object.getOwnPropertyNames(tokensToRender).map(propName => (
					<div key={propName} className="mt-4">
						<label>
							<span className="font-bold">{propName}</span>
							<pre className="w-full whitespace-pre-wrap break-words">{tokensToRender[propName]}</pre>
						</label>
					</div>
				));
				setRenderedTokens(rendered);

			}

			else
				setRenderedTokens("Not logged in");
		})();
	}, []);

	return (
		<div>
			<form>
				<button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={() => oidcClientService.signinRedirect()}>Login!</button>
				<button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={() => oidcClientService.signoutRedirect()}>Logout!</button>
				<button type="button" className="p-2 m-4 border-2 border-blue-700 bg-blue-400 text-gray-200 rounded-lg" onClick={performApiCall}>WEB CALL!</button>
			</form>
			<div className="max-w-full mx-4">
				<div className="border-2 border-gray-600 rounded-xl bg-gray-300">
					{renderedTokens}
				</div>
				<div className="border-2 border-blue-600 rounded-xl bg-blue-300 mt-5">
					<pre>{responseText}</pre>
				</div>
			</div>
		</div>
	);
}