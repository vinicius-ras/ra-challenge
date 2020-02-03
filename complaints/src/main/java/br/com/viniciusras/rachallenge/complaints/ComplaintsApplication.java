package br.com.viniciusras.rachallenge.complaints;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ComplaintsApplication {
	public static void main(String[] args) {
		SpringApplication.run(ComplaintsApplication.class, args );
	}
}
