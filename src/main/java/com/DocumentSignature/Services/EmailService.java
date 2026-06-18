package com.DocumentSignature.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSigningLink(
            String email,
            String link) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Document Signature Request");

        message.setText(
                "Hello,\n\n" +
                "Please sign your document using the link below:\n\n"
                + link +
                "\n\nRegards,\nDocument Signature App");

        mailSender.send(message);
    }
}