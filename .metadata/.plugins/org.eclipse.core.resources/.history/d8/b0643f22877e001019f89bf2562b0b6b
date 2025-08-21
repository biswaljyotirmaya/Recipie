package com.jb.entity;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Document(collection = "recipes")
@Data
public class Recipe {

    @Id
    private String id;

    @JsonProperty("Contient")
    private String continent;

    @JsonProperty("Country_State")
    private String countryState;

    private String cuisine;
    private String title;

    @JsonProperty("URL")
    private String url;

    private Float rating;

    @JsonProperty("total_time")
    @Field("total_time")
    private Integer totalTime;

    @JsonProperty("prep_time")
    @Field("prep_time")
    private Integer prepTime;

    @JsonProperty("cook_time")
    @Field("cook_time")
    private Integer cookTime;

    private String description;
    private String serves;
    private List<String> ingredients;
    private List<String> instructions;
    private Nutrients nutrients;

    // This will be calculated from nutrients.calories but not stored in MongoDB
    @Transient
    private Float calories;
}