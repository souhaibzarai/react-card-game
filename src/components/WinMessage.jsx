const WinMessage = ({ moves, onReset }) => {
  return (
    <div className='game-box win-message'>
      <h2 className='congrats'>Congratulations!</h2>
      <p>You completed the game in <span>{moves} moves!</span></p>
      <button className='btn' onClick={onReset}>Restart the game!</button>
    </div>
  )
}
export default WinMessage