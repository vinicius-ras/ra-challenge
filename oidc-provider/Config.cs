using System.Collections.Generic;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace RaChallenge.Identity
{
	/// <summary>Static class providing in-memory configuration for the OIDC/OAuth provider.</summary>
	static class Config
	{
		// CONSTANTS
		/// <summary>
		///    The name for the resource which will be describing the API for the Reclame Aqui backend challenge.
		///    This resource will be protected by the OIDC/OAuth provider.
		/// </summary>
		public const string RaChallengeApiResourceName = "ra-api";
		/// <summary>
		///    The resource used to request for the user's roles information in his/her Identity Token.
		/// </summary>
		public const string RaChallengeRolesInformationIdentityResourceName = "roles-information";
		/// <summary>
		///    The name for the known Web Application client which will be allowed to access the OIDC/OAuth provider.
		/// </summary>
		public const string RaChallengeWebAppClientName = "webapp";
		/// <summary>
		///    The issuer's host ("iss" claim) that should appear in the OIDC/OAuth provider's discovery point.
		///    This claim is part of the JWT tokens emitted by the provider, and thus play an important role in validating the issued tokens.
		/// </summary>
		public const string ProviderIssuerHost = "http://oidc-provider:5000";





		// PUBLIC STATIC READ-ONLY PROPERTIES
		/// <summary>The collection of resources to be protected by the OAuth provider (kept in the "access token").</summary>
		/// <value>A list of <see cref="ApiResource" /> objects describing each one of the protected resources.</value>
		public static IEnumerable<ApiResource> Apis => new List<ApiResource>
		{
			new ApiResource(RaChallengeApiResourceName, "Reclame Aqui - Backend Challenge API", new [] { JwtClaimTypes.Role }),
		};


		/// <summary>The collection of resources to be protected by the OpenID Connect provider (kept in the "identity token").</summary>
		/// <value>
		///    A list of <see cref="IdentityResource" /> objects describing each one of the protected resources, including the standard
		///    "openid" and "profile" resources, as required by the OpenID Connect specification.
		/// </value>
		public static IEnumerable<IdentityResource> Ids => new List<IdentityResource>
		{
			new IdentityResources.OpenId(),
			new IdentityResources.Profile(),
			new IdentityResource(RaChallengeRolesInformationIdentityResourceName, "User roles information", new [] { JwtClaimTypes.Role })
		};


		/// <summary>The collection of known clients which will be comunicating with the OIDC/OAuth provider.</summary>
		/// <value>A list of <see cref="Client" /> objects decribing each one of the clients which will communicate with the provider.</value>
		public static IEnumerable<Client> Clients => new List<Client>
		{
			new Client {
				ClientId = "webapp",
				ClientName = "Web Application Client",
				AllowedGrantTypes = GrantTypes.Code,
				RequirePkce = true,
				RequireClientSecret = false,

				RedirectUris = { "http://localhost:3000/callback" },
				PostLogoutRedirectUris = { "http://localhost:3000/" },
				AllowedCorsOrigins = { "http://localhost:3000" },

				AllowedScopes = new List<string>
				{
					IdentityServerConstants.StandardScopes.OpenId,
					IdentityServerConstants.StandardScopes.Profile,
					RaChallengeApiResourceName,
					RaChallengeRolesInformationIdentityResourceName
				}
			}
		};
	}
}