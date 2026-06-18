package com.DocumentSignature.DTO;

import java.util.List;

public class PublicDocumentResponse {

    private Long documentId;

    private String pdfUrl;

    private List<SignatureResponse> signatures;

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public List<SignatureResponse> getSignatures() {
        return signatures;
    }

    public void setSignatures(
            List<SignatureResponse> signatures) {

        this.signatures = signatures;
    }
}