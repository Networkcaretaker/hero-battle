import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Character {
    Name: string;
    Race: string;
    Class: string;
    Role: string;
}

const CharacterView: React.FC = () => {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        try {
            // In a real app, you'd load from your characters.json file
            // For now, using sample data based on your structure
            const sampleCharacters: Character[] = [
                {
                    Name: "Character 1",
                    Race: "Human",
                    Class: "Warrior",
                    Role: "Brawler"
                },
                {
                    Name: "Character 2", 
                    Race: "Elf",
                    Class: "Mage",
                    Role: "Commander"
                }
            ];
            
            setCharacters(sampleCharacters);
            setLoading(false);
        } catch (err) {
			console.log(err)
            setError('Failed to load characters');
            setLoading(false);
        }
    };

    const handleBackToMenu = () => {
        navigate('/');
    };

    const handleSelectForBattle = (character: Character) => {
        // Navigate to battle with selected character
        navigate('/battle', { state: { selectedCharacter: character } });
    };

    const handleViewDetails = (character: Character) => {
        // For now, just show an alert - implement detailed view later
        alert(`Viewing details for ${character.Name} - implement detailed character view`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading characters...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">CHARACTER ROSTER</h1>
                    <p className="text-gray-300">Your heroes ready for battle</p>
                </div>

                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBackToMenu}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                        ← Back to Main Menu
                    </button>
                </div>

                {/* Characters Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {characters.map((character, index) => (
                        <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                            {/* Character Portrait Placeholder */}
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">
                                    {character.Name.charAt(0)}
                                </span>
                            </div>

                            {/* Character Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-2">{character.Name}</h3>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Race:</span>
                                        <span className="text-white font-medium">{character.Race}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Class:</span>
                                        <span className="text-white font-medium">{character.Class}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Role:</span>
                                        <span className="text-white font-medium">{character.Role}</span>
                                    </div>
                                </div>

                                {/* Character Actions */}
                                <div className="mt-4 space-y-2">
                                    <button 
                                        onClick={() => handleViewDetails(character)}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors duration-200"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleSelectForBattle(character)}
                                        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Select for Battle
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Character Count */}
                <div className="text-center mt-8">
                    <p className="text-gray-400">
                        Total Characters: <span className="text-white font-semibold">{characters.length}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CharacterView;