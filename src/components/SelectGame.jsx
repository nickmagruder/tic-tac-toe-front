import React, { useState, useEffect } from 'react';
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
  }, [socket]);

  useEffect(() => {
    socket.on('newOpponent', (data) => {
      setPlayers({
        players: [...players.players, data],
      });
      console.log(players, 'PLAYERS');
    });
  });

  const selectOpponent = (index) => {
    socket.emit('selectOpponent', {
      id: players.players[index].id,
    });
    console.log(players.players[index].id, 'players.players');
  };

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
