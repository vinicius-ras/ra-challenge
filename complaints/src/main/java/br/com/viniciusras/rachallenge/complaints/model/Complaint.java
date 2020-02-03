package br.com.viniciusras.rachallenge.complaints.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/** Represents a complaint made by a client against a company. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
	/** Primary key of this entry in the database. */
	@Id
	@Getter @Setter private ObjectId id;
	/** A title given for the complaint by the client. */
	@Getter @Setter private String title;
	/** A description given for the complaint by the client. */
	@Getter @Setter private String description;
	/** The company against which the complaint was filed. */
	@JsonManagedReference
	@DBRef(lazy = true)
	@Getter @Setter private Company company;

}