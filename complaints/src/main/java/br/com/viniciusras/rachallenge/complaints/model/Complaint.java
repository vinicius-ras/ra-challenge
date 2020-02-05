package br.com.viniciusras.rachallenge.complaints.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/** Represents a complaint made by a client against a company. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("complaints")
public class Complaint {
	/** Primary key of this entry in the database. */
	@Id
	private String id;
	/** A title given for the complaint by the client. */
	@NotEmpty(message = "Enter a title for your complaint.")
	private String title;
	/** A description given for the complaint by the client. */
	@NotEmpty(message = "Describe your complaint.")
	private String description;
	/** The company against which the complaint was filed. */
	//@JsonManagedReference
	@NotNull(message = "Specify a company.")
	@DBRef(lazy = true)
	private Company company;

}