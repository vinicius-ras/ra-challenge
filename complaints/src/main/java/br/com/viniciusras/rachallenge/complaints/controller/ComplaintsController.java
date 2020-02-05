package br.com.viniciusras.rachallenge.complaints.controller;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.complaints.model.Company;
import br.com.viniciusras.rachallenge.complaints.model.Complaint;
import br.com.viniciusras.rachallenge.complaints.model.ComplaintLocation;
import br.com.viniciusras.rachallenge.complaints.model.repository.CompanyRepository;
import br.com.viniciusras.rachallenge.complaints.model.repository.ComplaintLocationRepository;
import br.com.viniciusras.rachallenge.complaints.model.repository.ComplaintRepository;
import br.com.viniciusras.rachallenge.complaints.model.viewmodel.ComplaintPost;
import br.com.viniciusras.rachallenge.complaints.security.RequiresClientRole;

/**
 * Controller responsible for managing complaints filed by clients against
 * companies. */
@RestController
@RequestMapping("/complaint")
public class ComplaintsController {
	// PRIVATE FIELDS
	/** Reference to a {@link ComplaintRepository} instance injected by the container. */
	@Autowired private ComplaintRepository _complaintRepo;
	/** Reference to a {@link CompanyRepository} instance injected by the container. */
	@Autowired private ComplaintLocationRepository _complaintLocationRepo;
	/** Reference to a {@link CompanyRepository} instance injected by the container. */
	@Autowired private CompanyRepository _companyRepo;

	// PUBLIC METHODS
	/**
	 * Retrieves information about a {@link Complaint}, given its identifier.
	 *
	 * @param id The unique identifier for the resource you are trying to retrieve.
	 * @return In case of success, returns an HTTP OK response with an object
	 *         representing the found resource. Else, returns an HTTP NOT FOUND
	 *         response, indicating the given entity could not be found.
	 */
	@GetMapping("{id}")
	public ResponseEntity<Complaint> get(@PathVariable(name = "id") String id) {
		Complaint result = null;
		result = _complaintRepo.findById(id).orElse(null);
		if (result == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return ResponseEntity.ok(result);
	}

	/**
	 * Allows clients to file {@link Complaint}s against a company.
	 *
	 * @param data The actual complaint data that was sent by the client, in the
	 *             body of the HTTP Request.
	 * @return Returns the appropriate HTTP Response to be sent to the client.
	 *         Invalid request bodies will lead to an HTTP Bad Request (400) status
	 *         code being returned. Valid
	 * @throws URISyntaxException Thrown in case a bad URI has been generated for
	 *                            the created resource. This is not expected to
	 *                            happen, and would indicate a bug in the code.
	 */
	@RequiresClientRole
	@PostMapping
	public ResponseEntity<Complaint> post(@Valid @RequestBody ComplaintPost data) throws URISyntaxException {
		// Extra validation steps
		Complaint createdEntity = null;
		if (data == null || data.getComplaint().getId() != null || data.getComplaint().getCompany().getId() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

		Company targetCompany = _companyRepo.findById(data.getComplaint().getCompany().getId()).orElse(null);
		if (targetCompany == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);


		// Save the new complaint and its location
		createdEntity = _complaintRepo.save(data.getComplaint());

		ComplaintLocation complaintLocation = new ComplaintLocation();
		complaintLocation.setCompanyId(targetCompany.getId());
		complaintLocation.setLocation(data.getLocation());
		_complaintLocationRepo.save(complaintLocation);

		// Return an HTTP Created status code, with the right created resource location
		URI createdResourceLocation = new URI(String.format("/complaint/%s", createdEntity.getId()));
		return ResponseEntity.created(createdResourceLocation).body(createdEntity);
	}
}