package com.DocumentSignature.Services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DocumentSignature.DTO.LoginRequest;
import com.DocumentSignature.DTO.LoginResponse;
import com.DocumentSignature.DTO.RegisterRequest;
import com.DocumentSignature.Entities.User;
import com.DocumentSignature.Repositories.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // REGISTER USER
    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // LOGIN USER
    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        boolean passwordMatched =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!passwordMatched) {
            throw new RuntimeException("Invalid Credentials");
        }
        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new LoginResponse(
                token,
                user.getName(),
                user.getEmail());    }
}