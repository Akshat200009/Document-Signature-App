package com.DocumentSignature.Services;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkeymysecretkey";

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes());
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        ))
                .signWith(getSignKey())
                .compact();
    }

    public String extractUsername(String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith((javax.crypto.SecretKey) getSignKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }

    public boolean isTokenValid(String token, String email) {

        String username =
                extractUsername(token);

        return username.equals(email);
    }
}