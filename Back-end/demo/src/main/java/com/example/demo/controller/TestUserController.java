package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestUserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public TestUserController(UserRepository userRepository,
                              PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/create-users")
    public String createUsers() {

        User user = new User(null, "user1",
                passwordEncoder.encode("user123"), "USER");

        User admin = new User(null, "admin1",
                passwordEncoder.encode("admin123"), "ADMIN");

        userRepository.save(user);
        userRepository.save(admin);

        return "USER & ADMIN CREATED";
    }
}
