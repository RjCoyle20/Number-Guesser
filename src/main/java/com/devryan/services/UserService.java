package com.devryan.services;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User postUser (User user){
        return userRepository.save(user);
    }
    public User getUserById(Integer id) { return userRepository.findById(id).orElse(null);}

}
