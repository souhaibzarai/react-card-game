import Header from './components/Header'
import './App.css'
import GameCard from './components/GameCard';
import { initialGameCards } from './data/data'
import WinMessage from './components/WinMessage';
import { useGameLogic } from './hooks/useGameLogic';

const App = () => {

  const [cards, moves, score, handleCardClick, initializeGame] =
    useGameLogic(initialGameCards)

  return (
    <div className="game-dashboard">
      <Header moves={moves} score={score} onReset={initializeGame} />
      {score === initialGameCards.length / 2 && <WinMessage moves={moves} onReset={initializeGame} />}
      <div className="board">
        {cards.map((card) => {
          return <GameCard key={card.id} card={card} onClick={handleCardClick} />;
        })}
      </div>
    </div>
  )
}

export default App
