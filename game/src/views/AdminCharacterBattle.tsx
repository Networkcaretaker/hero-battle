import React, { useState } from 'react';

interface Character {
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  level: number;
  race: string;
  class: string;
  position: { x: number; y: number };
  abilities: string[];
}

interface BattleCommand {
  timestamp: string;
  command: string;
  result: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const AdminCharacterBattle: React.FC = () => {
  const [battleCommands, setBattleCommands] = useState<BattleCommand[]>([
    { timestamp: '09:15:23', command: 'battle.initialize()', result: 'Battle system initialized', type: 'success' },
    { timestamp: '09:15:24', command: 'hero.loadStats()', result: 'Hero stats loaded successfully', type: 'info' },
    { timestamp: '09:15:25', command: 'enemy.spawn("Shadow Beast")', result: 'Enemy spawned at position (8,4)', type: 'info' },
    { timestamp: '09:15:26', command: 'battle.start()', result: 'Battle commenced - Turn 1', type: 'warning' }
  ]);

  // Sample hero data
  const [hero] = useState<Character>({
    name: "Knight_Paladin_01",
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 100,
    level: 12,
    race: "Human",
    class: "Paladin",
    position: { x: 2, y: 4 },
    abilities: ["sword_strike", "divine_heal", "shield_bash", "holy_light"]
  });

  // Sample enemy data
  const [enemy] = useState<Character>({
    name: "Shadow_Beast_07",
    health: 70,
    maxHealth: 90,
    mana: 40,
    maxMana: 80,
    level: 10,
    race: "Demon",
    class: "Assassin",
    position: { x: 8, y: 4 },
    abilities: ["shadow_strike", "stealth", "poison_dart", "backstab"]
  });

  const executeCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newCommand: BattleCommand = {
      timestamp,
      command,
      result: `Executing ${command}...`,
      type: 'info'
    };
    setBattleCommands(prev => [...prev, newCommand]);
  };

  const TerminalFrame: React.FC<{ title: string; children: React.ReactNode; titleColor?: string }> = ({ 
    title, 
    children, 
    titleColor = "text-white" 
  }) => (
    <div className="bg-black border-2 border-gray-600 mb-4">
      {/* Title Bar */}
      <div className="bg-gray-800 px-4 py-2 border-b-2 border-gray-600">
        <h3 className={`${titleColor} text-lg font-bold font-mono tracking-wider`}>{title}</h3>
      </div>
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-4">
          <h1 className="text-white font-mono text-xl font-bold">ADMIN BATTLE MONITOR v2.1.4</h1>
          <div className="text-gray-400 text-sm font-mono mt-1">
            Session: battle_session_001 | Status: ACTIVE | Mode: DEBUG
          </div>
        </div>
        
        {/* Main Battle Area - Top Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
          {/* HERO Section - Left Side */}
          <div>
            {/* Hero Character Stats */}
            <TerminalFrame title="HERO" titleColor="text-green-400">
              <div className="font-mono text-sm space-y-2 text-white">
                <div className="text-white">{"{"}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-green-400 text-lg font-bold">
                    "name": "{hero.name}",
                  </div>
                  <div className="text-gray-300">
                    "level": <span className="text-yellow-400 font-bold">{hero.level}</span>,
                  </div>
                  <div className="text-gray-300">
                    "race": "<span className="text-blue-400">{hero.race}</span>",
                  </div>
                  <div className="text-gray-300">
                    "class": "<span className="text-purple-400">{hero.class}</span>",
                  </div>
                  <div className="text-gray-300">
                    "position": {"{"} 
                    <span className="text-yellow-400">x: {hero.position.x}</span>, 
                    <span className="text-yellow-400"> y: {hero.position.y}</span> {"}"},
                  </div>
                  <div className="text-gray-300 text-base">
                    "stats": {"{"}
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="text-gray-300">
                      "health": <span className="text-red-300 font-bold text-lg">{hero.health}</span>/<span className="text-red-500 font-bold text-lg">{hero.maxHealth}</span>,
                    </div>
                    <div className="text-gray-300">
                      "mana": <span className="text-blue-300 font-bold text-lg">{hero.mana}</span>/<span className="text-blue-500 font-bold text-lg">{hero.maxMana}</span>
                    </div>
                  </div>
                  <div className="text-gray-300">{"}"}</div>
                </div>
                <div className="text-white">{"}"}</div>
              </div>
            </TerminalFrame>
            
            {/* Hero Ability Buttons */}
            <TerminalFrame title="Character Ability Buttons" titleColor="text-green-400">
              <div className="font-mono text-sm">
                <div className="text-gray-400 mb-3">// Available Hero Abilities</div>
                <div className="grid grid-cols-2 gap-3">
                  {hero.abilities.map((ability) => (
                    <button
                      key={ability}
                      onClick={() => executeCommand(`hero.useAbility("${ability}")`)}
                      className="bg-gray-800 hover:bg-gray-700 border-2 border-green-600 text-green-400 hover:text-green-300 p-3 rounded text-left transition-colors font-mono"
                    >
                      <div className="text-green-400 font-bold text-sm">
                        execute_{ability}()
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {ability === 'sword_strike' && 'dmg: 15-25, mana: 10'}
                        {ability === 'divine_heal' && 'heal: 20-30, mana: 20'}
                        {ability === 'shield_bash' && 'dmg: 8-12, stun: 1t, mana: 15'}
                        {ability === 'holy_light' && 'dmg: 30-40, mana: 35'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TerminalFrame>
          </div>
          
          {/* ENEMY Section - Right Side */}
          <div>
            {/* Enemy Character Stats */}
            <TerminalFrame title="ENEMY" titleColor="text-red-400">
              <div className="font-mono text-sm space-y-2 text-white">
                <div className="text-white">{"{"}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-red-400 text-lg font-bold">
                    "name": "{enemy.name}",
                  </div>
                  <div className="text-gray-300">
                    "level": <span className="text-yellow-400 font-bold">{enemy.level}</span>,
                  </div>
                  <div className="text-gray-300">
                    "race": "<span className="text-blue-400">{enemy.race}</span>",
                  </div>
                  <div className="text-gray-300">
                    "class": "<span className="text-purple-400">{enemy.class}</span>",
                  </div>
                  <div className="text-gray-300">
                    "position": {"{"} 
                    <span className="text-yellow-400">x: {enemy.position.x}</span>, 
                    <span className="text-yellow-400"> y: {enemy.position.y}</span> {"}"},
                  </div>
                  <div className="text-gray-300 text-base">
                    "stats": {"{"}
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="text-gray-300">
                      "health": <span className="text-red-300 font-bold text-lg">{enemy.health}</span>/<span className="text-red-500 font-bold text-lg">{enemy.maxHealth}</span>,
                    </div>
                    <div className="text-gray-300">
                      "mana": <span className="text-blue-300 font-bold text-lg">{enemy.mana}</span>/<span className="text-blue-500 font-bold text-lg">{enemy.maxMana}</span>
                    </div>
                  </div>
                  <div className="text-gray-300">{"}"}</div>
                </div>
                <div className="text-white">{"}"}</div>
              </div>
            </TerminalFrame>
            
            {/* Enemy Ability Buttons */}
            <TerminalFrame title="Character Ability Buttons" titleColor="text-red-400">
              <div className="font-mono text-sm">
                <div className="text-gray-400 mb-3">// Available Enemy Abilities</div>
                <div className="grid grid-cols-2 gap-3">
                  {enemy.abilities.map((ability) => (
                    <button
                      key={ability}
                      onClick={() => executeCommand(`enemy.useAbility("${ability}")`)}
                      className="bg-gray-800 hover:bg-gray-700 border-2 border-red-600 text-red-400 hover:text-red-300 p-3 rounded text-left transition-colors font-mono"
                    >
                      <div className="text-red-400 font-bold text-sm">
                        execute_{ability}()
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {ability === 'shadow_strike' && 'dmg: 18-28, mana: 15'}
                        {ability === 'stealth' && 'dodge: +50%, turns: 2, mana: 25'}
                        {ability === 'poison_dart' && 'dmg: 8-12, poison: 3t, mana: 12'}
                        {ability === 'backstab' && 'dmg: 25-35, mana: 30'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TerminalFrame>
          </div>
        </div>
        
        {/* BATTLE LOG - Full Width */}
        <TerminalFrame title="BATTLE LOG" titleColor="text-blue-400">
          <div className="bg-black p-4 border border-gray-600 h-40 overflow-y-auto font-mono text-sm space-y-1">
            {battleCommands.map((cmd, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-500">[{cmd.timestamp}]</span>
                <span className={`${
                  cmd.type === 'success' ? 'text-green-400' :
                  cmd.type === 'error' ? 'text-red-400' :
                  cmd.type === 'warning' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {cmd.command}
                </span>
                <span className="text-gray-300">→ {cmd.result}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-gray-500">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
              <span className="text-white">admin@battlemonitor:~$</span>
              <span className="animate-pulse text-white">_</span>
            </div>
          </div>
        </TerminalFrame>
        
        {/* GAME BUTTONS - Full Width Bottom */}
        <TerminalFrame title="Game Buttons" titleColor="text-white">
          <div className="flex gap-4 items-center justify-center py-4">
            <button
              onClick={() => executeCommand('battle.nextTurn()')}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-mono font-bold rounded-lg border-2 border-blue-500 transition-colors"
            >
              NEXT_TURN()
            </button>
            <button
              onClick={() => executeCommand('battle.reset()')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-mono font-bold rounded-lg border-2 border-gray-500 transition-colors"
            >
              RESET_BATTLE()
            </button>
            <button
              onClick={() => executeCommand('battle.pause()')}
              className="px-6 py-3 bg-yellow-700 hover:bg-yellow-600 text-white font-mono font-bold rounded-lg border-2 border-yellow-500 transition-colors"
            >
              PAUSE_BATTLE()
            </button>
            <button
              onClick={() => setBattleCommands([])}
              className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono font-bold rounded-lg border-2 border-red-500 transition-colors"
            >
              CLEAR_LOG()
            </button>
          </div>
        </TerminalFrame>
        
      </div>
    </div>
  );
};

export default AdminCharacterBattle;