package ru.lucky.finder.frontend.service.impl;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.nimbusds.jose.shaded.json.parser.JSONParser;
import com.nimbusds.jose.shaded.json.parser.ParseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.lucky.finder.frontend.config.UserInfo;
import ru.lucky.finder.frontend.config.VkProvider;
import ru.lucky.finder.frontend.config.VkRegistration;
import ru.lucky.finder.frontend.service.AuthService;

import java.util.HashMap;
import java.util.Map;

import static java.util.List.of;

@Slf4j
@Service
@Getter
@Setter
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final VkRegistration registration;
    private final VkProvider provider;

    @Override
    public String getAuthURL() {
        return provider.getAuthorizationUri() + "?"
                + "client_id=" + registration.getClientId()
                + "&redirect_uri=" + registration.getRedirectUri()
                + "&scope=" + provider.getScope()
                + "&response_type=code";
    }

    @Override
    public void auth(String code) {
        String responseUrl = getAuthResponseURL(code);
        Map<String, String> userData = getUserData(responseUrl);
        log.info("userData1: {}", userData);
        login(userData);
    }

    private String getAuthResponseURL(String code) {
        return provider.getTokenUri() + "?"
                + "client_id=" + registration.getClientId()
                + "&client_secret=" + registration.getClientSecret()
                + "&redirect_uri=" + registration.getRedirectUri()
                + "&code=" + code;
    }

    private void login(Map<String, String> data) {
        var user = new UserInfo(data.get("user_id"), data.get("access_token"));
        SecurityContextHolder.getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken(user, null, of()));
    }

    private Map<String, String> getUserData(String authResponseUrl) {
        Map<String, String> userData = new HashMap<>();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(authResponseUrl, String.class);
        Object obj = null;
        try {
            obj = new JSONParser().parse(responseEntity.getBody());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = (JSONObject) obj;
        userData.put("access_token", (String) jsonObject.get("access_token"));
        userData.put("user_id", jsonObject.get("user_id").toString());
        userData.put("email", (String) jsonObject.get("email"));
        return userData;
    }
}
