import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sword, Shield, Zap } from 'lucide-react';

// Simple Sprite Animation Component
const SpriteAnimation = ({ 
  spriteSheet, 
  frameWidth, 
  frameHeight, 
  totalFrames, 
  duration, 
  isPlaying,
  loop = true,
  onComplete
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const frameDelay = duration / totalFrames;
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => {
          const nextFrame = prev + 1;
          if (nextFrame >= totalFrames) {
            if (loop) {
              return 0;
            } else {
              onComplete && onComplete();
              return prev;
            }
          }
          return nextFrame;
        });
      }, frameDelay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, duration, totalFrames, loop, onComplete]);

  return (
    <div 
      className="border-2 border-gray-400 bg-checkered"
      style={{
        width: frameWidth,
        height: frameHeight,
        backgroundImage: `url(${spriteSheet})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
        imageRendering: 'pixelated', // For pixel art
      }}
    />
  );
};

// CSS-based Sprite Animation Component
const CSSSprite = ({ isPlaying, animationType }) => {
  const getAnimationClass = () => {
    if (!isPlaying) return '';
    switch (animationType) {
      case 'walk': return 'animate-walk';
      case 'attack': return 'animate-attack';
      case 'cast': return 'animate-cast';
      default: return '';
    }
  };

  return (
    <div className={`sprite-base ${getAnimationClass()} border-2 border-gray-400`} />
  );
};

// Character Battle Sprite Component
const BattleCharacter = ({ characterType, action, isPlaying }) => {
  const [currentAction, setCurrentAction] = useState('idle');
  
  const getSpriteConfig = (type, action) => {
    const configs = {
      'warrior-idle': { frames: 4, duration: 1000, width: 64, height: 64 },
      'warrior-attack': { frames: 6, duration: 600, width: 64, height: 64 },
      'mage-idle': { frames: 3, duration: 1200, width: 64, height: 64 },
      'mage-cast': { frames: 8, duration: 800, width: 64, height: 64 },
    };
    
    return configs[`${type}-${action}`] || configs[`${type}-idle`];
  };

  const config = getSpriteConfig(characterType, action);
  const spriteSheet = createMockSpriteSheet(characterType, action, config.frames, config.width, config.height);

  return (
    <div className="text-center">
      <div className="mb-2">
        <SpriteAnimation
          spriteSheet={spriteSheet}
          frameWidth={config.width}
          frameHeight={config.height}
          totalFrames={config.frames}
          duration={config.duration}
          isPlaying={isPlaying}
          loop={action === 'idle'}
          onComplete={() => action !== 'idle' && setCurrentAction('idle')}
        />
      </div>
      <p className="text-white text-sm font-bold">{characterType}</p>
      <p className="text-gray-300 text-xs">{action}</p>
    </div>
  );
};

// Mock sprite sheet generator (for demo purposes)
const createMockSpriteSheet = (character, action, frames, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width * frames;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Different colors for different characters/actions
  const colors = {
    'warrior-idle': '#4F46E5',
    'warrior-attack': '#DC2626',
    'mage-idle': '#7C3AED',
    'mage-cast': '#059669',
  };

  const baseColor = colors[`${character}-${action}`] || '#6B7280';

  for (let i = 0; i < frames; i++) {
    const x = i * width;
    
    // Draw frame background
    ctx.fillStyle = baseColor;
    ctx.fillRect(x + 8, 8, width - 16, height - 16);
    
    // Add frame variation (simulate animation)
    ctx.fillStyle = `${baseColor}AA`;
    const offset = Math.sin((i / frames) * Math.PI * 2) * 4;
    ctx.fillRect(x + 12, 12 + offset, width - 24, height - 24 - Math.abs(offset));
    
    // Add frame indicator
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Arial';
    ctx.fillText(`${i + 1}`, x + 4, 20);
  }

  return canvas.toDataURL();
};

const SpriteAnimationDemo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDemo, setSelectedDemo] = useState('battle');
  
  // Battle demo states
  const [battleAction, setBattleAction] = useState('idle');
  const [warriorAction, setWarriorAction] = useState('idle');
  const [mageAction, setMageAction] = useState('idle');

  const handleAction = (character, action) => {
    if (character === 'warrior') {
      setWarriorAction(action);
      setTimeout(() => setWarriorAction('idle'), 600);
    } else if (character === 'mage') {
      setMageAction(action);
      setTimeout(() => setMageAction('idle'), 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Sprite Sheet Animation Demo
        </h1>

        {/* Demo Selection */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setSelectedDemo('battle')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              selectedDemo === 'battle' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Battle Characters
          </button>
          <button
            onClick={() => setSelectedDemo('css')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              selectedDemo === 'css' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            CSS Animations
          </button>
          <button
            onClick={() => setSelectedDemo('technical')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              selectedDemo === 'technical' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Technical Details
          </button>
        </div>

        {/* Battle Characters Demo */}
        {selectedDemo === 'battle' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Hero Battle Character Animations
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <BattleCharacter 
                  characterType="warrior" 
                  action={warriorAction}
                  isPlaying={isPlaying}
                />
              </div>
              <div className="text-center">
                <BattleCharacter 
                  characterType="mage" 
                  action={mageAction}
                  isPlaying={isPlaying}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-white font-bold mb-4">Warrior Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleAction('warrior', 'attack')}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Sword className="w-4 h-4" />
                    <span>Attack</span>
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-white font-bold mb-4">Mage Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleAction('mage', 'cast')}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Cast Spell</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CSS Animation Demo */}
        {selectedDemo === 'css' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              CSS-Based Sprite Animations
            </h2>
            
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <CSSSprite isPlaying={isPlaying} animationType="walk" />
                <p className="text-white mt-2 font-bold">Walking</p>
              </div>
              <div className="text-center">
                <CSSSprite isPlaying={isPlaying} animationType="attack" />
                <p className="text-white mt-2 font-bold">Attacking</p>
              </div>
              <div className="text-center">
                <CSSSprite isPlaying={isPlaying} animationType="cast" />
                <p className="text-white mt-2 font-bold">Spell Casting</p>
              </div>
            </div>
          </div>
        )}

        {/* Technical Details */}
        {selectedDemo === 'technical' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">React Component Approach</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
{`const SpriteAnimation = ({ 
  spriteSheet, 
  frameWidth, 
  frameHeight, 
  totalFrames, 
  duration, 
  isPlaying 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentFrame(prev => 
          (prev + 1) % totalFrames
        );
      }, duration / totalFrames);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, totalFrames]);

  return (
    <div style={{
      backgroundImage: \`url(\${spriteSheet})\`,
      backgroundPosition: 
        \`-\${currentFrame * frameWidth}px 0px\`
    }} />
  );
};`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-4">CSS Animation Approach</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
{`/* CSS Animation */
.sprite-walk {
  background-image: url('character.png');
  width: 64px;
  height: 64px;
  animation: walk 1s steps(8) infinite;
}

@keyframes walk {
  from { 
    background-position-x: 0px; 
  }
  to { 
    background-position-x: -512px; 
  }
}

/* For pixel art */
.sprite {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Integration with Your Hero Battle Game</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-3">File Structure</h4>
                  <pre className="text-sm text-gray-300">
{`game/src/assets/sprites/
├── characters/
│   ├── warrior-idle.png
│   ├── warrior-attack.png
│   ├── mage-idle.png
│   └── mage-cast.png
├── effects/
│   ├── fireball.png
│   ├── healing.png
│   └── shield.png
└── ui/
    ├── buttons.png
    └── icons.png`}
                  </pre>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-3">Performance Benefits</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• <strong>Single HTTP request</strong> per sprite sheet</li>
                    <li>• <strong>Efficient memory usage</strong> - browser caches one image</li>
                    <li>• <strong>Smooth animations</strong> - no loading delays</li>
                    <li>• <strong>Small file sizes</strong> - compressed PNG optimization</li>
                    <li>• <strong>Easy to manage</strong> - artists work with one file</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Play'} Animations</span>
          </button>
        </div>

        {/* Usage Notes */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Usage Notes for Your Game</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Character States</h4>
              <ul className="space-y-1">
                <li>• Idle animations (looping)</li>
                <li>• Attack animations (one-shot)</li>
                <li>• Taking damage (brief flash)</li>
                <li>• Victory/defeat poses</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 mb-2">Battle Effects</h4>
              <ul className="space-y-1">
                <li>• Spell casting animations</li>
                <li>• Impact/hit effects</li>
                <li>• Healing/buff indicators</li>
                <li>• Status effect visuals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">UI Elements</h4>
              <ul className="space-y-1">
                <li>• Animated buttons</li>
                <li>• Progress bar fills</li>
                <li>• Loading spinners</li>
                <li>• Notification popups</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-checkered {
          background-image: 
            linear-gradient(45deg, #374151 25%, transparent 25%), 
            linear-gradient(-45deg, #374151 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #374151 75%), 
            linear-gradient(-45deg, transparent 75%, #374151 75%);
          background-size: 8px 8px;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        }
        
        .sprite-base {
          width: 64px;
          height: 64px;
          background: linear-gradient(45deg, #3B82F6, #1E40AF);
          margin: 0 auto;
          image-rendering: pixelated;
        }
        
        .animate-walk {
          animation: walk 1s steps(4) infinite;
        }
        
        .animate-attack {
          animation: attack 0.6s steps(6) forwards;
        }
        
        .animate-cast {
          animation: cast 0.8s steps(8) forwards;
        }
        
        @keyframes walk {
          from { background-position-x: 0px; }
          to { background-position-x: -256px; }
        }
        
        @keyframes attack {
          from { 
            background-position-x: 0px; 
            background: linear-gradient(45deg, #DC2626, #991B1B);
          }
          to { 
            background-position-x: -384px;
            background: linear-gradient(45deg, #DC2626, #991B1B);
          }
        }
        
        @keyframes cast {
          from { 
            background-position-x: 0px;
            background: linear-gradient(45deg, #7C3AED, #5B21B6);
          }
          to { 
            background-position-x: -512px;
            background: linear-gradient(45deg, #7C3AED, #5B21B6);
          }
        }
      `}</style>
    </div>
  );
};

export default SpriteAnimationDemo;