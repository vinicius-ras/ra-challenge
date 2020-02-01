package br.com.viniciusras.rachallenge.model.repository;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.model.Complaint;

/** Spring Data's CRUD Repository for accessing {@link Complaint} objects. */
public interface ComplaintRepository extends CrudRepository<Complaint, ObjectId> {
}