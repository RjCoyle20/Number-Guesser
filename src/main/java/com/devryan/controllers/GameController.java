package com.devryan.controllers;

import com.devryan.models.Game;
import com.devryan.services.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/game")
//TODO if possible, delete CrossOrigin for security's sake
@CrossOrigin("*")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/all")
    public List<Game> getAllGames() { return gameService.getAllGames(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGameById (@PathVariable Integer id){
        Game game = gameService.getGameById(id);
        if(game == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(game);
    }

    @PostMapping("/post")
    public Game postGame (@RequestBody Game game) { return gameService.postGame(game); }
}
