package ru.lucky.finder.frontend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Photos {
    @JsonProperty("url")
    private String url;
    @JsonProperty("height")
    private String height;
    @JsonProperty("width")
    private String width;
}
