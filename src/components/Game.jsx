import React /* , { useState, useEffect } */ from 'react';

import './Game.css';

function Game({ socket, gameId, gameData }) {
  console.log(gameId, 'GAME gameData');
  console.log(gameData.player1, 'GAME gameData');
  console.log(gameData.player2, 'GAME gameData');
  return (
    <div>
      <h1>Socket</h1>
      <h1>gameID</h1>
    </div>
  );
}

export default Game;
