package ru.lucky.finder.frontend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.lucky.finder.frontend.service.AuthService;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @GetMapping("/auth-vk")
    public String vkAuth(@RequestParam(value = "code", required = false) String code) {
        log.info("AuthController, request to /auth-vk");
        if (code == null) {
            return "redirect:" + authService.getAuthURL();
        }
        authService.auth(code);
        return "redirect:/";
    }
}
