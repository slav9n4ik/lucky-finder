package ru.lucky.finder.frontend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.lucky.finder.frontend.dto.LoaderDto;
import ru.lucky.finder.frontend.dto.ProfileFilters;
import ru.lucky.finder.frontend.dto.ProfileListDto;
import ru.lucky.finder.frontend.service.VkService;

@RestController
@RequiredArgsConstructor
public class SearchAndGetProfilesController {
    private final VkService vkService;

    @GetMapping("/loader")
    public LoaderDto getLoaderInfo() {
        return vkService.getLoaderInfo();
    }

    @PutMapping("/searchProfiles")
    public ProfileListDto searchProfiles(@RequestBody ProfileFilters filters) {
        return vkService.getProfileWithFilters(filters);
    }

    @PutMapping("/initSearchData")
    public String initSearchData(@RequestBody ProfileFilters filters) {
        return vkService.initSearchData(filters);
    }
}
