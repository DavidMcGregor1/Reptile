package com.example.demo.Login;

import com.example.demo.Repositories.Users;
import com.example.demo.Repositories.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    public LoginService(UsersRepository u) {
        repositoryUsers = u;
    }
    private UsersRepository repositoryUsers;

    public List<Users> getAllUsers() {
        return repositoryUsers.findAll();
    }

    public boolean checkUser(String username, String password) {
        Users user = repositoryUsers.findByUsername(username).orElse(null);
        if (user == null) {
            return false;
        }
        return user.getPassword().equals(password);
    }

}
