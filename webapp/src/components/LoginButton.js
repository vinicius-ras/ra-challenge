import React from "react";
import oidcClientService from "../services/OidcClientService";

/** A button displayed to the user in order to perform login/logout. */
export default class LoginButton extends React.Component {
	/** Constructor. */
	constructor(props)
	{
		super(props);
		this.state = {
			userProfile: undefined,
		};
	}


	/** Initializes the component, after it has been rendered for the first time. */
	async componentDidMount() {
		const userProfile = await oidcClientService.getUserIdentityProfile();
		this.setState({userProfile});
	}


	/** Processes the event of when the user clicks this button component. */
	async buttonClick() {
		const isAuthenticated = await oidcClientService.isAuthenticated();
		if (isAuthenticated)
			oidcClientService.signoutRedirect();
		else
			oidcClientService.signinRedirect();
	}


	/** Renders the component. */
	render() {
		const {userProfile} = this.state;
		return (
			<button onClick={() => this.buttonClick()} className="component-login-button" disabled={userProfile === undefined}>
				<i className={`mr-2 fas ${userProfile ? "fa-sign-out-alt" : "fa-sign-in-alt"}`} />
				{userProfile ? userProfile.name : "Login"}
			</button>
		)
	}
}