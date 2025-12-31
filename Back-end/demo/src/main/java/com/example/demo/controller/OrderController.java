package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // 🔹 PLACE ORDER (GUEST)
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PENDING");
        order.setCreatedAt(java.time.LocalDateTime.now());

        // 🔥 VERY IMPORTANT
        order.getItems().forEach(item -> item.setOrder(order));

        return orderRepository.save(order);
    }

    // 🔹 ADMIN: VIEW ALL ORDERS
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔹 ADMIN: UPDATE STATUS
    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
