import React, { useState, useEffect } from 'react';
import { Sword, Heart } from 'lucide-react';
import { Character } from '@shared/types/character';
import { load_characters } from '@shared/game_data/character_data';
import { basic_attack, basic_heal } from '../services/battle_functions';
import character_abilities from '@shared/game_data/character_abilies.json';

const CharacterBattle: React.FC = () => {
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [hero, setHero] = useState<Character | undefined>()
  const [enemy, setEnemy] = useState<Character | undefined>()
  const [turn, setTurn] = useState<'hero' | 'enemy'>('hero');
  const [battleMessage, setBattleMessage] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'hero' | 'enemy' | null>(null);

  const initBattle = () => {
    setBattleLog([
        "Battle begins!",
        "Hero enters the arena...",
        "A wild enemy appears!"
      ]);
      setHero(JSON.parse(JSON.stringify(load_characters.find(c => c.character_id === 'dark_oracle'))));
      setEnemy(JSON.parse(JSON.stringify(load_characters.find(c => c.character_id === 'balrock'))));
      setTurn('hero');
      setBattleMessage('');
      setGameOver(false);
      setWinner(null);
  }

  useEffect(() => {
    initBattle();
  }, []);

  const heroAbilities = hero?.abilities?.map(ability => {
      return character_abilities.character_abilities.find(a => a.ability_id === ability.ability_id);
  });

  const enemyAbilities = enemy?.abilities?.map(ability => {
    return character_abilities.character_abilities.find(a => a.ability_id === ability.ability_id);
});

  const handleAbilityUse = (attacker: Character, defender: Character, ability: any) => {
    if (gameOver || !attacker || !defender) return;

    if (ability.ability_type === 'physical_attack' && (attacker.stamina || 0) < (ability.stamina_cost || 0)) {
        setBattleMessage("You don't have enough energy to use this ability");
        return;
    }

    if (ability.ability_type === 'magic_attack' && (attacker.mana || 0) < (ability.mana_cost || 0)) {
        setBattleMessage("You don't have enough energy to use this ability");
        return;
    }

    if (ability.ability_type === 'healing' && ((attacker.stamina || 0) < (ability.stamina_cost || 0) || (attacker.mana || 0) < (ability.mana_cost || 0))) {
        setBattleMessage("You don't have enough energy to use this ability");
        return;
    }

    setBattleMessage('');

    if (ability.ability_type === 'physical_attack' || ability.ability_type === 'magic_attack') {
        const { damage, newDefenderHealth } = basic_attack(attacker, defender, ability);
        const newAttackerStamina = Math.max(0, (attacker.stamina || 0) - (ability.stamina_cost || 0));
        const newAttackerMana = Math.max(0, (attacker.mana || 0) - (ability.mana_cost || 0));

        if (attacker.character_id === hero?.character_id) {
            setEnemy(prev => (prev ? { ...prev, health: newDefenderHealth } : undefined));
            setHero(prev => (prev ? { ...prev, stamina: newAttackerStamina, mana: newAttackerMana } : undefined));
            setBattleLog(prev => [...prev, `Hero attacks ${defender.character_name} with ${ability.ability_name} for ${damage.toFixed(2)} damage!`]);
            if (newDefenderHealth === 0) {
                setGameOver(true);
                setWinner('hero');
            } else {
                setTurn('enemy');
            }
        } else {
            setHero(prev => (prev ? { ...prev, health: newDefenderHealth } : undefined));
            setEnemy(prev => (prev ? { ...prev, stamina: newAttackerStamina, mana: newAttackerMana } : undefined));
            setBattleLog(prev => [...prev, `Enemy attacks ${defender.character_name} with ${ability.ability_name} for ${damage.toFixed(2)} damage!`]);
            if (newDefenderHealth === 0) {
                setGameOver(true);
                setWinner('enemy');
            } else {
                setTurn('hero');
            }
        }
    } else if (ability.ability_type === 'healing') {
        const { newHealerHealth } = basic_heal(attacker);
        const newAttackerStamina = Math.max(0, (attacker.stamina || 0) - (ability.stamina_cost || 0));
        const newAttackerMana = Math.max(0, (attacker.mana || 0) - (ability.mana_cost || 0));

        if (attacker.character_id === hero?.character_id) {
            setHero(prev => (prev ? { ...prev, health: newHealerHealth, stamina: newAttackerStamina, mana: newAttackerMana } : undefined));
            setBattleLog(prev => [...prev, `Hero uses ${ability.ability_name} and recovers health!`]);
            setTurn('enemy');
        } else {
            setEnemy(prev => (prev ? { ...prev, health: newHealerHealth, stamina: newAttackerStamina, mana: newAttackerMana } : undefined));
            setBattleLog(prev => [...prev, `Enemy uses ${ability.ability_name} and recovers health!`]);
            setTurn('hero');
        }
    }
  };

  const CharacterCard: React.FC<{ character?: Character; isHero?: boolean }> = ({ character, isHero = false }) => {
    if (!character) {
        return null;
    }
    return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${isHero ? 'border-2 border-blue-500' : 'border-2 border-red-500'}`}>
      <div className="text-center mb-4">
        <img src={`/assets/characters/profile/${character.character_id}.jpg`} alt={character.character_name} className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{character.character_name}</h2>
        <p className="text-sm text-gray-600">Level {character.character_level}</p>
      </div>
      
      {/* Health Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Health</span>
          <span>{character.health?.toFixed(2)}/{character.max_health}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-red-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((character.health ?? 0) / (character.max_health ?? 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Mana Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Mana</span>
          <span>{character.mana}/{character.max_mana}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((character.mana ?? 0) / (character.max_mana ?? 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stamina Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Stamina</span>
          <span>{character.stamina}/{character.max_stamina}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((character.stamina ?? 0) / (character.max_stamina ?? 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Battle Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>PA: {character.physical_attack}</div>
            <div>PD: {character.physical_defence}</div>
            <div>MA: {character.magic_attack}</div>
            <div>MD: {character.magic_defence}</div>
        </div>
    </div>
  )};

  const ActionPanel: React.FC<{character: Character, abilities: any[], onAbilityUse: (ability: any) => void, disabled: boolean}> = ({character, abilities, onAbilityUse, disabled}) => (
    <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Abilities</h3>
        <div className="grid grid-cols-2 gap-2">
        {abilities?.map((ability) => (
            <button
            key={ability?.ability_id}
            onClick={() => onAbilityUse(ability)}
            disabled={disabled}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium disabled:bg-gray-400"
            title={`${ability?.ability_description} (${ability?.stamina_cost || ability?.mana_cost} ${ability?.ability_type === 'physical_attack' ? 'stamina' : 'mana'})`}
            >
            {ability.ability_type === 'healing' ? <Heart className="w-4 h-4" /> : <Sword className="w-4 h-4" />}
            <span className="truncate">{ability?.ability_name}</span>
            </button>
        ))}
        </div>
    </div>
  );

  const StatusPanel: React.FC<{characterName: string}> = ({characterName}) => (
    <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{characterName} Status</h3>
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Battle Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <CharacterCard character={hero} isHero={true} />
            {turn === 'hero' ? 
                <ActionPanel character={hero!} abilities={heroAbilities!} onAbilityUse={(ability) => handleAbilityUse(hero!, enemy!, ability)} disabled={turn !== 'hero' || gameOver} /> : 
                <StatusPanel characterName={'Hero Status'} />
            }
          </div>
          
          {/* Battle Field Center */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">⚔️</div>
              <h1 className="text-2xl font-bold text-white mb-2">BATTLE IN PROGRESS</h1>
              {gameOver ? (
                <div>
                    <p className="text-green-400 text-2xl font-bold">{winner === 'hero' ? `${hero?.character_name} Wins!` : `${enemy?.character_name} Wins!`}</p>
                    <button onClick={initBattle} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Restart Battle</button>
                </div>
              ) : (
                <p className="text-blue-200">{turn === 'hero' ? 'Your turn' : 'Enemy turn'}</p>
              )}
              <p className="text-red-500 h-4">{battleMessage}</p>
            </div>
          </div>
          
          {/* Enemy Section */}
          <div className="space-y-4">
            <CharacterCard character={enemy} />
            {turn === 'enemy' ? 
                <ActionPanel character={enemy!} abilities={enemyAbilities!} onAbilityUse={(ability) => handleAbilityUse(enemy!, hero!, ability)} disabled={turn !== 'enemy' || gameOver} /> : 
                <StatusPanel characterName={'Enemy Status'} />
            }
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
