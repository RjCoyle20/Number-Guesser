package com.devryan.models;

import jakarta.persistence.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Userid;

    private String username;

    // TODO replace password with a secure password.
    private String password;
    @OneToMany
    private List<Game> games;

    public User() {}

    public User(Long userid, String username, String password) {
        Userid = userid;
        this.username = username;
        this.password = password;
    }

    public Long getUserid() {
        return Userid;
    }

    public void setUserid(Long userid) {
        Userid = userid;
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
