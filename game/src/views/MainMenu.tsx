import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, Gamepad2, Shield } from 'lucide-react';

const MainMenu: React.FC = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleViewCharacters = () => {
        setSelectedOption('characters');
        navigate('/characters');
    };

    const handleStartBattle = () => {
        setSelectedOption('battle');
        navigate('/battle');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%), 
                                      radial-gradient(circle at 75% 75%, #db2777 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <Shield className="w-16 h-16 text-yellow-400 mr-4 animate-pulse" />
                        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                            HERO
                        </h1>
                        <div className="mx-4">
                            <Swords className="w-10 h-10 md:w-12 md:h-12 text-red-500 animate-bounce" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                            BATTLE
                        </h1>
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-300 font-medium">
                        Enter the arena where legends are forged
                    </p>
                </div>

                {/* Menu Buttons */}
                <div className="space-y-6">
                    <button
                        onClick={handleStartBattle}
                        className={`group w-full max-w-md mx-auto block bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-6 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/50 ${
                            selectedOption === 'battle' ? 'ring-4 ring-red-400' : ''
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-4">
                            <Gamepad2 className="w-8 h-8 group-hover:animate-bounce" />
                            <span className="text-xl md:text-2xl">START BATTLE</span>
                        </div>
                        <p className="text-sm opacity-90 mt-2">Begin your tactical combat experience</p>
                    </button>

                    <button
                        onClick={() => navigate('/character-battle')}
                        className={`group w-full max-w-md mx-auto block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold py-6 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/50`}
                    >
                        <div className="flex items-center justify-center space-x-4">
                            <Swords className="w-8 h-8 group-hover:animate-pulse" />
                            <span className="text-xl md:text-2xl">CHARACTER BATTLE</span>
                        </div>
                        <p className="text-sm opacity-90 mt-2">Watch a simulated battle between two characters</p>
                    </button>

                    <button
                        onClick={handleViewCharacters}
                        className={`group w-full max-w-md mx-auto block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/50 ${
                            selectedOption === 'characters' ? 'ring-4 ring-blue-400' : ''
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-4">
                            <Users className="w-8 h-8 group-hover:animate-pulse" />
                            <span className="text-xl md:text-2xl">VIEW CHARACTERS</span>
                        </div>
                        <p className="text-sm opacity-90 mt-2">Explore your hero roster and abilities</p>
                    </button>
                </div>

                {/* Footer info */}
                <div className="mt-16 text-gray-400 text-sm">
                    <p>Use tactical strategy to defeat your opponents</p>
                    <p className="mt-2 opacity-75">Ready with your 2 custom characters</p>
                </div>

                {/* Character count indicator */}
                <div className="mt-8 inline-block bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">2 Characters Ready</span>
                    </div>
                </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default MainMenu;