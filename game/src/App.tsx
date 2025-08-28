import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './views/MainMenu';
import CharacterView from './views/CharacterView';
import BattleView from './views/BattleView';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainMenu />} />
                    <Route path="/characters" element={<CharacterView />} />
                    <Route path="/battle" element={<BattleView />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;