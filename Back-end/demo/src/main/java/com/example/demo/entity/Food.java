package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "foods")
@Data                     // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor        // generates no-args constructor
@AllArgsConstructor       // generates all-args constructor
@Builder                  // optional: helps in object creation
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private double price;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
