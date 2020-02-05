package br.com.viniciusras.rachallenge.maps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.maps.model.City;
import br.com.viniciusras.rachallenge.maps.model.ComplaintLocation;
import br.com.viniciusras.rachallenge.maps.model.State;
import br.com.viniciusras.rachallenge.maps.model.repository.CityRepository;
import br.com.viniciusras.rachallenge.maps.model.repository.ComplaintLocationRepository;
import br.com.viniciusras.rachallenge.maps.model.repository.StateRepository;
import br.com.viniciusras.rachallenge.maps.utilities.StringUtilities;


/** Controller responsible for searching for locations where complaints have been registered. */
@RestController
@RequestMapping("/public/search/complaint")
public class ComplaintsSearchController {
	// PRIVATE FIELDS
	/** Reference to a {@link StateRepository} instance injected by the container. */
	@Autowired StateRepository _stateRepo;
	/** Reference to a {@link CityRepository} instance injected by the container. */
	@Autowired CityRepository _cityRepo;
	/** Reference to a {@link ComplaintLocationRepository} instance injected by the container. */
	@Autowired ComplaintLocationRepository _complaintLocationRepo;





	// PUBLIC METHODS
	/** Performs a search for complaint locations by cities where they have been registered.
	 * Search criteria is specified by clients through query parameters.
	 *
	 * @param ibge The IBGE code of the city where the complaints should be searched for.
	 * @param companyId Optional company identifier, used to filter complaints by the company they
	 *                  have been filed against.
	 * @return Returns a collection of found complaint locations, if any.
	 *         Returns an HTTP Not Found (404) state if the target city cannot be found. */
	@GetMapping("/by-city")
	public ResponseEntity<Iterable<ComplaintLocation>> searchByCity(
		@RequestParam(name = "ibge") String ibge,
		@RequestParam(name = "company", required = false) String companyId
	) {
		// Try to find the city
		City c = _cityRepo.findByIbgeCode(ibge);
		if (c == null)
			return ResponseEntity.notFound().build();

		// Perform the search
		Iterable<ComplaintLocation> results;
		if (companyId == null)
			results = _complaintLocationRepo.findAllByLocationGeoIntersects(c.getGeometry());
		else
			results = _complaintLocationRepo.findAllByCompanyAndLocationGeoIntersects(companyId, c.getGeometry());
		return ResponseEntity.ok(results);
	}


	/** Performs a search for complaint locations by states where they have been registered.
	 * Search criteria is specified by clients through query parameters.
	 *
	 * @param abbreviation The abbreviation code of the state where the complaints should be searched for.
	 * @param companyId Optional company identifier, used to filter complaints by the company they
	 *                  have been filed against.
	 * @return Returns a collection of found complaint locations, if any.
	 *         Returns an HTTP Not Found (404) state if the target state cannot be found. */
	@GetMapping("/by-state/{abbreviation}")
	public ResponseEntity<Iterable<ComplaintLocation>> searchByState(
		@PathVariable(name = "abbreviation") String abbreviation,
		@RequestParam(name = "company", required = false) String companyId
	) {
		// Try to find the state
		abbreviation = StringUtilities.normalizeStringForQuery(abbreviation);
		State s = _stateRepo.findByAbbreviation(abbreviation);
		if (s == null)
			return ResponseEntity.notFound().build();

		// Perform the search
		Iterable<ComplaintLocation> results;
		if (companyId == null)
			results = _complaintLocationRepo.findAllByLocationGeoIntersects(s.getGeometry());
		else
			results = _complaintLocationRepo.findAllByCompanyAndLocationGeoIntersects(companyId, s.getGeometry());
		return ResponseEntity.ok(results);
	}
}