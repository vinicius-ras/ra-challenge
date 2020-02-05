package br.com.viniciusras.rachallenge.maps.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Represents a complaint made by a client against a company. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("complaint_locations")
public class ComplaintLocation {
	/** Primary key of this entry in the database. */
	@Id
	private String id;

	/** Identifier of the company against which the complaint was filed. */
	@Field("company_id")
	private String companyId;

	/** Location registered for the filed complaint. */
	private GeoJsonPoint location;
}