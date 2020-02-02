package br.com.viniciusras.rachallenge.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

/** A service specialized in dealing with the currently authenticated user's claims.
 * This service provides utility methods which allow for easily reading the principal's claims,
 * extracted from the JWT access token used to authenticate the user with the Web API. */
@Service
public class UserClaimsService {
	// PUBLIC METHODS
	/** Retrieves the actual object which represents the JWT token for the current user.
	 * @return Returns a {@link Jwt} object representing the user's access token. */
	public Jwt getJwtToken() {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();
		Jwt jwtToken = (Jwt) authentication.getCredentials();
		return jwtToken;
	}


	/** Extracts a claim from the user in the form of a {@link Boolean}.
	 * This method effectivelly calls {@link #getJwtToken()} followed by {@link Jwt#getClaimAsBoolean(String)}.
	 * @param claim The type of the claim you want to extract.
	 * @return Returns the given claim (if any) as a {@link Boolean}. */
	public Boolean getClaimAsBoolean(String claim)
	{
		Jwt token = getJwtToken();
		return token.getClaimAsBoolean(claim);
	}


	/** Extracts a claim from the user in the form of a {@link Map}.
	 * This method effectivelly calls {@link #getJwtToken()} followed by {@link Jwt#getClaimAsMap(String)}.
	 * @param claim The type of the claim you want to extract.
	 * @return Returns the given claim (if any) as a {@link Map}, mapping {@link String} keys to {@link Object}s. */
	public Map<String, Object> getClaimAsMap(String claim)
	{
		Jwt token = getJwtToken();
		return token.getClaimAsMap(claim);
	}


	/** Extracts a claim from the user in the form of a {@link String}.
	 * This method effectivelly calls {@link #getJwtToken()} followed by {@link Jwt#getClaimAsString(String)}.
	 * @param claim The type of the claim you want to extract.
	 * @return Returns the given claim (if any) as a {@link String}. */
	public String getClaimAsString(String claim)
	{
		Jwt token = getJwtToken();
		return token.getClaimAsString(claim);
	}


	/** Extracts a claim from the user in the form of a {@link List}.
	 * This method effectivelly calls {@link #getJwtToken()} followed by {@link Jwt#getClaimAsStringList(String)}.
	 * @param claim The type of the claim you want to extract.
	 * @return Returns the given claim (if any) as a {@link List} of {@link String} values. */
	public List<String> getClaimAsStringList(String claim)
	{
		Jwt token = getJwtToken();
		return token.getClaimAsStringList(claim);
	}


	/** Verifies if the user has at least one of the given claims.
	 * @param claim A claim whose presence will be checked for.
	 * @param otherClaims A list of extra claims whose presence will be checked.
	 * @return Returns a flag indicating if the user has at least one of the given claims. */
	public boolean hasAny(String claim, String ... otherClaims) {
		Jwt token = getJwtToken();

		return Stream.concat(
				Stream.of(claim),
				Stream.of(otherClaims)
			).anyMatch(c -> token.containsClaim(c));
	}


	/** Verifies if the user all of the given claims.
	 * @param claim A claim whose presence will be checked for.
	 * @param otherClaims A list of extra claims whose presence will be checked.
	 * @return Returns a flag indicating if the user has all of the given claims. */
	public boolean hasAll(String claim, String ... otherClaims) {
		Jwt token = getJwtToken();

		return Stream.concat(
				Stream.of(claim),
				Stream.of(otherClaims)
			).allMatch(c -> token.containsClaim(c));
	}
}
