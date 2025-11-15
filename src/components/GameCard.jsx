import React from 'react'

const GameCard = ({ card, onClick }) => {
  return (
    <div className={`game-box card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`} onClick={() => onClick(card)}>
      <div className="card-front">?</div>
      <div className="card-back">{card.value}</div>
    </div>
  );
}

export default GameCard
