import Oidc from "oidc-client";

/** Service used throughout the app to manage the OpenID Connect client. */
class OidcClientService {
	/** Constructor method. */
	constructor() {
		const oauth2ClientConfig = {
			authority: "http://localhost:5000",
			client_id: "webapp",
			redirect_uri: "http://localhost:3000/callback",
			response_type: "code",
			scope: "openid profile complaints-api roles-information",
			post_logout_redirect_uri: "http://localhost:3000/",
		};

		this.userManager = new Oidc.UserManager(oauth2ClientConfig);
	}


	/** Redirects the browser to the login page, in the OIDC Provider's server. */
	signinRedirect() {
		this.userManager.signinRedirect();
	}


	/** Redirects the browser to the logout page, in the OIDC Provider's server. */
	signoutRedirect() {
		this.userManager.signoutRedirect();
	}


	/** Retrieves the object which provides the high-level OIDC functionalities for this service.
	 * @returns Returns the {@link Oidc.UserManager} object which allows for accessing the OpenID Connect
	 * functionalities a high-level. */
	getUserManager() {
		return this.userManager;
	}


	/** Retrieves the object which represents the currently authenticated user.
	 * @return
	 *    Returns the {@link Oidc.User} instance representing the authenticated user.
	 *    If the user is not currently authenticated, returns null. */
	async getUser() {
		return await this.userManager.getUser();
	}


	/** Verifies if the user is currently authenticated.
	 * @return Returns a flag indicating whether the user is currently authenticated or not. */
	async isAuthenticated() {
		const usr = await this.getUser();
		return (!!usr);
	}


	/** Retrieves the authenticated user's Access Token (JWT), which should be sent for API requests.
	 * @return
	 *    Returns a string containing the authenticated user's Access Token.
	 *    If the user is currently not authenticated, returns null. */
	async getApiAccessToken() {
		const usr = await this.getUser();
		if (!usr)
			return null;
		return usr.access_token;
	}


	/** Retrieves the authenticated user's Identity Token (JWT), which contains user's identity information (name, role, etc.).
	 * This method is here for JWT debugging purposes. If you are interested in retrieving the user's identity information
	 * directly, please see {@link getUserIdentityProfile} instead.
	 * @see getUserIdentityProfile()
	 * @return
	 *    Returns a string containing the authenticated user's Identity Token.
	 *    If the user is currently not authenticated, returns null. */
	async getUserIdentityToken() {
		const usr = await this.getUser();
		if (!usr)
			return null;
		return usr.id_token;
	}


	/** Retrieves the authenticated user's profile information.
	 * Profile information will contain information like the user's ID, name, roles, etc.
	 * @return
	 *    Returns an object containing the authenticated user's profile information.
	 *    If the user is currently not authenticated, returns null. */
	async getUserIdentityProfile() {
		const usr = await this.getUser();
		if (!usr)
			return null;
		return usr.profile;
	}


	/** Utility method for using the Fetch API to perform authorized requests.
	 * This method will work almost exactly like the {@link fetch()} method, with the following differences:
	 * 1-If the user is authenticated, an "Authorization" HTTP header will be set to the currently authenticated
	 * user's Access Token, allowing for authorized API calls to be performed;
	 * 2-The "Content-Type" HTTP header will be set to "application/json;charset=UTF-8", as expected by the API.
	 *
	 * If the user is not authenticated, this method will behave exactly like {@link fetch()} method. If needed,
	 * you can use {@link isAuthenticated()} to check if the user is authenticated before trying to perform an authorized
	 * fetch call.
	 * @param fetchArgs The arguments as they would be passed to the {@link fetch()} method.
	 * @return {Promise<Response>} Returns a promise for the response of the Fetch API call. */
	async apiFetch(...fetchArgs) {
		const apiAccessToken = await this.getApiAccessToken();
		if (apiAccessToken && fetchArgs.length >= 1) {
			// Add the "Authorization" and "Content-Type" headers to the fetch call
			if (fetchArgs.length === 1)
				fetchArgs = [...fetchArgs, {}];
			const requestInitParams = fetchArgs[1];
			requestInitParams.headers = requestInitParams.headers || {};
			requestInitParams.headers["Authorization"] = `Bearer ${apiAccessToken}`;
			requestInitParams.headers["Content-Type"] = `application/json;charset=UTF-8`;
		}

		return fetch.apply(null, fetchArgs);
	}
}





// Export a single (global) object as the application's client service
const oidcClientService = new OidcClientService();
export default oidcClientService;