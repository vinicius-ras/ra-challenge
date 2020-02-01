import React from "react";
import Oidc from "oidc-client";
import { useEffect } from "react";

export default function FinishSignIn() {
	useEffect(() => (async () => {
		const mgr = new Oidc.UserManager({response_mode: "query"});
		await mgr.signinRedirectCallback();
		window.location = "/";
	})());

	return (<div>Please wait...</div>);
}