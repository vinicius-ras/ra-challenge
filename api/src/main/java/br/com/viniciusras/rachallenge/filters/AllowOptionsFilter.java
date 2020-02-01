package br.com.viniciusras.rachallenge.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/** A filter which runs in the servlet to allow incoming OPTIONS requests.
 * These requests are sent as preflight requests by the client ("Web App") application,
 * and should not be blocked by the OpenID Connect + OAuth 2.0 mechanisms, or else the
 * users' browsers will end up failing to emit the requests due to CORS restrictions. */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AllowOptionsFilter implements Filter {
	/** Implements the {@link Filter}'s logic.
	 * This filter will add CORS-related HTTP headers to every HTTP response the servlet will send back to the users,
	 * while also automatically answer with an HTTP OK (status code 200) to any HTTP "OPTIONS" method (which indicate
	 * preflight requests being made from a browser).
	 * @param request The request received by the servlet, to be processed by this filter.
	 * @param response Response object to be modified by this filter.
	 * @param chain The chain of all filters configured in this servlet. */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// Any origin will be allowed for CORS by this filter, in HTTP methods "POST/GET/OPTIONS/DELETE"
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");
        httpResponse.setHeader("Access-Control-Allow-Headers", "x-requested-with, authorization");

		// HTTP "OPTIONS" (preflight requests) will be returning an HTTP 200 (OK) response right away,
		// short-circuiting the filters chain.
		// Remaining requests will follow the rest of the filter chain, being processed normally.
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod()))
            httpResponse.setStatus(HttpStatus.OK.value());
        else
            chain.doFilter(request, response);
	}
}