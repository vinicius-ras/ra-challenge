package br.com.viniciusras.rachallenge.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.viniciusras.rachallenge.model.Complaint;
import br.com.viniciusras.rachallenge.model.repository.ComplaintRepository;

/** Controller responsible for managing complaints filed by clients against companies. */
@RestController
@RequestMapping("/complaint")
public class ComplaintsController {
	// PRIVATE FIELDS
	/** Reference to a {@link ComplaintRepository} instance injected by the container. */
	@Autowired private ComplaintRepository _complaintRepo;


	// PUBLIC METHODS
	@GetMapping("populate")
	public String populate()
	{
		Complaint c = new Complaint();
		c.setTitle("Teste titulo");
		c.setDescription("Teste descrição");
		_complaintRepo.save(c);
		return "OK!";
	}

	/** Retrieves information about a {@link Complaint}, given its identifier.
	 * @param id The unique identifier for the resource you are trying to retrieve.
	 * @return
	 *    In case of success, returns an HTTP OK response with an object representing the found resource.
	 *    Else, returns an HTTP NOT FOUND response, indicating the given entity could not be found. */
	@GetMapping("{id}")
	public ResponseEntity<Complaint> getComplaint(@PathVariable(name = "id") String id) {
		Complaint result = null;
		try {
			result = _complaintRepo.findById(new ObjectId(id)).orElse(null);
		}
		catch (IllegalArgumentException ex) {
			// String could not be converted to an ObjectId. Nothing to do.
		}
		if (result == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return ResponseEntity.ok(result);
	}
}