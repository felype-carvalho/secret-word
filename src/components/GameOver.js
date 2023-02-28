import "./GameOver.css"

const GameOver = ({ restartGame }) => {
    return (
        <div>
            <h1>Game Over</h1>
            <button onClick={restartGame}>Resetar Jogo</button>
        </div>
    )
}

export default GameOver