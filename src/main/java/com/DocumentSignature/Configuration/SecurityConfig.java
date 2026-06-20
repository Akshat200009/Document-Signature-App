package com.DocumentSignature.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.DocumentSignature.Services.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtFilter) {

        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth .anyRequest()
//                        .requestMatchers("/api/auth/**",
//                                "/api/test",
//                                "/api/documents/upload",
//                                "/api/documents/download/**",
//                                "/api/public/**",
//                                "/api/pdf/signed-download/**",
//                                "/api/documents/download-signed/**",
//                                "/api/documents/reject/**",
//                                "/api/documents/**"
//                               )

                        .permitAll()

                        .anyRequest()
                        .authenticated())
//
//                .addFilterBefore(
//                        jwtFilter,
//                        UsernamePasswordAuthenticationFilter.class)

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}