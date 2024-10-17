package com.example.demo.Login;

import io.jsonwebtoken.security.Keys;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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


    @GetMapping("/getAllUsers")
    @ResponseBody
    public List<Users> fds() {
        System.out.println("hit endpoinbt");
        return loginService.getAllUsers();
    }

    @PostMapping("/signup")
    @ResponseBody
    public SignUpResponseDto signup(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password) {

        return loginService.signup(username, password);

//        SignUpResponseDto response = new SignUpResponseDto();
//
//        if (loginService.checkIfUserExists(username)) {
//            response.success = false;
//            response.setErrorType(Optional.of(ErrorType.USER_ALREADY_EXISTS));
//            return response;
//        }
//
//        loginService.createNewUser(username, password);
//
//        response.success = true;
//        response.setErrorType(Optional.empty());
//
//        return response;
    }

    @GetMapping("/accountCreated")
    public String accountCreated() {
        return "AccountCreated";
    }

    @PostMapping("/login")
    @ResponseBody
    public String login(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password) {
        System.out.println("username: " + username);
        System.out.println("password: " + password);

        if (loginService.checkUser(username, password)) {
            return "success";
        } else {
            return "fail";
        }
    }
}
