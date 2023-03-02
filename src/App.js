//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordsListEG } from './data/words';
import { wordsListPT } from './data/words';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" }
];

const guessesQty = 5;

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words, setWords] = useState(wordsListEG);
    const [language, setLanguage] = useState("EN");

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(guessesQty);
    const [score, setScore] = useState(0);

    const changeLanguage = (lang) => {
        // change languege word list
        if (lang === "EN") {
            setWords(wordsListEG);
        } else {
            setWords(wordsListPT);
        }

        setLanguage(lang);
    }

    const pickWordAndCategory = useCallback(() => {
        // pick a random category
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

        // pick a random word
        const word = words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category }
    }, [words]);

    // starts the secret word game
    const startGame = useCallback(() => {
        // clear all letters
        clearLetterStates();

        //pick word and pick category
        const { word, category } = pickWordAndCategory();

        // create an array of letters
        let wordLettlers = word.split("");

        wordLettlers = wordLettlers.map((l) => l.toLowerCase());

        // fill states
        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLettlers);

        setGameStage(stages[1].name);
    }, [pickWordAndCategory]);

    // process the letter input
    const verifyLetter = (letter) => {

        const normalizedLetter = letter.toLowerCase();

        //check if letter has already been utilized
        if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
            return;
        };

        //push guessed letter or remove a gues

        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                normalizedLetter
            ]);
        } else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter
            ]);

            setGuesses((actualGuesses) => actualGuesses - 1);
        };
    };

    const clearLetterStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    }

    //check if guesses ended
    useEffect(() => {
        if (guesses <= 0) {
            //reset all stages
            clearLetterStates();

            setGameStage(stages[2].name);
        }
    }, [guesses]);

    // check win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];

        // win condition
        if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length !== 0) {
            // add score
            setScore((actualScore) => (actualScore += 100));

            setTimeout(function () {
                startGame();
            }, 1000);
        };
    }, [guessedLetters, letters, startGame]);

    // restarts the game
    const restartGame = () => {
        setScore(0);
        setGuesses(guessesQty);

        setGameStage(stages[0].name);
    }

    return (
        <div className="App">
            {gameStage === 'start' && (
                <StartScreen
                    startGame={startGame}
                    language={language}
                    changeLanguage={changeLanguage}
                />)}
            {gameStage === 'game' && (
                <Game
                    verifyLetter={verifyLetter}
                    pickedWord={pickedWord}
                    pickedCategory={pickedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                    language={language}
                />
            )}
            {gameStage === 'end' && (
                <GameOver
                    restartGame={restartGame}
                    score={score}
                    language={language}
                />)}

        </div>
    );
}

export default App;
