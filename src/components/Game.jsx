import React /* , { useState, useEffect } */ from 'react';
import { Button } from 'react-bootstrap';

import './Game.css';

function Game({ socket, gameId, gameData }) {
  console.log(gameId, 'GAME gameData');
  console.log(gameData, 'GAME gameData');

  return (
    <div className="game-box">
      <div className="row">
        <div className="cell" id="1">
          <h2 className="xo">{gameData.playboard[1]}</h2>
        </div>
        <div className="cell" id="2">
          <h2 className="xo">{gameData.playboard[2]}</h2>
        </div>
        <div className="cell" id="3">
          <h2 className="xo">{gameData.playboard[3]}</h2>
        </div>
      </div>
      <div className="row">
        <div className="cell" id="4">
          <h2 className="xo">{gameData.playboard[4]}</h2>
        </div>
        <div className="cell" id="5">
          <h2 className="xo">{gameData.playboard[5]}</h2>
        </div>
        <div className="cell" id="6">
          <h2 className="xo">{gameData.playboard[6]}</h2>
        </div>
      </div>
      <div className="row">
        <div className="cell" id="7">
          <h2 className="xo">{gameData.playboard[7]}</h2>
        </div>
        <div className="cell" id="8">
          <h2 className="xo">{gameData.playboard[8]}</h2>
        </div>
        <div className="cell" id="9">
          <h2 className="xo">{gameData.playboard[9]}</h2>
        </div>
      </div>
    </div>
  );
}

export default Game;
