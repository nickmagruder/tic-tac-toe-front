import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import io from 'socket.io-client';

import Login from './components/Login.jsx';
import SelectGame from './components/SelectGame.jsx';
import Game from './components/Game.jsx';

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const [gameState, setGameState] = useState({
    registered: null,
    gameInProgress: false,
    gameId: null,
    gameData: null,
  });

  // Production URL:
  useEffect(() => {
    setSocket(io('https://tic-tac-toe-two-point-o.herokuapp.com/'));
  }, []);

  // DEV URL:
/*   useEffect(() => {
    setSocket(io('http://localhost:3001/'));
  }, []); */

  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  const register = (data) => {
    setGameState({ registered: data });
  };

  const startGame = (data) => {
    setGameState({
      gameInProgress: data.status,
      gameId: data.gameId,
      gameData: data.gameData,
    });
    console.log(data, 'startGame Data');
  };

  return (
    <Container fluid>
      {!gameState.gameInProgress ? (
        !gameState.registered ? (
          <Stack className="login">
            <h1>Tic Tac Toe</h1>
            {socketConnected ? (
              <Login socket={socket} register={register} />
            ) : (
              <p>Loading...</p>
            )}
          </Stack>
        ) : (
          <SelectGame socket={socket} startGame={startGame} />
        )
      ) : (
        <Game
          socket={socket}
          myself={gameState.clientId}
          gameId={gameState.gameId}
          gameData={gameState.gameData}
          setGameState={setGameState}
        />
      )}
    </Container>
  );
}

export default App;
