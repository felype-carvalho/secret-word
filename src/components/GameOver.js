import "./GameOver.css"

const GameOver = ({ restartGame, score, language }) => {
    return (
        <div>
            <h1 className="logo">Secret Word</h1>
            <h1>{language === "EN"? ("Game Over"): ("Fim de Jogo")}</h1>
            <h2>{language === "EN"? ("Your score was: "): ("A sua pontuação foi: ")}<span>{score}</span></h2>
            <button onClick={restartGame}>{language === "EN"? ("Restart Game"): ("Reiniciar Jogo")}</button>
        </div>
    )
}

export default GameOver