import Header from './components/Header'
import './App.css'
import { useState } from 'react'
import GameCard from './components/GameCard';
import { initialGameCards } from './data/data'

const shuffledArray = (array) => {
  const shuffled = [...array];
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled;
}


const App = () => {
  const generateCards = () => shuffledArray(initialGameCards).map((value, index) => {
    return {
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    };
  });
  const [cards, setCards] = useState(generateCards);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(null);
  const [flippedCardsId, setFlippedCardsId] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    setCards(generateCards);
    setIsLocked(false);
    setMoves(0);
    setScore(null);
    setFlippedCardsId([]);
  }

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked) return;
    setCards(prev => prev.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c;
      }
    }));

    const newFlippedCardsId = [...flippedCardsId, card.id]
    setFlippedCardsId(newFlippedCardsId);

    if (flippedCardsId.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCardsId[0]];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setCards(prev => prev.map(c => {
            if (firstCard.id === c.id || card.id === c.id) {
              return { ...c, isMatched: true };
            }
            else {
              return c;
            }
          }));
          setScore(s => s + 1);
          setFlippedCardsId([]);
          setIsLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(
            prev => prev.map(c => newFlippedCardsId.includes(c.id) ?
              { ...c, isFlipped: false } : c
            )
          );
          setFlippedCardsId([]);
          setIsLocked(false);
        }, 800);
      }
      setMoves(m => m + 1);
    }

  }

  return (
    <div className="game-dashboard">
      <Header moves={moves} score={score} onReset={initializeGame} />
      <div className="board">
        {cards.map((card) => {
          return <GameCard key={card.id} card={card} onClick={handleCardClick} />;
        })}
      </div>
    </div>
  )
}

export default App
