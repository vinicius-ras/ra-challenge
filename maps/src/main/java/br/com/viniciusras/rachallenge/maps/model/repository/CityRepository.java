package br.com.viniciusras.rachallenge.maps.model.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.viniciusras.rachallenge.maps.model.City;

/** Spring Data's CRUD Repository for accessing {@link City} objects. */
public interface CityRepository extends MongoRepository<City, ObjectId> {
	Iterable<City> findAllByNormalizedNameLike(String name);
	Iterable<City> findAllByState(String state);
	Iterable<City> findAllByStateAndNormalizedNameLike(String state, String name);
}