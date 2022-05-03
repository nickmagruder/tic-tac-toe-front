import './App.css';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import io from 'socket.io-client';

import EnterName from './components/Login.jsx';
import SelectGame from './components/SelectGame.jsx';
import Game from './components/Game.jsx';

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const [gameState, setGameState] = useState({
    gameInProgress: false,
  });

  useEffect(() => {
    setSocket(io('http://localhost:3001/'));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  const register = (data) => {
    setGameState({ registered: data });
    console.log(data, 'DATA being registered');
  };

  return (
    <Container>
      {!gameState.gameInProgress ? (
        !gameState.registered ? (
          <header className="App-header">
            <h1>Tic Tac Toe</h1>
            {socketConnected ? (
              <EnterName
                socket={socket}
                register={register}
              />
            ) : (
              <p>Loading...</p>
            )}
          </header>
        ) : (
          <SelectGame socket={socket} />
        )
      ) : (
        <Game />
      )}
    </Container>
  );
}

export default App;
