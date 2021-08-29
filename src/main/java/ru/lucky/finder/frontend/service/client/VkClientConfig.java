package ru.lucky.finder.frontend.service.client;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import static java.time.Duration.ofMillis;

@Configuration
public class VkClientConfig {

    @Bean
    public RestTemplate vkClient(RestTemplateBuilder builder) {
        return builder
                .defaultHeader("Accept", "application/json")
                .defaultHeader("Content-Type", "application/json")
                .setConnectTimeout(ofMillis(3000))
                .setReadTimeout(ofMillis(3000))
                .build();
    }
}
