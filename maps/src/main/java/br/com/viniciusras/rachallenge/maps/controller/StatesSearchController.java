package br.com.viniciusras.rachallenge.maps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.maps.model.State;
import br.com.viniciusras.rachallenge.maps.model.repository.StateRepository;

/** A controller which answers to serch queries from the clients. */
@RestController
@RequestMapping("/public/search/state")
public class StatesSearchController {
	// PRIVATE FIELDS
	/** Reference to a {@link StateRepository} instance injected by the container. */
	@Autowired StateRepository _stateRepo;





	// PUBLIC METHODS
	/** Retrieves information about all of the states registered in the database.
	 * @return Returns an HTTP OK response with an array all states. */
	@GetMapping
	public Iterable<State> get() {
		return _stateRepo.findAllNoGeometry();
	}


	/**
	 * Retrieves information about a {@link State}, given its name's abbreviation.
	 *
	 * @param abbreviation The abbreviation of the state's name (e.g.: SP, MA, RJ, etc).
	 * @return In case of success, returns an HTTP OK response with an object
	 *         representing the found resource. Else, returns an HTTP NOT FOUND
	 *         response, indicating the given entity could not be found. */
	@GetMapping("{abbreviation}")
	public ResponseEntity<State> get(@PathVariable("abbreviation") String abbreviation)
	{
		State result = _stateRepo.findByAbbreviation(abbreviation);
		if (result == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return ResponseEntity.ok(result);
	}
}