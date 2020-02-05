package br.com.viniciusras.rachallenge.maps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.maps.model.City;
import br.com.viniciusras.rachallenge.maps.model.repository.CityRepository;
import br.com.viniciusras.rachallenge.maps.utilities.StringUtilities;

/** A controller which answers to serch queries from the clients. */
@RestController
@RequestMapping("/public/search/city")
public class CitiesSearchController {
	// PRIVATE FIELDS
	/** Reference to a {@link CityRepository} instance injected by the container. */
	@Autowired CityRepository _cityRepo;





	// PUBLIC METHODS
	/** Performs a search for cities, given some search terms.
	 * Search criteria is specified by clients through query parameters.
	 *
	 * @param cityName Terms to be used for searching.
	 * @return Returns a collection of found cities, if any. */
	@GetMapping
	public Iterable<City> get(
		@RequestParam(name = "name", required = false) String cityName,
		@RequestParam(name = "state", required = false) String state
		)
	{
		if (state != null)
			state = StringUtilities.normalizeStringForQuery(state);
		if (cityName != null)
			cityName = StringUtilities.normalizeStringForQuery(cityName);

		if (cityName != null && state != null)
			return _cityRepo.findAllByStateAndNormalizedNameLike(state, cityName);
		else if (cityName != null)
			return _cityRepo.findAllByNormalizedNameLike(cityName);
		return _cityRepo.findAllByState(state);
	}
}