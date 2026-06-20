package com.DocumentSignature.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "signatures")
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double x;

    private Double y;

    private Integer page;

    private String status;
    
    private String rejectionReason;
    
    private String signatureText;

    private String fontFamily;

    public String getSignatureText() {
		return signatureText;
	}

	public void setSignatureText(String signatureText) {
		this.signatureText = signatureText;
	}

	public String getFontFamily() {
		return fontFamily;
	}

	public void setFontFamily(String fontFamily) {
		this.fontFamily = fontFamily;
	}

	@ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;

    @ManyToOne
    @JoinColumn(name = "signer_id")
    private User signer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public User getSigner() {
        return signer;
    }

    public void setSigner(User signer) {
        this.signer = signer;
    }
    
    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(
            String rejectionReason) {

        this.rejectionReason =
                rejectionReason;
    }
}