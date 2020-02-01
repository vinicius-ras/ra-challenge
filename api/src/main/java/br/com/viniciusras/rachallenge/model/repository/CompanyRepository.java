package br.com.viniciusras.rachallenge.model.repository;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.model.Company;

/** Spring Data's CRUD Repository for accessing {@link Company} objects. */
public interface CompanyRepository extends CrudRepository<Company, ObjectId> {
}