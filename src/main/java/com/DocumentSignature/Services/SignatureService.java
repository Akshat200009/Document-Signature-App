package com.DocumentSignature.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DocumentSignature.DTO.SignatureRequest;
import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.Signature;
import com.DocumentSignature.Entities.User;
import com.DocumentSignature.Repositories.DocumentRepository;
import com.DocumentSignature.Repositories.SignatureRepository;
import com.DocumentSignature.Repositories.UserRepository;

@Service
public class SignatureService {

    private final SignatureRepository signatureRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    public SignatureService(
            SignatureRepository signatureRepository,
            DocumentRepository documentRepository,
            UserRepository userRepository) {

        this.signatureRepository = signatureRepository;
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    public String saveSignature(
            SignatureRequest request,
            String email) {

        Document document =
                documentRepository
                        .findById(request.getDocumentId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document Not Found"));

        User signer =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        Signature signature =
                new Signature();

        signature.setDocument(document);
        signature.setSigner(signer);

        signature.setX(request.getX());
        signature.setY(request.getY());
        signature.setPage(request.getPage());

        signature.setStatus("PENDING");

        signatureRepository.save(signature);

        return "Signature Saved Successfully";
    }

    public List<Signature> getSignaturesByDocument(
            Long documentId) {

        return signatureRepository
                .findByDocumentId(documentId);
    }
}