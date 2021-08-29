package ru.lucky.finder.frontend.service;

import ru.lucky.finder.frontend.dto.LoaderDto;
import ru.lucky.finder.frontend.dto.ProfileFilters;
import ru.lucky.finder.frontend.dto.ProfileListDto;

public interface VkService {
    String initSearchData(ProfileFilters filters);

    ProfileListDto getProfileWithFilters(ProfileFilters filters);

    LoaderDto getLoaderInfo();

}
