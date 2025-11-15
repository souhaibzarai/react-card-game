import Header from './components/Header'
import './App.css'
import { useState } from 'react'
import GameCard from './components/GameCard';

const initialGameCards = [
  '🍍',
  '🍈',
  '🍉',
  '🍋‍🟩',
  '🍌',
  '🍊',
  '🍋‍🟩',
  '🍍',
  '🍇',
  '🍌',
  '🍈',
  '🍇',
  '🍋',
  '🍊',
  '🍉',
  '🍋',
];

const App = () => {
  // // eslint-disable-next-line
  const [cards, setCards] = useState(initialGameCards.map((card, index) => {
    return {
      id: index,
      value: card,
      isFlipped: false,
      isMatched: false,
    };
  }));
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(null);
  const [flippedCardsId, setFlippedCardsId] = useState([]);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched) return;
    setMoves(prev => prev + 1);
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c;
      }
    });
    setCards(newCards);

    const newFlippedCardsId = [...flippedCardsId, card.id]
    setFlippedCardsId(newFlippedCardsId);

    if (flippedCardsId.length === 1) {
      const firstCard = cards[flippedCardsId];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setScore(prev => prev + 1);

          setCards(prev => prev.map(c => {
            if (firstCard.id === c.id || card.id === c.id) {
              return { ...c, isMatched: true };
            }
            else {
              return c;
            }
          }));
          
          setFlippedCardsId([]);
        }, 400);
      } else {
        const flippedBackCards = newCards.map(c => {
          if (newFlippedCardsId.includes(c.id) || card.id === c.id) {
            return { ...c, isFlipped: false }
          }
          else {
            return c;
          }
        });
        setTimeout(() => {
          setCards(flippedBackCards);
          setFlippedCardsId([]);
        }, 700);
      }

    }

  }

  return (
    <div className="game-dashboard">
      <Header moves={moves} score={score} />
      <div className="board">
        {cards.map((card) => {
          return <GameCard key={card.id} card={card} onClick={handleCardClick} />;
        })}
      </div>
    </div>
  )
}

export default App
