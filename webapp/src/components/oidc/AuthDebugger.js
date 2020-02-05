import React, { useEffect, useState } from "react";
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

				const rendered = Object.getOwnPropertyNames(tokensToRender).map((propName, propIndex) => (
					<div key={propName} className={propIndex > 0 ? `mt-4` : ""}>
						<label>
							<span className="font-bold">{propName}</span>
							<pre className="whitespace-pre-wrap break-all">{tokensToRender[propName]}</pre>
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
		<div className="p-4">
			<form>
				<button type="button" onClick={() => oidcClientService.signinRedirect()}>Login!</button>
				<button className="ml-4" type="button" onClick={() => oidcClientService.signoutRedirect()}>Logout!</button>
				<button className="ml-4" type="button" onClick={performApiCall}>WEB CALL!</button>
			</form>
			<div className="mt-4">
				<div className="p-4 border-2 border-gray-600 rounded-lg bg-gray-300">
					{renderedTokens}
				</div>
				<div className="p-4 border-2 border-blue-600 rounded-lg bg-blue-300 mt-5">
					<pre>{responseText}</pre>
				</div>
			</div>
		</div>
	);
}