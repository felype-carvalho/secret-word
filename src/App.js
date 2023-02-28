//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordsListPT } from './data/words';
import { wordsListEG } from './data/words';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" }
];

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsListEG);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategoriy, setPickedCategoriy] = useState("");
    const [letters, setLetters] = useState([]);

    const pickWordAndCategory = () => {
        // pick a random category
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

        // pick a random word
        const word = words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category }
    }

    // starts the secret word game
    const startGame = () => {
        //pick word and pick category
        const { word, category } = pickWordAndCategory();

        // create an array of letters
        let wordLettlers = word.split("");

        wordLettlers = wordLettlers.map((l) => l.toLowerCase());

        console.log(word, category);
        console.log(wordLettlers);

        // fill states

        setPickedWord(word);
        setPickedCategoriy(category);
        setLetters(letters);

        setGameStage(stages[1].name);
    }

    // process the letter input
    const verifyLetter = () => {
        setGameStage(stages[2].name);
    }

    // restarts the game
    const restartGame = () => {
        setGameStage(stages[0].name);
    }

    return (
        <div className="App">
            {gameStage === 'start' && <StartScreen startGame={startGame} />}
            {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
            {gameStage === 'end' && <GameOver restartGame={restartGame} />}

        </div>
    );
}

export default App;
