package br.com.viniciusras.rachallenge.complaints.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

import br.com.viniciusras.rachallenge.complaints.service.UserRoleAuthorizationService;

/** Annotation to be applied to controllers or actions of the web API which require a {@link UserRoleAuthorizationService#ROLE_CLIENT} role. */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@PreAuthorize("@userRoleAuthorizationService.hasAnyRole('" + UserRoleAuthorizationService.ROLE_CLIENT + "')")
public @interface RequiresClientRole {
}