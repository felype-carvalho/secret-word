//CSS
import "./Game.css"

//React
import { useState, useRef } from "react";

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
    language
}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);

        setLetter("");

        letterInputRef.current.focus();
    }

    return (
        <div className="game">
            <h1 className="logo">Secret Word</h1>
            <p className="points">
                <span>{language === "EN" ? ("Score") : ("Pontuação:")} {score}</span>
            </p>
            <h1>{language === "EN" ? ("Guess the word:") : ("Adivinhe a palavra: ")}</h1>
            <h3 className="tip">
                {language === "EN" ? ("Tip on the word: ") : ("Dica sobre a palavra: ")} <span>{pickedCategory}</span>
            </h3>
            <p>{language === "EN" ? ("You still have " + guesses + " attempts") : ("Você ainda tem " + guesses + " tentativas")}</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
                {/* <span className="letter">A</span>
                <span className="blankSquare"></span> */}
            </div>
            <div className="letterContainer">
                <p>{language === "EN"? ("Try to guess a letter of the word: "): ("Tente advinhar uma letra da palavra: ")}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength="1"
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>{language === "EN"? ("Play"): ("Jogar")}</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>{language === "EN"? ("Letters already used: "): ("Letras já utilizadas: ")}</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter.toUpperCase()}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game