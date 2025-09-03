import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharacterBattle from './views/character_battle';
import BattleCharacter from './views/batlle_aminimation_1';
import SpriteViewer from './views/sprite_viewer';
import AttackEffectsDemo from './views/attack_effects';
import MainMenu from './views/main_menu';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/character-battle" element={<CharacterBattle />} />
					<Route path="/batlle_aminimation_1" element={<BattleCharacter />} />
					<Route path="/sprite-viewer" element={<SpriteViewer />} />
					<Route path="/attack-effects" element={<AttackEffectsDemo />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;