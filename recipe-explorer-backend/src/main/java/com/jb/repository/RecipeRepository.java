package com.jb.repository;

import com.jb.entity.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findByCuisine(String cuisine);
    List<Recipe> findByRatingGreaterThanEqual(Float minRating);
    List<Recipe> findByTitleContainingIgnoreCase(String title);
}