package br.com.viniciusras.rachallenge.complaints.model.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.complaints.model.ComplaintLocation;

/** Spring Data's CRUD Repository for accessing {@link ComplaintLocation} objects. */
public interface ComplaintLocationRepository extends CrudRepository<ComplaintLocation, String> {
}