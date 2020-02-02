namespace RaChallenge.Identity
{
	/// <summary>Holds constants with the name of the roles a user might have.</summary>
	static class UserRoles
	{
		// CONSTANTS
		/// <summary>Name of the role which represents clients that file complaints against companies.</summary>
		public const string Client = "client";
		/// <summary>Name of the role which represents companies, to whom clients file complaints against.</summary>
		public const string Company = "company";
	}
}