package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/menu")
    public String viewMenu() {
        return "MENU visible to USER";
    }

    @PostMapping("/order")
    public String placeOrder() {
        return "ORDER placed by USER";
    }
}
