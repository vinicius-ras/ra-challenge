package br.com.viniciusras.rachallenge.complaints.model;

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

	/** The identifier of the {@link Company} for which the {@link Complaint} related to
	 * this location has been registered. */
	@Field("company_id")
	private String companyId;

	/** The coordinates where the complaint was registered. */
	private GeoJsonPoint location;
}