import React, { useState, useEffect } from 'react';
import { Stack, Container, Row, Col, Button } from 'react-bootstrap';

import './Game.css';

function Game({ socket, gameId, gameData, setGameState }) {
  const [newGameState, setNewGameState] = useState({ ...gameData });

  // console.log(gameId, 'GAME gameId');
  // console.log(gameData, 'GAME gameData');
  // console.log(socket, 'SOCKET');
  const currentTurn = gameData.currentTurn;
  const currentTurnPlayer = gameData[currentTurn].userName;
  const mySocketId = socket.id;
  const myself = gameData[mySocketId].userName;
  const currentTurnPlayerTeam = gameData[mySocketId].sign;
  const playboard = newGameState.playboard;

  function selectCell(e) {
    const value = e.target.name;
    const newGameData = { ...newGameState };
    newGameData.playboard[value] = currentTurnPlayerTeam;
    const newPlayboard = newGameData.playboard;
    console.log(newPlayboard, 'newplayBoard');
    console.log(e.target.name, 'e.target.name');

    setNewGameState({
    });
    socket.emit('selectCell', {
      playboard: newPlayboard,
      playerSocket: socket.id,
      gameId: gameId,
    });
  }

  return (
    <Container fluid className="game-container">
      <h3>Hi {myself}! Let's play some tic-tac-toe!</h3>
      <p>Current Player's Move: {currentTurnPlayer}</p>
      <Row className="game-row">
        <Col className="game-col">
          <Button
            key={1}
            name={'1'}
            value={gameData.playboard[1]}
            type="submit"
            variant="primary"
            size="lg"
            className="game-button"
            onClick={selectCell}
          >
            {gameData.playboard[1]}
          </Button>
        </Col>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={2}
        >
          {gameData.playboard[2]}
        </Button>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={3}
        >
          {gameData.playboard[3]}
        </Button>
      </Row>
      <Row className="game-row">
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={4}
        >
          {gameData.playboard[4]}
        </Button>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={5}
        >
          {gameData.playboard[5]}
        </Button>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={6}
        >
          {gameData.playboard[6]}
        </Button>
      </Row>
      <Row className="game-row">
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={7}
        >
          {gameData.playboard[7]}
        </Button>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          key={8}
        >
          {gameData.playboard[8]}
        </Button>
        <Button
          as={Col}
          variant="primary"
          size="lg"
          className="game-button"
          id={9}
        >
          {gameData.playboard[9]}
        </Button>
      </Row>
    </Container>
  );
}

export default Game;
