package ru.lucky.finder.frontend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.lucky.finder.frontend.config.UserInfo;

import java.util.Collections;
import java.util.Map;

@RestController
public class UserController {
    @GetMapping("/user")
    public Map<String, Object> user() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        UserInfo info = (UserInfo) auth.getPrincipal();
        return Collections.singletonMap("auth", info.getToken() != null);
    }

    @GetMapping("/logout")
    public String logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return "OK";
    }
}
