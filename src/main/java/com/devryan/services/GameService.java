package com.devryan.services;

import com.devryan.data.GameRepository;
import com.devryan.models.Game;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getAllGames () { return gameRepository.findAll();}

    public Game getGameById(Integer id) { return gameRepository.findById(id).orElse(null); }
}
