package com.devryan.controllers;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import com.devryan.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

//    @Autowired
//    private UserRepository userRepository;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id){
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/post")
    public User postUser(@RequestBody User user) {return userService.postUser(user);}
}
