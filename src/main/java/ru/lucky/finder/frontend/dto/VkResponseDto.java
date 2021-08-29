package ru.lucky.finder.frontend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VkResponseDto {
    @JsonProperty("response")
    private ProfileListDto response;
    @JsonProperty("error")
    private VkError error;
}
