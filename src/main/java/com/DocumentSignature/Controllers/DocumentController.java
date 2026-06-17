package com.DocumentSignature.Controllers;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/upload")
    public ResponseEntity<String>
    uploadDocument(

            @RequestParam("file")
            MultipartFile file)

            throws IOException {

        return ResponseEntity.ok(
                documentService
                        .uploadDocument(file));
    }
}