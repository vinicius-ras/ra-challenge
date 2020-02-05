package br.com.viniciusras.rachallenge.complaints.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Represents a company to which clients might file complaints. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("companies")
public class Company {
	/** Primary key of this entry in the database. */
	@Id
	private String id;
	/** The name of the company. */
	private String name;
	/** The name of the company. */
	@Field("normalized_name")
	private String normalizedName;
	/** The company's CNPJ number. */
	private String cnpj;
	/** The complaints filed against the company. */
	@JsonBackReference
	@DBRef(lazy = true)
	private List<Complaint> complaints;
}