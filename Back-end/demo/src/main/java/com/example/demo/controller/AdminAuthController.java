package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.AdminChangePasswordRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminAuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // =======================
    // ADMIN LOGIN
    // =======================
    @PostMapping("/login")
    public String adminLogin(@RequestBody User request) {

        User admin = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("Not an admin");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(
                admin.getUsername(),
                admin.getRole()
        );
    }

    // =======================
    // ADMIN CHANGE PASSWORD
    // =======================
    @PutMapping("/change-password")
    public String changeAdminPassword(
            @RequestBody AdminChangePasswordRequest request) {

        User admin = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("Not an admin");
        }

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                admin.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        admin.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(admin);

        return "Admin password changed successfully";
    }
}
