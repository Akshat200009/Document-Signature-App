package com.DocumentSignature.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.AuditLog;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByDocumentId(
            Long documentId);
}