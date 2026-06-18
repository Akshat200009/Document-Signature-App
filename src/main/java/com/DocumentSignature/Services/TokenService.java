package com.DocumentSignature.Services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DocumentSignature.Entities.Document;
import com.DocumentSignature.Entities.SigningToken;
import com.DocumentSignature.Repositories.SigningTokenRepository;

@Service
public class TokenService {

    private final SigningTokenRepository tokenRepository;

    public TokenService(
            SigningTokenRepository tokenRepository) {

        this.tokenRepository = tokenRepository;
    }

    public String createToken(
            Document document,
            String email) {

        String token =
                UUID.randomUUID()
                        .toString();

        SigningToken signingToken =
                new SigningToken();

        signingToken.setToken(token);

        signingToken.setSignerEmail(email);

        signingToken.setDocument(document);

        signingToken.setExpiryTime(
                LocalDateTime.now()
                        .plusDays(7));

        tokenRepository.save(
                signingToken);

        return token;
    }
}