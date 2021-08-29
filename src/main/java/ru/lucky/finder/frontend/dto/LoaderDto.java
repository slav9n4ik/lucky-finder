package ru.lucky.finder.frontend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoaderDto {
    private Integer current;
    private Integer total;
}
