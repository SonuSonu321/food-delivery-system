package com.example.demo.controller;

import com.example.demo.dto.FoodRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.Food;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.FoodRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodRepository foodRepository;
    private final CategoryRepository categoryRepository;

    public FoodController(FoodRepository foodRepository,
                          CategoryRepository categoryRepository) {
        this.foodRepository = foodRepository;
        this.categoryRepository = categoryRepository;
    }

    // 🔹 GET all foods
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // 🔹 GET foods by category
    @GetMapping("/category/{id}")
    public List<Food> getFoodsByCategory(@PathVariable Long id) {
        return foodRepository.findByCategoryId(id);
    }

    // 🔹 GET food by id (optional but useful)
    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));
    }

    // 🔹 POST food (create)
    @PostMapping
    public Food addFood(@RequestBody FoodRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Food food = Food.builder()
                .name(request.getName())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        return foodRepository.save(food);
    }

    // 🔹 PUT food (update)
    @PutMapping("/{id}")
    public Food updateFood(
            @PathVariable Long id,
            @RequestBody FoodRequest request
    ) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // update fields
        food.setName(request.getName());
        food.setPrice(request.getPrice());
        food.setImageUrl(request.getImageUrl());
        food.setCategory(category);

        return foodRepository.save(food);
    }

    // 🔹 DELETE food
    @DeleteMapping("/{id}")
    public String deleteFood(@PathVariable Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        foodRepository.delete(food);
        return "Food deleted successfully";
    }
}
