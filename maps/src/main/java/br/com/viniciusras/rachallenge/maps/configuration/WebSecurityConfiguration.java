package br.com.viniciusras.rachallenge.maps.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/** Configuration to be applied to the Web Security features of the application. */
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	/** Configures the HTTP Security-related features for the application. */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// This configuration authorizes any user - even if unauthenticated - to access public URLs,
		// while restricting any other URLs to authenticated users.
		// Other URLs will be verified against the OAuth 2.0 provider, via JWT the usage of tokens.
		http.authorizeRequests()
				.antMatchers("/public/**").permitAll()
				.antMatchers("/**").authenticated()
			.and()
				.oauth2ResourceServer()
				.jwt();
	}
}