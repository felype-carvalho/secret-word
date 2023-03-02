import "./StartScreen.css";

const StartScreen = ({ startGame, language, changeLanguage }) => {
    return (
        <div className="start">
            <h1 className="logo">Secret Word</h1>
            <p>{language === "EN" ? ("Click the button below to play") : ("Clique no botão abaixo para jogar")}</p>
            <div>
                <button onClick={startGame}>{language === "EN" ? ("Start Game") : ("Começar o jogo")}</button>
                <label className="label">
                    <span>{language === "EN"? ("Language:"): ("Idioma:")}</span>
                    <select
                        name="role"
                        onChange={(e) => changeLanguage(e.target.value)}
                        value={language}
                        className="select">
                        <option value="EN">English</option>
                        <option value="PT">Português</option>
                    </select>
                </label>
            </div>
        </div>
    )
}

export default StartScreen