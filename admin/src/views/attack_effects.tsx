import React, { useState, useEffect } from 'react';
import { Sword, Zap, Shield, Heart, Sparkles, Flame } from 'lucide-react';

const AttackEffectsDemo = () => {
  const [activeEffect, setActiveEffect] = useState('');
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [heroHealth, setHeroHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  // Reset effect after animation
  useEffect(() => {
    if (activeEffect) {
      const timer = setTimeout(() => setActiveEffect(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeEffect]);

  // Create floating damage number
  const showDamageNumber = (damage, type = 'damage') => {
    const id = Date.now();
    const newDamage = {
      id,
      damage,
      type,
      x: Math.random() * 100 + 50, // Random position
      y: Math.random() * 50 + 100
    };
    
    setDamageNumbers(prev => [...prev, newDamage]);
    
    // Remove damage number after animation
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== id));
    }, 2000);
  };

  const triggerEffect = (effectName, damage = 0) => {
    setActiveEffect(effectName);
    
    if (damage > 0) {
      showDamageNumber(damage);
      setEnemyHealth(prev => Math.max(0, prev - damage));
    }
    
    if (effectName === 'heal') {
      showDamageNumber(25, 'heal');
      setHeroHealth(prev => Math.min(100, prev + 25));
    }
  };

  const resetHealth = () => {
    setHeroHealth(100);
    setEnemyHealth(100);
    setDamageNumbers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Hero Battle - Attack Effects Demo
        </h1>

        {/* Battle Scene */}
        <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-8 items-center">
            
            {/* Hero Character */}
            <div className="text-center">
              <div 
                className={`relative inline-block transition-all duration-300 ${
                  activeEffect === 'heal' ? 'animate-pulse scale-110' : ''
                } ${
                  activeEffect === 'shield' ? 'ring-4 ring-blue-400 ring-opacity-75 rounded-full' : ''
                }`}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-6xl">
                  🛡️
                </div>
                
                {/* Shield Effect */}
                {activeEffect === 'shield' && (
                  <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mt-4">Hero</h3>
              
              {/* Hero Health Bar */}
              <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${heroHealth}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                </div>
              </div>
              <span className="text-white text-sm">{heroHealth}/100 HP</span>
            </div>

            {/* Enemy Character */}
            <div className="text-center">
              <div 
                className={`relative inline-block transition-all duration-300 ${
                  activeEffect === 'basic-attack' ? 'animate-bounce' : ''
                } ${
                  activeEffect === 'critical-hit' ? 'animate-pulse scale-110' : ''
                } ${
                  activeEffect === 'magic-attack' ? 'animate-spin' : ''
                } ${
                  activeEffect === 'fire-attack' ? 'animate-pulse' : ''
                } ${
                  activeEffect.includes('attack') ? 'brightness-150' : ''
                }`}
              >
                <div className={`w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-6xl transform transition-all duration-300 ${
                  activeEffect.includes('attack') ? 'scale-95 brightness-125' : ''
                } ${
                  activeEffect === 'shake-attack' ? 'animate-bounce' : ''
                }`}>
                  👹
                </div>
                
                {/* Hit Flash Effect */}
                {activeEffect.includes('attack') && (
                  <div className="absolute inset-0 bg-red-400/50 rounded-full animate-ping"></div>
                )}
                
                {/* Fire Effect */}
                {activeEffect === 'fire-attack' && (
                  <div className="absolute inset-0 bg-orange-400/40 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mt-4">Enemy</h3>
              
              {/* Enemy Health Bar */}
              <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${enemyHealth}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                </div>
              </div>
              <span className="text-white text-sm">{enemyHealth}/100 HP</span>
            </div>
          </div>

          {/* Floating Damage Numbers */}
          {damageNumbers.map((dmg) => (
            <div
              key={dmg.id}
              className={`absolute pointer-events-none text-3xl font-bold animate-bounce z-10 ${
                dmg.type === 'heal' ? 'text-green-400' : 'text-red-400'
              }`}
              style={{
                left: `${dmg.x}%`,
                top: `${dmg.y}px`,
                animation: 'floatUp 2s ease-out forwards'
              }}
            >
              {dmg.type === 'heal' ? `+${dmg.damage}` : `-${dmg.damage}`}
            </div>
          ))}

          {/* Screen Flash Effects */}
          {activeEffect === 'critical-hit' && (
            <div className="absolute inset-0 bg-red-500/30 animate-pulse pointer-events-none rounded-xl"></div>
          )}
          
          {activeEffect === 'magic-attack' && (
            <div className="absolute inset-0 bg-purple-500/20 animate-ping pointer-events-none rounded-xl"></div>
          )}
        </div>

        {/* Attack Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => triggerEffect('basic-attack', 15)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Sword className="w-5 h-5" />
            <span>Basic Attack</span>
          </button>

          <button
            onClick={() => triggerEffect('critical-hit', 35)}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Critical Hit</span>
          </button>

          <button
            onClick={() => triggerEffect('magic-attack', 25)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Magic Attack</span>
          </button>

          <button
            onClick={() => triggerEffect('fire-attack', 30)}
            className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Flame className="w-5 h-5" />
            <span>Fire Attack</span>
          </button>

          <button
            onClick={() => triggerEffect('shake-attack', 20)}
            className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <div className="w-5 h-5">💥</div>
            <span>Shake Attack</span>
          </button>

          <button
            onClick={() => triggerEffect('shield')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Shield</span>
          </button>
        </div>

        {/* Utility Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => triggerEffect('heal')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <Heart className="w-5 h-5" />
            <span>Heal (+25 HP)</span>
          </button>

          <button
            onClick={resetHealth}
            className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200"
          >
            Reset Battle
          </button>
        </div>

        {/* Effect Info */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Current Effect: {activeEffect || 'None'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Visual Effects Used:</h4>
              <ul className="space-y-1">
                <li>• CSS Transform animations (scale, bounce, shake)</li>
                <li>• Tailwind CSS utilities (animate-pulse, animate-spin)</li>
                <li>• Color transitions and gradients</li>
                <li>• Opacity and brightness changes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">React Features:</h4>
              <ul className="space-y-1">
                <li>• State-based effect triggering</li>
                <li>• Floating damage number system</li>
                <li>• Health bar animations</li>
                <li>• Automatic effect cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
};

export default AttackEffectsDemo;