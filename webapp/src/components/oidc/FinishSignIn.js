import Oidc from "oidc-client";
import React, { useEffect } from "react";

/** Component which will receive and process the JWT token from the OIDC Provider.
 * The token will be read through the URL query parameters added by the OIDC Provider
 * once the user gets redirected back to the web app after logging in at the provider's page.
 * The JWT token will then be stored properly to keep the user signed in. */
export default function FinishSignIn() {
	useEffect(() => {(async () => {
		const mgr = new Oidc.UserManager({response_mode: "query"});
		await mgr.signinRedirectCallback();
		window.location = "/";
	})()});

	return (
		<div className="flex justify-center items-center h-full">
			<i className="fas fa-spin fa-cog text-6xl" />
		</div>
	);
}