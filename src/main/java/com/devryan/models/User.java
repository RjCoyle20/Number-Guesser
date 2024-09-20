package com.devryan.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Userid;

    private String username;

    private String pwHash;
    @OneToMany
    private List<Game> games;

    public User() {}

    //TODO replace pwHash with encoder
    public User(Integer userid, String username, String password) {
        Userid = userid;
        this.username = username;
        this.pwHash = pwHash;
    }

    public Integer getUserid() {
        return Userid;
    }

    public void setUserid(Integer userid) {
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

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

}
