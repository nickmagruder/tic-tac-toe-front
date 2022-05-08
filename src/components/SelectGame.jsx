import React, { useState, useEffect, } from 'react';
import { ListGroup } from 'react-bootstrap';

import './SelectGame.css';

function SelectGame({ socket, startGame }) {
  const [players, setPlayers] = useState({
    players: [],
  });

  useEffect(() => {
    socket.on('getResponse', (data) => {
      setPlayers({ players: data });
    });
  }, [socket]);

  useEffect(() => {
    socket.emit('getPlayers', {});
    console.log(socket.id, 'getPlayers socket.id');
  }, [socket]);

  useEffect(() => {
    socket.on('newOpponent', (data) => {
      setPlayers({
        players: [...players.players, data],
      });
      console.log(socket.id, 'newOpponent socket.id');
    });
  });

  const selectOpponent = (index) => {
    socket.emit('selectPlayer', {
      id: players.players[index].id,
    });
    console.log(socket.id, 'selectOpponent socket.id');
  };

  useEffect(() => {
    socket.on('connectOpponent', (data) => {
      if (socket.id === data.opponentID) {
        socket.emit('opponentConnected', data);
        startGame(data);
      }
      console.log(socket.id, 'connectOpponent socket.id');
    });
  });

  useEffect(() => {
    socket.on('gameStarted', (data) => {
      startGame(data);
      console.log(socket.id, 'gameStart socket.id');
    });
  });

  return (
    <div>
      <h1>Select Your Opponent</h1>
      <ListGroup onSelect={selectOpponent}>
        {players.players.map(function (opponent, index) {
          return (
            <ListGroup.Item
              action={true}
              className="opponent-item"
              key={index}
              eventKey={index}
            >
              {opponent.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default SelectGame;
