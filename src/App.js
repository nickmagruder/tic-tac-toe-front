import './App.css';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import io from 'socket.io-client';

import EnterName from './components/login.jsx';

function App() {
  const [state, setData] = useState({
    server: 'http://localhost:3001/',
  });
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

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

  const handleSocket = () => {
    if (socketConnected) socket.disconnect();
    else {
      socket.connect();
    }
  };

  const register = (data) => {
    setData({ registered: data });
  };

  return (
    <Container>
      {socketConnected ? (
        <EnterName
          socket={socket}
          register={register}
          handleSocket={handleSocket}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default App;
