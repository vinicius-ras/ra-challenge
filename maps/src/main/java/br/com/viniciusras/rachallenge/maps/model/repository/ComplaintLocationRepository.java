package br.com.viniciusras.rachallenge.maps.model.repository;

import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.maps.model.ComplaintLocation;

/** Spring Data's CRUD Repository for accessing {@link ComplaintLocation} objects. */
public interface ComplaintLocationRepository extends CrudRepository<ComplaintLocation, String> {
	@Query("{'company_id': '?#{[0]}', 'location': { $geoIntersects: { $geometry: ?#{[1]} } } }")
	Iterable<ComplaintLocation> findAllByCompanyAndLocationGeoIntersects(String companyId, GeoJson<?> geoJsonObject);
	@Query("{'location': { $geoIntersects: { $geometry: ?#{[0]} } } }")
	Iterable<ComplaintLocation> findAllByLocationGeoIntersects(GeoJson<?> geoJsonObject);
}