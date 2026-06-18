package com.DocumentSignature.Services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.DocumentSignature.Entities.AuditLog;
import com.DocumentSignature.Repositories.AuditLogRepository;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(
            AuditLogRepository auditLogRepository) {

        this.auditLogRepository =
                auditLogRepository;
    }

    public void logAction(
            String action,
            String email,
            String ipAddress,
            Long documentId) {

        AuditLog log =
                new AuditLog();

        log.setAction(action);
        log.setEmail(email);
        log.setIpAddress(ipAddress);
        log.setDocumentId(documentId);
        log.setTimestamp(
                LocalDateTime.now());

        auditLogRepository.save(log);
    }
}