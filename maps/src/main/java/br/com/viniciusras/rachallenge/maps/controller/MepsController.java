package br.com.viniciusras.rachallenge.maps.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/** Controller responsible for managing complaints filed by clients against companies. */
@RestController
@RequestMapping("/private/mep")
public class MepsController {
	@GetMapping
	public String get() {
		return "MEPS - NOT OK";
	}
}