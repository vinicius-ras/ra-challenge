package br.com.viniciusras.rachallenge.maps.model.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.viniciusras.rachallenge.maps.model.City;

/** Spring Data's CRUD Repository for accessing {@link City} objects. */
public interface CityRepository extends MongoRepository<City, String> {
	City findByIbgeCode(String ibge);
	@Query(fields="{'geometry': 0}")
	Iterable<City> findAllByNormalizedNameLike(String name);
	@Query(fields="{'geometry': 0}")
	Iterable<City> findAllByState(String state);
	@Query(fields="{'geometry': 0}")
	Iterable<City> findAllByStateAndNormalizedNameLike(String state, String name);
}