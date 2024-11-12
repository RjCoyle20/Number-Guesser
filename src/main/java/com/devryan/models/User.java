package com.devryan.models;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Userid;

    private String username;

    private String pwHash;
    @OneToMany
    private List<Game> games;

    public User() {}

    public User(Long userid, String username, String password) {
        Userid = userid;
        this.username = username;
        this.pwHash = encoder.encode(password);
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

    public String getPwHash() {
        return pwHash;
    }

    private static final BCryptPasswordEncoder encoder= new BCryptPasswordEncoder();
    public boolean isMatchingPassword(String password){ return encoder.matches(password,pwHash);}

}
