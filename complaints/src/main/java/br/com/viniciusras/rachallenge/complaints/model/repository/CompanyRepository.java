package br.com.viniciusras.rachallenge.complaints.model.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.viniciusras.rachallenge.complaints.model.Company;

/** Spring Data's CRUD Repository for accessing {@link Company} objects. */
public interface CompanyRepository extends CrudRepository<Company, String> {
	Iterable<Company> findAllByNormalizedNameLike(String companyName);
}