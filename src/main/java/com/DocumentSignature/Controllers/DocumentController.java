package com.DocumentSignature.Controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Services.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(
            DocumentService documentService) {

        this.documentService =
                documentService;
    }

    // Upload Document
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file")
            MultipartFile file)
            throws IOException {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                documentService
                        .uploadDocument(
                                file,
                                email));
    }

    // All Documents
    @GetMapping
    public ResponseEntity<List<Document>>
    getAllDocuments() {

        return ResponseEntity.ok(
                documentService
                        .getAllDocuments());
    }

    // Logged In User Documents
    @GetMapping("/my")
    public ResponseEntity<List<Document>>
    getMyDocuments() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                documentService
                        .getMyDocuments(
                                email));
    }

    // Document Details
    @GetMapping("/details/{id}")
    public ResponseEntity<Document>
    getDocumentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                documentService
                        .getDocumentById(id));
    }

    // Download PDF
    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource>
    downloadDocument(
            @PathVariable Long id)
            throws Exception {

        Document document =
                documentService
                        .getDocument(id);

        File file =
                new File(
                        document.getFilepath());

        byte[] data =
                Files.readAllBytes(
                        file.toPath());

        ByteArrayResource resource =
                new ByteArrayResource(
                        data);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename="
                                + document.getFilename())
                .contentLength(
                        data.length)
                .contentType(
                        MediaType.APPLICATION_PDF)
                .body(resource);
    }
}