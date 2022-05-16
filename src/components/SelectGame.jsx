import React, { useState, useEffect } from 'react';
import { Stack, ListGroup } from 'react-bootstrap';

import './SelectGame.css';

function SelectGame({ socket, startGame }) {
  const [players, setPlayers] = useState({
    players: [],
  });

  const selectOpponent = (index) => {
    socket.emit('selectPlayer', {
      id: players.players[index].id,
    });
  };

  useEffect(() => {
    socket.on('getResponse', (data) => {
      setPlayers({ players: data });
    });
  }, [socket]);

  useEffect(() => {
    socket.emit('getPlayers', {});
  }, [socket]);

  // TODO: solve duplicate players
  useEffect(() => {
    socket.on('newOpponent', (data) => {
      setPlayers({
        players: [...players.players, data],
      });
    });
  });

  useEffect(() => {
    socket.on('gameStarted', (data) => {
      console.log('connectOpponent data', data);
      console.log(
        'socket.id & data.opponentID',
        socket.id,
        data.gameData.player1,
        data.gameData.player2
      );
      if (
        socket.id === data.gameData.player1 ||
        socket.id === data.gameData.player2
      ) {
        startGame(data);
      }
    });
  });

  // TODO: some players not being removed(probably a state update issue)
  useEffect(() => {
    socket.on('excludePlayers', (data) => {
      // console.log(data, 'excludePlayers Data');
      // console.log(players.players, 'players.players BEFORE');
      const playersExclusion = players.players;
      // console.log(playersExclusion, 'playersExclusion before');
      for (let i = 0; i < playersExclusion.length; i++) {
        if (playersExclusion[i].id === data.one || data.two) {
          /*           console.log(players.players[i].id, 'players.players[i].id');
          console.log(data.one, 'data.one');
          console.log(data.two, 'data.two'); */
          playersExclusion.splice(i, 1);
        }
        // console.log(playersExclusion, 'playersExclusion after');
        setPlayers({ players: playersExclusion });
        // console.log(players.players, 'players.players after');
      }
    });
  });

  return (
    <Stack className="select-game">
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
    </Stack>
  );
}

export default SelectGame;
