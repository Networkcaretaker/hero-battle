import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Simple Sprite Animation Component that cycles through frame URLs
const SpriteViewer = ({
	animationFrames = [],
	duration = 1000,
	isPlaying = true,
	scale = 6,
}) => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const intervalRef = useRef(null);

	const totalFrames = animationFrames.length;

	useEffect(() => {
		if (isPlaying && totalFrames > 0) {
			const frameDelay = duration / totalFrames;
			intervalRef.current = setInterval(() => {
				setCurrentFrame(prev => (prev + 1) % totalFrames);
			}, frameDelay);
		} else {
			clearInterval(intervalRef.current);
		}

		return () => clearInterval(intervalRef.current);
	}, [isPlaying, duration, totalFrames]);

	// Reset frame when animation changes
	useEffect(() => {
		setCurrentFrame(0);
	}, [animationFrames]);

	if (totalFrames === 0) {
		return (
			<div
				className="border-4 border-dashed border-gray-400 bg-gray-800 flex items-center justify-center text-gray-400"
				style={{
					width: 64 * scale,
					height: 64 * scale,
				}}
			>
				<div className="text-center">
					<p>No animation loaded</p>
					<p className="text-xs mt-1">
						Check console for missing files
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center">
			<div
				className="border-4 border-gray-600 bg-checkered relative flex items-center justify-center"
				style={{
					width: 64 * scale,
					height: 64 * scale,
				}}
			>
				<img
					src={animationFrames[currentFrame]}
					alt={`Frame ${currentFrame + 1}`}
					className="max-w-full max-h-full object-contain"
					style={{ imageRendering: 'pixelated' }}
					onError={() =>
						console.log(
							'Missing frame:',
							animationFrames[currentFrame]
						)
					}
				/>
			</div>

			{/* Frame Counter */}
			<div className="mt-4 bg-black/50 px-3 py-1 rounded text-white text-sm">
				Frame: {currentFrame + 1} / {totalFrames}
			</div>
			
		</div>
	);
};

const CharacterAnimation = () => {
	const [selectedAnimation, setSelectedAnimation] = useState('idle');
	const [selectedCharacter, setSelectedCharacter] = useState('dark_oracle');
	const [isPlaying, setIsPlaying] = useState(true);

	// Available characters
	const characters = {
		dark_oracle: { name: 'Dark Oracle', folder: 'dark_oracle' },
		balrock: { name: 'Balrock', folder: 'balrock' },
		armageddon: { name: 'Armageddon', folder: 'armageddon' },
		bonechill: { name: 'Bonechill', folder: 'bonechill' },
		brutus: { name: 'Brutus', folder: 'brutus' },
		murgash: { name: 'Murgash', folder: 'murgash' },
		mystic: { name: 'Mystic', folder: 'mystic' },
		urkul: { name: 'Urkul', folder: 'urkul' },
		chaos: { name: 'Chaos', folder: 'chaos' }
	};

	// Available animations with frame counts
	const animationData = {
		idle: { name: 'Idle', frames: 18, duration: 2000 },
		idle_blinking: { name: 'Idle Blinking', frames: 18, duration: 2200 },
		walk: { name: 'Walking', frames: 24, duration: 800 },
		run: { name: 'Running', frames: 12, duration: 600 },
		slash: { name: 'Slashing', frames: 12, duration: 800 },
		air_slash: { name: 'Air Slash', frames: 12, duration: 800 },
		air_throw: { name: 'Air Throw', frames: 12, duration: 800 },
		die: { name: 'Die', frames: 15, duration: 800 },
		fall: { name: 'Fall', frames: 6, duration: 800 },
		hurt: { name: 'Hurt', frames: 12, duration: 800 },
		jump_start: { name: 'Jump Start', frames: 6, duration: 800 },
		jump_loop: { name: 'Jump Loop', frames: 6, duration: 800 },
		kick: { name: 'Kick', frames: 12, duration: 800 },
		run_slash: { name: 'Run Slash', frames: 12, duration: 800 },
		run_throw: { name: 'Run Throw', frames: 12, duration: 800 },
		slide: { name: 'Slide', frames: 6, duration: 800 },
		throw: { name: 'throw', frames: 6, duration: 800 }
	};

/*
4K photorealistic full body image of a mysterious person wearing a dark navy robe with a navy blue hood with intricate golden ornamental patterns around the edge, that shadows their face. They have large, striking eyes with an otherworldly luminous white glow emanating from within the irises. Intricate golden ornamental tattoos or body paint cover their visible skin in swirling, baroque patterns - flowing decorative designs around the eyes, forehead, and any exposed areas. The golden markings have a metallic sheen and appear to be ceremonial or mystical in nature. The person has a slender build and appears to be wearing dark robes or clothing with golden embellishments. Dramatic cinematic lighting emphasises the contrast between the dark hood and the glowing eyes. Professional photography quality, ultra-detailed skin textures, realistic fabric rendering, moody atmospheric lighting, fantasy style
*/
	// Generate animation frames for selected character
	const getCurrentAnimation = () => {
		const character = characters[selectedCharacter];
		const animation = animationData[selectedAnimation];

		if (!character || !animation) {
			return { name: 'Unknown', frames: [], duration: 1000 };
		}

		return {
			name: animation.name,
			frames: Array.from({ length: animation.frames }, (_, i) => {
				const framePath = `/assets/sprites/${character.folder}/${selectedAnimation}/${selectedAnimation}_${String(i).padStart(3, '0')}.png`;
				console.log('Loading frame:', framePath);
				return framePath;
			}),
			duration: animation.duration,
		};
	};

	const currentAnimation = getCurrentAnimation();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-4">
						Character Animation Viewer
					</h1>
					<p className="text-gray-300">
						{characters[selectedCharacter]?.name} Sprite Animations
					</p>
				</div>

				{/* Character Selection */}
				<div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8">
					<h3 className="text-xl font-bold text-white mb-6 text-center">
						Select Character
					</h3>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						{Object.entries(characters).map(([key, character]) => (
							<button
								key={key}
								onClick={() => setSelectedCharacter(key)}
								className={`p-4 rounded-lg font-bold transition-all duration-200 ${
									selectedCharacter === key
										? 'bg-purple-600 text-white transform scale-105 ring-2 ring-purple-400'
										: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
								}`}
							>
								<div className="text-sm">{character.name}</div>
								<div className="text-xs opacity-75 mt-1">
									{character.folder}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Main Display Panel */}
				<div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
					<div className="text-center">
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-white mb-2">
								{characters[selectedCharacter]?.name} -{' '}
								{currentAnimation.name}
							</h2>
							<div className="text-gray-300">
								{currentAnimation.frames.length} frames •{' '}
								{currentAnimation.duration}ms duration
							</div>
						</div>

						<div className="columns-2">
							{/* Character Image*/}
							<div className="mb-6 flex justify-center items-center ">
								<img className="max-w-sm" src={`/assets/characters/profile/${characters[selectedCharacter]?.folder}.jpg`}></img>
							</div>

							{/* Sprite Display */}
							<div className="flex justify-center mb-6">
								<SpriteViewer
									animationFrames={currentAnimation.frames}
									duration={currentAnimation.duration}
									isPlaying={isPlaying}
									scale={6}
								/>
								
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
							{Object.entries(animationData).map(
								([key, animation]) => (
									<button
										key={key}
										onClick={() => setSelectedAnimation(key)}
										className={`p-4 rounded-lg font-bold transition-all duration-200 ${
											selectedAnimation === key
												? 'bg-blue-600 text-white transform scale-105'
												: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
										}`}
									>
										<div className="text-sm">
											{animation.name}
										</div>
										<div className="text-xs opacity-75 mt-1">
											{animation.frames}f •{' '}
											{animation.duration}ms
										</div>
									</button>
								)
							)}
						</div>
					</div>
				</div>

				{/* Animation Controls */}
				<div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8">
					<div className="flex justify-center items-center space-x-4">
						<button
							onClick={() => setIsPlaying(!isPlaying)}
							className={`font-bold py-3 px-6 rounded-lg flex items-center space-x-2 ${
								isPlaying
									? 'bg-red-600 hover:bg-red-500'
									: 'bg-green-600 hover:bg-green-500'
							} text-white`}
						>
							{isPlaying ? (
								<Pause className="w-5 h-5" />
							) : (
								<Play className="w-5 h-5" />
							)}
							<span>{isPlaying ? 'Pause' : 'Play'}</span>
						</button>

						<button
							onClick={() => window.location.reload()}
							className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2"
						>
							<RotateCcw className="w-5 h-5" />
							<span>Reset</span>
						</button>
					</div>
				</div>

				{/* File Structure Guide */}
				<div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
					<h3 className="text-lg font-bold text-white mb-4">
						File Structure Setup
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-bold text-blue-400 mb-2">
								Required Folder Structure
							</h4>
							<pre className="bg-gray-800 p-4 rounded text-sm text-gray-300 overflow-x-auto">
								{`shared/assets/sprites/
├── dark_oracle/
│   ├── idle/
│   │   ├── idle_000.png
│   │   ├── idle_001.png
│   │   └── ... (18 frames)
│   ├── walking/
│   │   ├── walking_000.png
│   │   └── ... (8 frames)
│   └── slashing/
├── green_orc/
│   ├── idle/
│   └── walking/
└── fire_wizard/
    └── ...`}
							</pre>
						</div>
						<div>
							<h4 className="font-bold text-green-400 mb-2">
								Adding New Characters
							</h4>
							<ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
								<li>
									Create character folder:{' '}
									<code className="bg-gray-800 px-1 rounded">
										sprites/character_name/
									</code>
								</li>
								<li>
									Add animation folders:{' '}
									<code className="bg-gray-800 px-1 rounded">
										idle/
									</code>
									,{' '}
									<code className="bg-gray-800 px-1 rounded">
										walking/
									</code>
									, etc.
								</li>
								<li>
									Name files:{' '}
									<code className="bg-gray-800 px-1 rounded">
										animation_000.png
									</code>
									,{' '}
									<code className="bg-gray-800 px-1 rounded">
										animation_001.png
									</code>
								</li>
								<li>Update characters object in code</li>
								<li>Refresh and select new character!</li>
							</ol>

							<div className="mt-4">
								<h5 className="font-bold text-yellow-400 mb-2">
									Current Character
								</h5>
								<p className="text-sm text-gray-300">
									<strong>Selected:</strong>{' '}
									{characters[selectedCharacter]?.name}
									<br />
									<strong>Folder:</strong>{' '}
									{characters[selectedCharacter]?.folder}
									<br />
									<strong>Animation:</strong>{' '}
									{currentAnimation.name} (
									{currentAnimation.frames.length} frames)
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.bg-checkered {
					background-image:
						linear-gradient(45deg, #4b5563 25%, transparent 25%),
						linear-gradient(-45deg, #4b5563 25%, transparent 25%),
						linear-gradient(45deg, transparent 75%, #4b5563 75%),
						linear-gradient(-45deg, transparent 75%, #4b5563 75%);
					background-size: 8px 8px;
					background-position:
						0 0,
						0 4px,
						4px -4px,
						-4px 0px;
				}
			`}</style>
		</div>
	);
};

export default CharacterAnimation;
