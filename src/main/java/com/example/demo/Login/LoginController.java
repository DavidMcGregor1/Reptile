package com.example.demo.Login;

import com.example.demo.Repositories.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class LoginController {

    private final LoginService loginService;
    private final SecretKey secretKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    };

    @GetMapping("/loginPage")
    public String login() {
        return "LoginPage";
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();
        if (loginService.checkUser(username, password)) {
            String jwt = generateJWT(username);
            response.put("token", jwt);
            response.put("status", "success");
        } else {
            response.put("status", "failure");
            response.put("message", "Invalid username or password");
        }
        return response;
    }

    private String generateJWT(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);

        Date expiration = new Date(System.currentTimeMillis() + 3600 * 1000); // 1 hour expiration

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expiration)
                .signWith(secretKey)
                .compact();
    }

}
