package br.com.viniciusras.rachallenge.complaints.model.viewmodel;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import br.com.viniciusras.rachallenge.complaints.model.Complaint;
import lombok.Data;


/** View model used to post new client complaints. */
@Data
public class ComplaintPost {
	/** The data about the complaint being posted. */
	@NotNull
	@Valid
	private Complaint complaint;
	/** The location the complaint is associated to. */
	@NotNull
	private GeoJsonPoint location;
}
