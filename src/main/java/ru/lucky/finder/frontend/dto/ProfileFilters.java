package ru.lucky.finder.frontend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfileFilters {
    private String sex;
    private String status;
    private String sort;
    private String hasPhoto;
    private String isClosed;
    private String canAccessClosed;
    private Integer count;
    private Boolean instagram;
    private Boolean morePhotos;
    private String birthDay;
    private String birthMonth;
    private Integer offset;
    private List<String> searchFields;
    private List<String> getUserFields;
}
