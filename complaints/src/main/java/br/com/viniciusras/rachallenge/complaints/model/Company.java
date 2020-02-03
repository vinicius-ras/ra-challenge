package br.com.viniciusras.rachallenge.complaints.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Represents a company to which clients might file complaints. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
	/** Primary key of this entry in the database. */
	@Id
	@Getter @Setter private ObjectId id;
	/** The name of the company. */
	@Getter @Setter private String name;
	/** The company's CNPJ number. */
	@Getter @Setter private String cnpj;
	/** The complaints filed against the company. */
	@JsonBackReference
	@DBRef(lazy = true)
	@Getter @Setter private List<Complaint> complaints;
}