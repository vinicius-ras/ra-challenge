package br.com.viniciusras.rachallenge.maps.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Represents one of the states of Brazil. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "states")
public class State {
	/** Primary key of this entry in the database. */
	@Id
	@Getter @Setter private ObjectId id;
	/** The abbreviation of the state (e.g.: MA, SP, RJ, etc). */
	@Getter @Setter private String abbreviation;
	/** The name of the state. */
	@Getter @Setter private String name;
	/** The name of the state, in normalized form. */
	@Field("normalized_name")
	@Getter @Setter private String normalizedName;
	/** The macroregion where the state is located (Nordeste, Sul, Sudoeste, etc). */
	@Getter @Setter private String region;
}