package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {

    private String customerName;
    private String email;
    private String mobile;
    private String address;

    private Double totalAmount;

    private List<OrderItemRequest> items;
}
