package ru.lucky.finder.frontend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ProfileDto {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    @JsonProperty("can_access_closed")
    private Boolean canAccessClosed;
    @JsonProperty("is_closed")
    private Boolean isClosed;
    @JsonProperty("instagram")
    private String instagram;
    @JsonProperty("relation")
    private Integer relation;
    @JsonProperty("counters")
    private Counters counters;
    @JsonProperty("relation_partner")
    private RelationPartner relationPartner;
    @JsonProperty("relatives")
    private List<Relative> relatives;
}
