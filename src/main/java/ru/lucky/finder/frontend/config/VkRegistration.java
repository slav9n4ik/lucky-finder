package ru.lucky.finder.frontend.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix="spring.security.oauth2.client.registration.vk")
public class VkRegistration {
    private String clientId;
    private String clientSecret;
    private String authorizationGrantType;
    private String redirectUri;
}
