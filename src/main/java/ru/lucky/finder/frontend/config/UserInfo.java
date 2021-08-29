package ru.lucky.finder.frontend.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.Principal;

@Getter
@AllArgsConstructor
public class UserInfo implements Principal {
    private final String id;
    private final String token;

    @Override
    public String getName() {
        return id;
    }
}
