package br.com.viniciusras.rachallenge.maps.model.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.viniciusras.rachallenge.maps.model.State;

/** Spring Data's CRUD Repository for accessing {@link State} objects. */
public interface StateRepository extends MongoRepository<State, String> {
	@Query(value = "{}", fields = "{geometry: 0}")
	Iterable<State> findAllNoGeometry();
	State findByAbbreviation(String abbreviation);
}