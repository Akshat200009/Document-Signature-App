package com.DocumentSignature.Services;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.Signature;
import com.DocumentSignature.Repositories.DocumentRepository;
import com.DocumentSignature.Repositories.SignatureRepository;

@Service
public class PdfService {

    private final DocumentRepository documentRepository;
    private final SignatureRepository signatureRepository;

    public PdfService(
            DocumentRepository documentRepository,
            SignatureRepository signatureRepository) {

        this.documentRepository = documentRepository;
        this.signatureRepository = signatureRepository;
    }

    public String generateSignedPdf(
            Long documentId)
            throws IOException {

        Document document =
                documentRepository
                        .findById(documentId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Document Not Found"));

        List<Signature> signatures =
                signatureRepository
                        .findByDocumentId(
                                documentId);

        File originalPdf =
                new File(
                        document.getFilepath());

        PDDocument pdfDocument =
                Loader.loadPDF(
                        originalPdf);

        for (Signature signature : signatures) {

            PDPage page =
                    pdfDocument.getPage(
                            signature.getPage() - 1);

            PDPageContentStream contentStream =
                    new PDPageContentStream(
                            pdfDocument,
                            page,
                            PDPageContentStream.AppendMode.APPEND,
                            true);

            contentStream.beginText();

            contentStream.setFont(
                    new PDType1Font(
                            Standard14Fonts.FontName.HELVETICA_BOLD),
                    12);

            contentStream.newLineAtOffset(
                    signature.getX().floatValue(),
                    signature.getY().floatValue());

            contentStream.showText(
                    "Signed By Akshat Mehta");

            contentStream.endText();

            contentStream.close();

            // Update Signature Status
            signature.setStatus(
                    "SIGNED");
        }

        String signedPath =
                originalPdf.getParent()
                        + "/signed_"
                        + System.currentTimeMillis()
                        + "_"
                        + document.getFilename();

        pdfDocument.save(
                signedPath);

        pdfDocument.close();

        // Save Signature Statuses
        signatureRepository.saveAll(
                signatures);

        // Update Document Status
        document.setStatus(
                "SIGNED");

        documentRepository.save(
                document);

        return signedPath;
    }
}