package ru.lucky.finder.frontend.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix="spring.security.oauth2.client.provider.vk")
public class VkProvider {
    private String tokenUri;
    private String authorizationUri;
    private String tokenName;
    private String authenticationScheme;
    private String clientAuthenticationScheme;
    private String usersGetUrl;
    private String scope;
    private String version;
}
