package com.devryan.controllers;

import com.devryan.models.Game;
import com.devryan.services.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/game")
//TODO if possible, delete CrossOrigin for security's sake
@CrossOrigin("*")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }
//TODO doubtful this will work, but getALl was also not working. Need to dive deeper into relational database set up.
    @GetMapping("/all/{id}")
    public Optional<Game> getAllGames(@PathVariable Long userId) { return gameService.getGamesById(userId); }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGameById (@PathVariable Long id){
        Game game = gameService.getGameById(id);
        if(game == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(game);
    }

    @PostMapping("/post")
    public Game postGame (@RequestBody Game game) { return gameService.postGame(game); }
}
