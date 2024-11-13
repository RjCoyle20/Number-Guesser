package com.devryan.controllers;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import com.devryan.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    //TODO Need to login somehow...
    @PostMapping("/")
    public ResponseEntity<?> processLoginForm(@RequestBody User user, Errors errors, HttpSession session){

        //Look up user in database using username they provided in the form
        User theUser = userService.getUserByName(user.getUsername());

        // Get the password the user supplied in the form
        String password = user.getPassword();

        System.out.println(user.getUsername());

        // Send user back to form if username does not exist OR if password hash doesn't match
        //TODO replace .getPwHash().equals(password) with a password matcher once encoded.
        if (theUser == null || !theUser.getPassword().equals(password)){
            errors.rejectValue(
                    "password",
                    "login.invalid",
                    "You're flagged! Have a glass of water and try again with valid credentials."
            );
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        //otherwise, set user in session
        session.setAttribute("user", theUser);
        System.out.println(session.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.add("User-ID", theUser.getUsername());

        return new ResponseEntity<>(theUser, HttpStatus.OK);
    }


    @PostMapping("/post")
    public User postUser(@RequestBody User user) {return userService.postUser(user);}

    //TODO add Patch and Delete user methods
}
