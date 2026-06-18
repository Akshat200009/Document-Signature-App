package com.DocumentSignature.Controllers;

import java.io.File;
import java.nio.file.Files;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DocumentSignature.Services.PdfService;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(
            PdfService pdfService) {

        this.pdfService = pdfService;
    }

    @PostMapping("/generate/{documentId}")
    public ResponseEntity<String>
    generatePdf(
            @PathVariable Long documentId)
            throws Exception {

        return ResponseEntity.ok(
                pdfService.generateSignedPdf(
                        documentId));
    }

    @GetMapping("/download/{documentId}")
    public ResponseEntity<ByteArrayResource>
    downloadSignedPdf(
            @PathVariable Long documentId)
            throws Exception {

        String filePath =
                pdfService.generateSignedPdf(
                        documentId);

        File file =
                new File(filePath);

        byte[] data =
                Files.readAllBytes(
                        file.toPath());

        ByteArrayResource resource =
                new ByteArrayResource(data);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename="
                                + file.getName())
                .contentLength(
                        data.length)
                .contentType(
                        MediaType.APPLICATION_PDF)
                .body(resource);
    }
}