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

    console.log(words);
    return (
        <div className="App">
            {gameStage === 'start' && <StartScreen />}
            {gameStage === 'game' && <Game />}
            {gameStage === 'end' && <GameOver />}

        </div>
    );
}

export default App;
