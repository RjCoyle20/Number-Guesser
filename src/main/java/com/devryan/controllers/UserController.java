package com.devryan.controllers;

import com.devryan.data.UserRepository;
import com.devryan.models.User;
import com.devryan.services.GameService;
import com.devryan.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final GameService gameService;
    public UserController(UserService userService, GameService gameService) {
        this.userService = userService;
        this.gameService = gameService;
    }



    @GetMapping("/{username}")
    public ResponseEntity<?> getGamesByUsername(@PathVariable String username){
        User user = userService.getUserByName(username);
        if (user == null) return ResponseEntity.notFound().build();
        return new ResponseEntity<>(gameService.getGamesById(username), HttpStatus.OK);
    }


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
    public ResponseEntity<?> postUser(@RequestBody User user, Errors errors) {

        //Look up user in database using username they provided in the form
        User existingUser = userService.getUserByName(user.getUsername());

        //Send user back to form if username already exists
        if (existingUser != null) {
            errors.rejectValue("username", "username.alreadyExists", "A user with tha username already exists");
            System.out.println("username already in use");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(user);
        } else {
            //otherwise, save new user info in database
            //TODO hash this password

            User newUser = new User(user.getUsername(), user.getPassword());
            userService.postUser(newUser);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }


    }

    //TODO add Patch and Delete user methods
}
