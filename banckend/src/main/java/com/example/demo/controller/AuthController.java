package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return userRepository.findByTelephone(request.telephone())
                .filter(user -> passwordEncoder.matches(request.password(), user.getPassword()))
                .map(user -> ResponseEntity.ok(Map.of(
                        "token", jwtService.generateToken(user.getTelephone()),
                        "nom", user.getNom(),
                        "telephone", user.getTelephone()
                )))
                .orElse(ResponseEntity.status(401)
                        .body(Map.of("message", "Téléphone ou mot de passe incorrect")));
    }

    record LoginRequest(String telephone, String password) {}
}
