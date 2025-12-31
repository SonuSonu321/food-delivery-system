package com.example.demo.dto;

import lombok.Data;

@Data
public class AdminChangePasswordRequest {

    private String username;
    private String oldPassword;
    private String newPassword;
}
