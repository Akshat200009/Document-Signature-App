package com.DocumentSignature.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

import com.DocumentSignature.DTO.SignatureRequest;
import com.DocumentSignature.Entities.Signature;
import com.DocumentSignature.Services.SignatureService;

@RestController
@RequestMapping("/api/signatures")
public class SignatureController {

    private final SignatureService signatureService;

    public SignatureController(
            SignatureService signatureService) {

        this.signatureService =
                signatureService;
    }

    @PostMapping
    public ResponseEntity<String>
    saveSignature(
            @RequestBody SignatureRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                signatureService
                        .saveSignature(
                                request,
                                email));
    }

    @GetMapping("/document/{documentId}")
    public ResponseEntity<List<Signature>>
    getSignaturesByDocument(
            @PathVariable Long documentId) {

        return ResponseEntity.ok(
                signatureService
                        .getSignaturesByDocument(
                                documentId));
    }
}