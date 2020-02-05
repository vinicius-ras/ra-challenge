package br.com.viniciusras.rachallenge.complaints.model.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.complaints.model.Complaint;

/** Spring Data's CRUD Repository for accessing {@link Complaint} objects. */
public interface ComplaintRepository extends CrudRepository<Complaint, String> {
}