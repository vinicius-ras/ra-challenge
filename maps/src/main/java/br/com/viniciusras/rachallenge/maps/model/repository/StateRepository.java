package br.com.viniciusras.rachallenge.maps.model.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.viniciusras.rachallenge.maps.model.State;

/** Spring Data's CRUD Repository for accessing {@link State} objects. */
public interface StateRepository extends MongoRepository<State, String> {
	State findByAbbreviation(String abbreviation);
}