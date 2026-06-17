package com.DocumentSignature.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}
