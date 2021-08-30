package ru.lucky.finder.frontend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.lucky.finder.frontend.config.UserInfo;
import ru.lucky.finder.frontend.config.VkProvider;
import ru.lucky.finder.frontend.dto.*;
import ru.lucky.finder.frontend.service.VkService;
import ru.lucky.finder.frontend.template.TemplateParser;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static java.lang.String.join;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.web.util.UriComponentsBuilder.fromHttpUrl;

@Slf4j
@Service
@RequiredArgsConstructor
public class VkServiceImpl implements VkService {
    private final RestTemplate vkClient;
    private final VkProvider provider;
    private final TemplateParser templateParser;

    private ConcurrentLinkedQueue<ProfileDto> buffer = new ConcurrentLinkedQueue<>();
    private final AtomicInteger total = new AtomicInteger(0);

    @Override
    public String initSearchData(ProfileFilters filters) {
        initData(filters);
        return "OK";
    }

    @Override
    public ProfileListDto getProfileWithFilters(ProfileFilters filters) {
        if (buffer.size() == 0) initSearchData(filters);
        List<ProfileDto> result = new ArrayList<>(buffer);
        if (filters.getInstagram()) result.removeIf(dto -> dto.getInstagram() == null);
        if (filters.getRelation()) result.removeIf(dto -> dto.getRelation() == null);
        if (filters.getRelatives()) result.removeIf(dto -> dto.getRelatives() == null || dto.getRelatives().isEmpty());
        return new ProfileListDto(result.size(), result);
    }

    @Override
    public LoaderDto getLoaderInfo() {
        return new LoaderDto(buffer.size(), total.get());
    }

    private void initData(ProfileFilters filters) {
        if (total.get() == buffer.size()) {
            if (buffer.size() != 0) buffer = new ConcurrentLinkedQueue<>();
            var result = partOfQuery(filters);
            total.addAndGet(result.getTotal());
            buffer.addAll(result.getProfiles());
            log.info("Total size: {}", total);
            log.info("Buffer size: {}", buffer.size());

            if (filters.getCount() < total.get()) {
                var offset = filters.getOffset();
                var prevTotal = result.getProfiles().size();

                while (buffer.size() < total.get()) {
                    filters.setOffset(offset + filters.getCount());
                    buffer.addAll(partOfQuery(filters).getProfiles());
                    sleep(500);
                    var size = buffer.size();
                    if (prevTotal == size) break;
                    prevTotal = size;
                    log.info("Total size: {}", total);
                    log.info("Result size: {}", size);
                }
            }

            resultProcessing();
            log.info("TOTAL: {}", buffer.size());
        } else {
            log.warn("Буффер загружается!");
        }
    }

    private void resultProcessing() {
       buffer = buffer.stream()
               .distinct()
               .filter(profile -> !profile.getIsClosed() && profile.getCanAccessClosed() && profile.getHasPhoto() >= 1)
               .collect(Collectors.toCollection(ConcurrentLinkedQueue::new));
       total.set(buffer.size());
    }

    private ProfileListDto partOfQuery(ProfileFilters filters) {
        log.info("Запрос в VK API. Получение пользователей по фильтрам {}", filters);
        var response = vkClient.exchange(buildUrlForGetProfiles(filters), GET,
                new HttpEntity<>(null, buildHeaderWithToken()), VkResponseDto.class);

        if (response.getBody().getError() != null) {
            log.error("Error: {}", response.getBody().getError());
            throw new RuntimeException();
        }

        return response.getBody().getResponse();
    }

    private URI buildUrlForGetProfiles(ProfileFilters filters) {
        return fromHttpUrl(provider.getVkUrl() + "/execute")
                .queryParam("v", provider.getVersion())
                .queryParam("code", generateCodeQueryForGetProfilesByFilters(filters))
                .build()
                .toUri();
    }

    private String generateCodeQueryForGetProfilesByFilters(ProfileFilters filters) {
        return templateParser.prepareQuery("search/SearchAndGetProfiles.js.ftl",
                Map.of(
                "sex", filters.getSex(),
                "status", filters.getStatus(),
                "sort", filters.getSort(),
                "has_photo", filters.getHasPhoto(),
                "count", filters.getCount(),
                "offset", filters.getOffset(),
                "birth_day", filters.getBirthDay(),
                "birth_month", filters.getBirthMonth(),
                "searchFields", join(",", filters.getSearchFields()),
                "getUserFields", join(",", filters.getGetUserFields())
                )
        );
    }

    private HttpHeaders buildHeaderWithToken() {
        var headers = new HttpHeaders();

        var auth = SecurityContextHolder.getContext().getAuthentication();
        UserInfo info = (UserInfo) auth.getPrincipal();
        if (info == null) {
            SecurityContextHolder.getContext().setAuthentication(null);
            return headers;
        }
        headers.setBearerAuth(info.getToken());
        return headers;
    }

    private void sleep(int mSec) {
        try {
            Thread.sleep(mSec);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
