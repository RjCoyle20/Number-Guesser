package com.devryan.models;

import jakarta.persistence.*;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private Long kGuesses;

    //May not need this in backend.
    private Long targetNumber;

    private Long guessTotal;

    private boolean isSuccessful;

    private Long userId;

    private String username;

    public Game() {}

    public Game(User user, Long kGuesses, Long targetNumber, Long guessTotal, boolean isSuccessful, Long userId, String username) {
        this.user = user;
        this.kGuesses = kGuesses;
        this.targetNumber = targetNumber;
        this.guessTotal = guessTotal;
        this.isSuccessful = isSuccessful;
        this.userId = userId;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getkGuesses() {
        return kGuesses;
    }

    public void setkGuesses(Long kGuesses) {
        this.kGuesses = kGuesses;
    }

    public Long getTargetNumber() {
        return targetNumber;
    }

    public void setTargetNumber(Long targetNumber) {
        this.targetNumber = targetNumber;
    }

    public Long getGuessTotal() {
        return guessTotal;
    }

    public void setGuessTotal(Long guessTotal) {
        this.guessTotal = guessTotal;
    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public void setSuccessful(boolean successful) {
        isSuccessful = successful;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
