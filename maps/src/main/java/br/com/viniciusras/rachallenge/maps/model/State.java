package br.com.viniciusras.rachallenge.maps.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Represents one of the states of Brazil. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "states")
public class State {
	/** Primary key of this entry in the database. */
	@Id
	private String id;
	/** The abbreviation of the state (e.g.: MA, SP, RJ, etc). */
	private String abbreviation;
	/** The name of the state. */
	private String name;
	/** The name of the state, in normalized form. */
	@Field("normalized_name")
	private String normalizedName;
	/** The macroregion where the state is located (Nordeste, Sul, Sudoeste, etc). */
	private String region;
	/** The actual GeoJSON object representing the geometry of the state. */
	GeoJson<?> geometry;
}