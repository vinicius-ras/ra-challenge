package br.com.viniciusras.rachallenge.maps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MapsApplication {
	public static void main(String[] args) {
		SpringApplication.run(MapsApplication.class, args );
	}
}
