package com.DocumentSignature.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.User;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByUser(User user);

}
