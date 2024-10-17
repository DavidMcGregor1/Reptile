package com.example.demo.Login;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoginService {

    public LoginService(UsersRepository u) {
        repositoryUsers = u;
    }
    private UsersRepository repositoryUsers;

    public SignUpResponseDto signup(String username, String password) {
        SignUpResponseDto response = new SignUpResponseDto();
        if (checkIfUserExists(username)) {
            response.success = false;
            response.setErrorType(Optional.of(ErrorType.USER_ALREADY_EXISTS));
            return response;
        }
        createNewUser(username, password);
        response.success = true;
        response.setErrorType(Optional.empty());
        return response;
    }

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

    public void createNewUser(String username, String password) {
        Users user = new Users(username, password);
        repositoryUsers.save(user);
    }

    public boolean checkIfUserExists(String username) {
        return repositoryUsers.findByUsername(username).isPresent();
    }
}
