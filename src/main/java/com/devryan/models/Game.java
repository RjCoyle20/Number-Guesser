package com.devryan.models;

import jakarta.persistence.*;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn()
    private User user;

    private Integer kGuesses;

    //May not need this in backend.
    private Integer targetNumber;

    private Integer guessTotal;

    private boolean isSuccessful;

    public Game() {}

    public Game(User user, Integer kGuesses, Integer targetNumber, Integer guessTotal, boolean isSuccessful) {
        this.user = user;
        this.kGuesses = kGuesses;
        this.targetNumber = targetNumber;
        this.guessTotal = guessTotal;
        this.isSuccessful = isSuccessful;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getkGuesses() {
        return kGuesses;
    }

    public void setkGuesses(Integer kGuesses) {
        this.kGuesses = kGuesses;
    }

    public Integer getTargetNumber() {
        return targetNumber;
    }

    public void setTargetNumber(Integer targetNumber) {
        this.targetNumber = targetNumber;
    }

    public Integer getGuessTotal() {
        return guessTotal;
    }

    public void setGuessTotal(Integer guessTotal) {
        this.guessTotal = guessTotal;
    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public void setSuccessful(boolean successful) {
        isSuccessful = successful;
    }
}
