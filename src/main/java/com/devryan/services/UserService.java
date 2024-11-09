package com.devryan.services;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User postUser (User user){
        return userRepository.save(user);
    }
    public User getUserById(Long id) { return userRepository.findById(id).orElse(null);}

    public User getUserByName(String name) { return userRepository.findByUsername(name);}
}
