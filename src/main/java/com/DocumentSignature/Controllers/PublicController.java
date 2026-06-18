package com.DocumentSignature.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DocumentSignature.DTO.EmailRequest;
import com.DocumentSignature.DTO.PublicDocumentResponse;
import com.DocumentSignature.DTO.RejectRequest;
import com.DocumentSignature.DTO.SignatureResponse;
import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.Signature;
import com.DocumentSignature.Entities.SigningToken;
import com.DocumentSignature.Repositories.DocumentRepository;
import com.DocumentSignature.Repositories.SignatureRepository;
import com.DocumentSignature.Repositories.SigningTokenRepository;
import com.DocumentSignature.Services.AuditService;
import com.DocumentSignature.Services.EmailService;
import com.DocumentSignature.Services.PdfService;
import com.DocumentSignature.Services.TokenService;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final DocumentRepository documentRepository;

    private final TokenService tokenService;

    private final SigningTokenRepository tokenRepository;

    private final SignatureRepository signatureRepository;
    
    private final AuditService auditService;
    
    @Autowired
    private EmailService emailService;
    @Autowired
    private PdfService pdfService;

    public PublicController(
            DocumentRepository documentRepository,
            TokenService tokenService,
            SigningTokenRepository tokenRepository,
            SignatureRepository signatureRepository,
            AuditService auditService) {

        this.documentRepository = documentRepository;
        this.tokenService = tokenService;
        this.tokenRepository = tokenRepository;
        this.signatureRepository = signatureRepository;
        this.auditService = auditService;

    }

    @PostMapping("/create-link/{documentId}")
    public ResponseEntity<String> createLink(
            @PathVariable Long documentId,
            @RequestBody EmailRequest request) {

        Document document =
                documentRepository.findById(documentId)
                        .orElseThrow();

        String token =
                tokenService.createToken(
                        document,
                        request.getEmail());

        String link =
                "http://localhost:5173/public-sign/"
                        + token;

        emailService.sendSigningLink(
                request.getEmail(),
                link);

        return ResponseEntity.ok(
                "Email sent successfully");
    }
    
    @GetMapping("/document/{token}")
    public ResponseEntity<PublicDocumentResponse>
    getDocumentByToken(
            @PathVariable String token) {

        SigningToken signingToken =
                tokenRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Token"));

        Document document =
                signingToken.getDocument();

        List<Signature> signatures =
                signatureRepository
                        .findByDocument(document);

        List<SignatureResponse> responseList =
                signatures.stream()
                        .map(signature -> {

                            SignatureResponse dto =
                                    new SignatureResponse();

                            dto.setId(
                                    signature.getId());

                            dto.setX(
                                    signature.getX());

                            dto.setY(
                                    signature.getY());

                            dto.setPage(
                                    signature.getPage());

                            dto.setStatus(
                                    signature.getStatus());
                            
                            dto.setRejectionReason(
                                    signature
                                            .getRejectionReason());

                            return dto;

                        })
                        .toList();

        PublicDocumentResponse response =
                new PublicDocumentResponse();

        response.setDocumentId(
                document.getId());

        response.setPdfUrl(
                "/api/documents/download/"
                        + document.getId());

        response.setSignatures(
                responseList);

        return ResponseEntity.ok(
                response);
    }
    @PostMapping("/sign/{token}/{signatureId}")
    public ResponseEntity<String> signDocument(
            @PathVariable String token,
            @PathVariable Long signatureId)
            throws Exception {

        SigningToken signingToken =
                tokenRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Token"));

        Signature signature =
                signatureRepository
                        .findById(signatureId)
                        .orElseThrow();

        signature.setStatus("SIGNED");

        signatureRepository.save(signature);
        
        auditService.logAction(
                "SIGN_DOCUMENT",
                signingToken.getSignerEmail(),
                "PUBLIC_LINK",
                signingToken.getDocument().getId());

        pdfService.generateSignedPdf(
                signature.getDocument()
                         .getId());

        return ResponseEntity.ok(
                "Signed Successfully");
    }
    @PostMapping(
            "/reject/{token}/{signatureId}")
    public ResponseEntity<String>
    rejectDocument(
            @PathVariable String token,
            @PathVariable Long signatureId,
            @RequestBody RejectRequest request) {

        Signature signature =
                signatureRepository
                        .findById(signatureId)
                        .orElseThrow();

        signature.setStatus(
                "REJECTED");

        signature.setRejectionReason(
                request.getReason());

        signatureRepository.save(
                signature);

        auditService.logAction(
                "REJECT_DOCUMENT",
                "PUBLIC_USER",
                "PUBLIC_LINK",
                signature.getDocument()
                         .getId());

        return ResponseEntity.ok(
                "Document Rejected");
    }
}