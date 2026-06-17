package com.DocumentSignature.DTO;

public class DocumentResponse {

	private Long id;
	private String filename;
	private String status;

	public DocumentResponse() {
	}

	public DocumentResponse(Long id, String filename, String status) {

		this.id = id;
		this.filename = filename;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public String getFilename() {
		return filename;
	}

	public String getStatus() {
		return status;
	}
}