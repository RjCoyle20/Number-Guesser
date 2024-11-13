package com.devryan.models;

import jakarta.persistence.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long UserId;

    private String username;

    // TODO replace password with a secure password.
    private String password;
    @OneToMany
    private List<Game> games;

    public User() {}

    public User(Long userId, String username, String password) {
        UserId = userId;
        this.username = username;
        this.password = password;
    }

    public Long getUserid() {
        return UserId;
    }

    public void setUserid(Long userid) {
        UserId = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {this.password = password;}

}
