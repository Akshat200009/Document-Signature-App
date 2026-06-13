package com.DocumentSignature.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DocumentSignature.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);	
}
