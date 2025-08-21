package com.jb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.jb.service.RecipeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public Page<Map<String, Object>> getAllRecipes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return recipeService.getAllRecipes(page, limit);
    }

    @GetMapping("/search")
    public Page<Map<String, Object>> searchRecipes(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) Float minRating,
            @RequestParam(required = false) Float maxRating,
            @RequestParam(required = false) Integer maxTotalTime,
            @RequestParam(required = false) Float maxCalories,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        
        return recipeService.searchRecipes(title, cuisine, minRating, maxRating, 
                                         maxTotalTime, maxCalories, page, limit);
    }

    @GetMapping("/{id}")
    public Map<String, Object> getRecipeById(@PathVariable String id) {
        return recipeService.findById(id);
    }

    @GetMapping("/cuisines")
    public List<String> getAllCuisines() {
        return recipeService.findAllCuisines();
    }

    @GetMapping("/fields")
    public List<String> getAllFields() {
        return recipeService.findAllFields();
    }

    @GetMapping("/count")
    public long getRecipeCount() {
        return recipeService.getTotalRecipeCount();
    }
}