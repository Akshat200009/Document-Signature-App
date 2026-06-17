package com.DocumentSignature.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.Signature;

public interface SignatureRepository
        extends JpaRepository<Signature, Long> {

    List<Signature> findByDocumentId(
            Long documentId);
}