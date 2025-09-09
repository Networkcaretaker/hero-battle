import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '@shared/types/character';
import { load_characters } from '@shared/game_data/character_data';

const CharacterSelection: React.FC = () => {
    const [hero, setHero] = useState<Character | null>(null);
    const [enemy, setEnemy] = useState<Character | null>(null);
    const navigate = useNavigate();

    const handleSelectHero = (character: Character) => {
        setHero(character);
    }

    const handleSelectEnemy = (character: Character) => {
        setEnemy(character);
    }

    const handleStartBattle = () => {
        if (hero && enemy) {
            navigate('/character-battle', { state: { hero, enemy } });
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Select Your Fighters</h1>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Select Hero</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {load_characters.map(character => (
                            <div key={character.character_id} onClick={() => handleSelectHero(character)} className={`p-4 rounded-lg cursor-pointer ${hero?.character_id === character.character_id ? 'bg-blue-500' : 'bg-gray-800'}`}>
                                <img src={`/assets/characters/profile/${character.character_id}.jpg`} alt={character.character_name} className="w-full h-auto rounded"/>
                                <p className="text-center mt-2">{character.character_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Select Enemy</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {load_characters.map(character => (
                            <div key={character.character_id} onClick={() => handleSelectEnemy(character)} className={`p-4 rounded-lg cursor-pointer ${enemy?.character_id === character.character_id ? 'bg-red-500' : 'bg-gray-800'}`}>
                                <img src={`/assets/characters/profile/${character.character_id}.jpg`} alt={character.character_name} className="w-full h-auto rounded"/>
                                <p className="text-center mt-2">{character.character_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {hero && enemy && (
                <div className="text-center mt-8">
                    <button onClick={handleStartBattle} className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600">Start Battle</button>
                </div>
            )}
        </div>
    );
};

export default CharacterSelection;
