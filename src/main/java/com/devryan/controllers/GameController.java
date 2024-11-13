package com.devryan.controllers;

import com.devryan.models.Game;
import com.devryan.models.User;
import com.devryan.services.GameService;
import com.devryan.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/game")
//TODO if possible, delete CrossOrigin for security's sake
@CrossOrigin("*")
public class GameController {

    private final GameService gameService;

    private final UserService userService;

    public GameController(GameService gameService, UserService userService) {
        this.gameService = gameService;
        this.userService = userService;
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
    public ResponseEntity<?> newGame (@RequestBody Game game, Errors errors, HttpServletRequest request) {

        // Get username from Game, then get userId from Game service
        User user = userService.getUserByName(game.getUsername());
        Long userId = user.getUserid();

        Game newGame = new Game(user, game.getkGuesses(), game.getTargetNumber(), game.getGuessTotal(),  game.isSuccessful(), user.getUserid(), game.getUsername());

        gameService.postGame(game);
        return new ResponseEntity<>(game, HttpStatus.OK); }
}
