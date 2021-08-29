package ru.lucky.finder.frontend.service;

public interface AuthService {
    String getAuthURL();
    void auth(String code);
}
