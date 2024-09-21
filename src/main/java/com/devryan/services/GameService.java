package com.devryan.services;

import com.devryan.data.GameRepository;
import com.devryan.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Optional<Game> getGamesById(Long userId) { return gameRepository.findById(userId);}

    public Game getGameById(Long id) { return gameRepository.findById(id).orElse(null); }

    public Game postGame(Game game){
        return gameRepository.save(game);
    }
}
