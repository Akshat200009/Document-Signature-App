package com.DocumentSignature.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.SigningToken;

public interface SigningTokenRepository
        extends JpaRepository<SigningToken, Long> {

    Optional<SigningToken>
    findByToken(String token);
}