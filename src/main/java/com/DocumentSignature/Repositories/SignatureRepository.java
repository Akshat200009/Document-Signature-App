package com.DocumentSignature.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.Signature;


public interface SignatureRepository
        extends JpaRepository<Signature, Long> {

    List<Signature> findByDocument(
            Document document);
    
    List<Signature> findByDocumentId(
            Long documentId);
   
}