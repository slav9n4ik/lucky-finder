package ru.lucky.finder.frontend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class ProfileListDto {
    @JsonProperty("total")
    private Integer total;
    @JsonProperty("profiles")
    private List<ProfileDto> profiles;
}
