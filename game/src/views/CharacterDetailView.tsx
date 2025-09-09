import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Character } from '@shared/types/character';
import { load_characters } from '@shared/game_data/character_data';

const CharacterDetailView: React.FC = () => {
    const { characterId } = useParams<{ characterId: string }>();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {
        const selectedCharacter = load_characters.find(c => c.character_id === characterId);
        if (selectedCharacter) {
            setCharacter(selectedCharacter);
        } else {
            // Handle character not found, maybe redirect or show an error
        }
    }, [characterId]);

    const handleBack = () => {
        navigate('/characters');
    };

    if (!character) {
        return <div>Loading character details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <button onClick={handleBack} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4">
                &larr; Back to Roster
            </button>
            <div className="max-w-4xl mx-auto bg-black/30 p-8 rounded-xl">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <img 
                            src={`/assets/characters/profile/${character.character_id}.jpg`} 
                            alt={character.character_name} 
                            className="rounded-lg w-full"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-2">{character.character_name}</h1>
                        <p className="text-lg text-gray-400 italic mb-4">
                            {character.character_race_id} {character.character_class_id} - {character.character_role_id}
                        </p>
                        <p className="text-gray-300 mb-6">{character.character_description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-lg">
                            <div><strong>Level:</strong> {character.character_level}</div>
                            <div><strong>XP:</strong> {character.character_xp}</div>
                            <div><strong>Health:</strong> {character.health}</div>
                            <div><strong>Stamina:</strong> {character.stamina}</div>
                            <div><strong>Mana:</strong> {character.mana}</div>
                            <div><strong>Strength:</strong> {character.strength}</div>
                            <div><strong>Intelligence:</strong> {character.intelligence}</div>
                            <div><strong>Agility:</strong> {character.agility}</div>
                            <div><strong>Magic:</strong> {character.magic}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetailView;