package com.example.demo.Login;

import com.example.demo.Repositories.Users;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class LoginController {

    LoginService loginService;

    @GetMapping("/login")
    public String login() {
        return "LoginPage";
    }

    @GetMapping("/getAllUsers")
    @ResponseBody
    public List<Users> getAllUsers() {
        return loginService.getAllUsers();
    }

}
