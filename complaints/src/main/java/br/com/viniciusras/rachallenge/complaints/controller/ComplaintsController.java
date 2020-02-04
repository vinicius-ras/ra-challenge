package br.com.viniciusras.rachallenge.complaints.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.complaints.model.Complaint;
import br.com.viniciusras.rachallenge.complaints.model.repository.ComplaintRepository;
import br.com.viniciusras.rachallenge.complaints.security.RequiresClientRole;

/** Controller responsible for managing complaints filed by clients against companies. */
@RestController
@RequestMapping("/complaint")
public class ComplaintsController {
	// PRIVATE FIELDS
	/** Reference to a {@link ComplaintRepository} instance injected by the container. */
	@Autowired
	private ComplaintRepository _complaintRepo;





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
		try {
			result = _complaintRepo.findById(new ObjectId(id)).orElse(null);
		} catch (IllegalArgumentException ex) {
			// String could not be converted to an ObjectId. Nothing to do.
		}
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
	 * @throws URISyntaxException Thrown in case a bad URI has been generated for the created resource.
	 *                            This is not expected to happen, and would indicate a bug in the code.
	 */
	@RequiresClientRole
	@PostMapping
	public ResponseEntity<Complaint> post(@Valid @RequestBody Complaint data) throws URISyntaxException {
		Complaint createdEntity = null;
		if (data == null || data.getId() != null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

		createdEntity = _complaintRepo.save(data);
		URI createdResourceLocation = new URI(String.format("/complaint/%s", createdEntity.getId()));
		return ResponseEntity.created(createdResourceLocation).body(createdEntity);
	}
}