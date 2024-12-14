package com.devryan.data;

import com.devryan.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {



    List<Game> getGamesById(Long userId);

    List<Game> findByUsername(String username);
}
