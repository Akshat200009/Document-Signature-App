package com.DocumentSignature.Services;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.User;
import com.DocumentSignature.Repositories.DocumentRepository;
import com.DocumentSignature.Repositories.UserRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    public DocumentService(
            DocumentRepository documentRepository,
            UserRepository userRepository) {

        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    public String uploadDocument(
            MultipartFile file,
            String email)
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
                "SIGNED");

        document.setUploadedAt(
                LocalDateTime.now());

        document.setUser(user);

        documentRepository.save(
                document);

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
}