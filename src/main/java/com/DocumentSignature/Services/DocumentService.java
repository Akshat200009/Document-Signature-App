package com.DocumentSignature.Services;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Repositories.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(
            DocumentRepository documentRepository) {

        this.documentRepository = documentRepository;
    }

    public String uploadDocument(
            MultipartFile file)
            throws IOException {

        String uploadDir =
                System.getProperty("user.dir")
                        + "/uploads/";

        File directory =
                new File(uploadDir);

        if (!directory.exists()) {

            directory.mkdirs();
        }

        System.out.println(
                "Upload Path : "
                        + uploadDir);

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
                "PENDING");

        document.setUploadedAt(
                LocalDateTime.now());

        documentRepository.save(
                document);

        return "Document Uploaded Successfully";
    }
}