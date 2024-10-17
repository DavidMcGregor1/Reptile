package com.example.demo.Login;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    public LoginService(UsersRepository u) {
        repositoryUsers = u;
    }
    private UsersRepository repositoryUsers;

    public List<Users> getAllUsers() {
        System.out.println("hit get all users");
        return repositoryUsers.findAll();
    }

    public boolean checkUser(String username, String password) {
        Users user = repositoryUsers.findByUsername(username).orElse(null);
        if (user == null) {
            return false;
        }
        return user.getPassword().equals(password);
    }

    public void addUser(Users user) {
        repositoryUsers.save(user);
    }

    public boolean checkIfUserExists(String username) {
        return repositoryUsers.findByUsername(username).isPresent();
    }

}
