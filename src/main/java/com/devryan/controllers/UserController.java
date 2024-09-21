package com.devryan.controllers;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

//    @Autowired
//    private UserRepository userRepository;

    @GetMapping("/display")
    public List<User> getUser(){ return }

}
