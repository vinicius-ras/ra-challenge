package br.com.viniciusras.rachallenge.complaints.service;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** A service providing authorization features based on the current user's ("principal") roles. */
@Service
public class UserRoleAuthorizationService {
	// CONSTANTS
	/** Name of the role which represents clients that file complaints against companies. */
	public static final String ROLE_CLIENT = "client";
	/** Name of the role which represents companies, to whom clients file complaints against. */
	public static final String ROLE_COMPANY = "company";


	// PRIVATE FIELDS
	/** Reference to a {@link UserClaimsService} instance injected by the container. */
	@Autowired private UserClaimsService _userClaimsService;


	// PUBLIC METHODS
	/** Verifies if the user has at least one of the given claims.
	 * @param role A claim whose presence will be checked for.
	 * @param otherRoles A list of extra claims whose presence will be checked.
	 * @return Returns a flag indicating if the user has at least one of the given claims. */
	public boolean hasAnyRole(String role, String ... otherRoles) {
		List<String> userRoles = _userClaimsService.getClaimAsStringList("role");
		return Stream.concat(
				Stream.of(role),
				Stream.of(otherRoles)
			).anyMatch(r -> userRoles.contains(r));
	}


	/** Verifies if the user all of the given claims.
	 * @param role A claim whose presence will be checked for.
	 * @param otherRoles A list of extra claims whose presence will be checked.
	 * @return Returns a flag indicating if the user has all of the given claims. */
	public boolean hasAllRoles(String role, String ... otherRoles) {
		List<String> userRoles = _userClaimsService.getClaimAsStringList("role");
		return Stream.concat(
				Stream.of(role),
				Stream.of(otherRoles)
			).anyMatch(r -> userRoles.contains(r));
	}
}