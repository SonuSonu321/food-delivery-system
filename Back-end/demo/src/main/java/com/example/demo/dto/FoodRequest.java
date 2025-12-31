package com.example.demo.dto;

import lombok.Data;

@Data
public class FoodRequest {
    private String name;
    private double price;
    private String imageUrl;
    private Long categoryId;
}
