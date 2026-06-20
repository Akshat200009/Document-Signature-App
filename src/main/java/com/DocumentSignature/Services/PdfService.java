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

        this.documentRepository =
                documentRepository;

        this.signatureRepository =
                signatureRepository;
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

            if (!"SIGNED".equalsIgnoreCase(
                    signature.getStatus())) {

                continue;
            }

            PDPage page =
                    pdfDocument.getPage(
                            signature.getPage() - 1);

            PDPageContentStream contentStream =
                    new PDPageContentStream(
                            pdfDocument,
                            page,
                            PDPageContentStream.AppendMode.APPEND,
                            true);

            String text =
                    signature.getSignatureText();

            if (text == null || text.isBlank()) {

                text = "Signed";
            }

            System.out.println(
                    "PDF TEXT = " + text);

            contentStream.beginText();
            if ("serif".equalsIgnoreCase(
                    signature.getFontFamily())) {

                contentStream.setFont(
                        new PDType1Font(
                                Standard14Fonts.FontName.TIMES_ROMAN),
                        20);

            }
            else if ("monospace".equalsIgnoreCase(
                    signature.getFontFamily())) {

                contentStream.setFont(
                        new PDType1Font(
                                Standard14Fonts.FontName.COURIER_BOLD),
                        20);

            }
            else if ("cursive".equalsIgnoreCase(
                    signature.getFontFamily())) {

                contentStream.setFont(
                        new PDType1Font(
                                Standard14Fonts.FontName.TIMES_BOLD_ITALIC),
                        20);

            }
            else if ("fantasy".equalsIgnoreCase(
                    signature.getFontFamily())) {

                contentStream.setFont(
                        new PDType1Font(
                                Standard14Fonts.FontName.HELVETICA_OBLIQUE),
                        20);

            }
            else {

                contentStream.setFont(
                        new PDType1Font(
                                Standard14Fonts.FontName.HELVETICA_BOLD),
                        20);
            }
            float pdfX =
                    signature.getX().floatValue();

            float pdfY =
                    page.getMediaBox().getHeight()
                    - signature.getY().floatValue();

            contentStream.newLineAtOffset(
                    pdfX,
                    pdfY);

            contentStream.showText(text);

            contentStream.endText();

            contentStream.close();
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

        document.setStatus(
        		
                "SIGNED");
        document.setSignedFilepath(
                signedPath);

        documentRepository.save(
                document);


        return signedPath;
    }
}