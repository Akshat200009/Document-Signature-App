package com.DocumentSignature.Services;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.Signature;
import com.DocumentSignature.Entities.User;
import com.DocumentSignature.Repositories.DocumentRepository;
import com.DocumentSignature.Repositories.SignatureRepository;
import com.DocumentSignature.Repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;
    private final SignatureRepository signatureRepository;

    public DocumentService(
            DocumentRepository documentRepository,
            UserRepository userRepository,
            AuditService auditService,
            SignatureRepository signatureRepository) {

        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.auditService = auditService;
        this.signatureRepository = signatureRepository;

    }

    public String uploadDocument(
            MultipartFile file,
            String email,
            String ipAddress)
            throws IOException {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        String uploadDir =
                System.getProperty("user.dir")
                        + "/uploads/";

        File directory =
                new File(uploadDir);

        if (!directory.exists()) {

            directory.mkdirs();
        }

        String filePath =
                uploadDir
                + System.currentTimeMillis()
                + "_"
                + file.getOriginalFilename();

        file.transferTo(
                new File(filePath));

        Document document =
                new Document();

        document.setFilename(
                file.getOriginalFilename());

        document.setFilepath(
                filePath);

        document.setStatus(
                "PENDING");

        document.setUploadedAt(
                LocalDateTime.now());

        document.setUser(user);

        documentRepository.save(
                document);
        
        auditService.logAction(
                "UPLOAD_DOCUMENT",
                email,
                ipAddress,
                document.getId());

        return "Document Uploaded Successfully";
    }

    public List<Document> getAllDocuments() {

        return documentRepository.findAll();
    }

    public Document getDocumentById(
            Long id) {

        return documentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document Not Found"));
    }

    public Document getDocument(
            Long id) {

        return documentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document Not Found"));
    }

    public List<Document> getMyDocuments(
            String email) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        return documentRepository
                .findByUser(user);
    }
    public Document save(
            Document document) {

        return documentRepository.save(
                document);
    }
    @Transactional
    public void deleteDocument(
            Long id) {

        Document document =
                documentRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document Not Found"));

        List<Signature> signatures =
                signatureRepository
                        .findByDocument(document);

        signatureRepository.deleteAll(
                signatures);

        // Delete original PDF
        File pdfFile =
                new File(
                        document.getFilepath());

        if (pdfFile.exists()) {

            pdfFile.delete();
        }

        // Delete signed PDF
        if (document.getSignedFilepath()
                != null) {

            File signedFile =
                    new File(
                            document.getSignedFilepath());

            if (signedFile.exists()) {

                signedFile.delete();
            }
        }

        documentRepository.delete(
                document);
    }
}