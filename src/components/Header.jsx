import React from 'react'

const Header = ({ moves, score }) => {
  const congratulations = score === 8 && moves < 18;
  return (
    <div className='game-box header'>
      {congratulations && <div className='congrats'>You've Got Perfect Score</div>}
      <h2 className="title">Memory Card Game</h2>
      <div className="stats">
        <p className="score">
          Score: <span>{score ?? '-'}</span>
        </p>
        <p className="moves">
          Moves: <span>{moves}</span>
        </p>
      </div>
    </div>
  );
}

export default Header
