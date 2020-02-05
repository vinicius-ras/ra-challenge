package br.com.viniciusras.rachallenge.complaints.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.complaints.model.Company;
import br.com.viniciusras.rachallenge.complaints.model.repository.CompanyRepository;
import br.com.viniciusras.rachallenge.complaints.utilities.StringUtilities;

/** Controller responsible for managing {@link Company} resources and their data. */
@RestController
@RequestMapping("/company")
public class CompaniesController {
	// PRIVATE FIELDS
	/** Reference to a {@link ComplaintRepository} instance injected by the container. */
	@Autowired
	private CompanyRepository _companyRepo;





	// PUBLIC METHODS
	/**
	 * Retrieves information about a {@link Company}, given its identifier.
	 *
	 * @param id The unique identifier for the resource you are trying to retrieve.
	 * @return In case of success, returns an HTTP OK response with an object
	 *         representing the found resource. Else, returns an HTTP NOT FOUND
	 *         response, indicating the given entity could not be found.
	 */
	@GetMapping("{id}")
	public ResponseEntity<Company> get(@PathVariable(name = "id") String id) {
		Company result = null;
		result = _companyRepo.findById(id).orElse(null);
		if (result == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return ResponseEntity.ok(result);
	}


	/** Performs a search for companies, given some search terms.
	 * Search criteria is specified by clients through query parameters.
	 *
	 * @param companyName Terms to be used for searching in the companies' names.
	 * @return Returns a collection of found companies, if any. */
	@GetMapping("/search")
	public Iterable<Company> search(@RequestParam(name = "name") String companyName)
	{
		if (companyName != null)
			companyName = StringUtilities.normalizeStringForQuery(companyName);

		return _companyRepo.findAllByNormalizedNameLike(companyName);
	}
}