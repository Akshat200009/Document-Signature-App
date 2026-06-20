package com.DocumentSignature.DTO;

public class SignatureRequest {

    private Long documentId;

    private Double x;

    private Double y;

    private Integer page;
    
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

	public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
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
}