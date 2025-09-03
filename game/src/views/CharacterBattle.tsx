import React, { useState } from 'react';
import { Sword, Shield, Zap, Heart } from 'lucide-react';

interface Character {
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  level: number;
  image?: string;
}

interface Ability {
  id: string;
  name: string;
  manaCost: number;
  cooldown: number;
  description: string;
  icon: React.ReactNode;
}

const CharacterBattle: React.FC = () => {
  const [battleLog, setBattleLog] = useState<string[]>([
    "Battle begins!",
    "Hero enters the arena...",
    "A wild enemy appears!"
  ]);

  // Sample hero data
  const [hero] = useState<Character>({
    name: "Hero Knight",
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 100,
    level: 12,
    image: "🛡️"
  });

  // Sample enemy data
  const [enemy] = useState<Character>({
    name: "Shadow Beast",
    health: 70,
    maxHealth: 90,
    mana: 40,
    maxMana: 80,
    level: 10,
    image: "👹"
  });

  // Sample abilities
  const abilities: Ability[] = [
    {
      id: 'attack',
      name: 'Sword Strike',
      manaCost: 10,
      cooldown: 0,
      description: 'Basic sword attack',
      icon: <Sword className="w-4 h-4" />
    },
    {
      id: 'defend',
      name: 'Shield Block',
      manaCost: 5,
      cooldown: 2,
      description: 'Reduce incoming damage',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'magic',
      name: 'Lightning Bolt',
      manaCost: 25,
      cooldown: 3,
      description: 'Powerful magic attack',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'heal',
      name: 'Heal',
      manaCost: 20,
      cooldown: 5,
      description: 'Restore health points',
      icon: <Heart className="w-4 h-4" />
    }
  ];

  const handleAbilityUse = (ability: Ability) => {
    const newLogEntry = `Hero uses ${ability.name}!`;
    setBattleLog(prev => [...prev, newLogEntry]);
  };

  const CharacterCard: React.FC<{ character: Character; isHero?: boolean }> = ({ character, isHero = false }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${isHero ? 'border-2 border-blue-500' : 'border-2 border-red-500'}`}>
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">{character.image}</div>
        <h2 className="text-xl font-bold text-gray-800">{character.name}</h2>
        <p className="text-sm text-gray-600">Level {character.level}</p>
      </div>
      
      {/* Health Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Health</span>
          <span>{character.health}/{character.maxHealth}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-red-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Mana Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Mana</span>
          <span>{character.mana}/{character.maxMana}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Battle Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <CharacterCard character={hero} isHero={true} />
            
            {/* Abilities */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Abilities</h3>
              <div className="grid grid-cols-2 gap-2">
                {abilities.map((ability) => (
                  <button
                    key={ability.id}
                    onClick={() => handleAbilityUse(ability)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                    title={`${ability.description} (${ability.manaCost} mana)`}
                  >
                    {ability.icon}
                    <span className="truncate">{ability.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Battle Field Center */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">⚔️</div>
              <h1 className="text-2xl font-bold text-white mb-2">BATTLE IN PROGRESS</h1>
              <p className="text-blue-200">Choose your next move wisely!</p>
            </div>
          </div>
          
          {/* Enemy Section */}
          <div className="space-y-4">
            <CharacterCard character={enemy} />
            
            {/* Enemy Actions */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Enemy Status</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Next Action:</span>
                  <span className="font-medium">Preparing...</span>
                </div>
                <div className="flex justify-between">
                  <span>Threat Level:</span>
                  <span className="font-medium text-red-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Weakness:</span>
                  <span className="font-medium text-blue-600">Lightning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Battle Log Panel */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-48">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">Battle Log</h3>
            <button 
              onClick={() => setBattleLog([])}
              className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Clear Log
            </button>
          </div>
          <div className="bg-black rounded-lg p-3 h-32 overflow-y-auto">
            <div className="space-y-1">
              {battleLog.map((entry, index) => (
                <div key={index} className="text-green-400 text-sm font-mono">
                  <span className="text-gray-500">[{String(index + 1).padStart(2, '0')}]</span> {entry}
                </div>
              ))}
              {battleLog.length === 0 && (
                <div className="text-gray-500 text-sm italic">No battle actions yet...</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CharacterBattle;