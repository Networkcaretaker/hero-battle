import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './views/MainMenu';
import CharacterView from './views/CharacterView';
import BattleView from './views/BattleView';
import CharacterBattle from './views/CharacterBattle';
import AdminCharacterBattle from './views/AdminCharacterBattle';
import BattleCharacter from './temp/batlle_aminimation_1';
import SpriteViewer from './temp/sprite_viewer';
import AttackEffectsDemo from './temp/AttackEffects';
import CharacterDetailView from './views/CharacterDetailView';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainMenu />} />
                    <Route path="/characters" element={<CharacterView />} />
                    <Route path="/character/:characterId" element={<CharacterDetailView />} />
                    <Route path="/battle" element={<BattleView />} />
					<Route path="/character-battle" element={<CharacterBattle />} />
					<Route path="/admin-character-battle" element={<AdminCharacterBattle />} />
					<Route path="/batlle_aminimation_1" element={<BattleCharacter />} />
					<Route path="/sprite-viewer" element={<SpriteViewer />} />
					<Route path="/attack-effects" element={<AttackEffectsDemo />} />
					
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;