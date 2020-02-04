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

/** Represents one of the cities of Brazil. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cities")
public class City {
	/** Primary key of this entry in the database. */
	@Id
	@Getter @Setter private ObjectId id;
	/** The city's code, as defined by IBGE (Institudo Brasileiro de Geografia e Estatística). */
	@Field("ibge_code")
	@Getter @Setter private String ibgeCode;
	/** The name of the city. */
	@Getter @Setter private String name;
	/** The name of the city, in normalized form. */
	@Field("normalized_name")
	@Getter @Setter private String normalizedName;
	/** The state to which the city belongs. */
	@Getter @Setter private String state;
}