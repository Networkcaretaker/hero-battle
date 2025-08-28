import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GRID_ROWS = 8;
const GRID_COLS = 12;

const BattleView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTile, setSelectedTile] = useState<{ x: number; y: number } | null>(null);
    const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);

    // Get selected character from navigation state (if coming from character view)
    const selectedCharacter = location.state?.selectedCharacter;

    const handleTileClick = (x: number, y: number) => {
        setSelectedTile({ x, y });
    };

    const handleTileHover = (x: number, y: number) => {
        setHoveredTile({ x, y });
    };

    const handleTileLeave = () => {
        setHoveredTile(null);
    };

    const handleBackToMenu = () => {
        navigate('/');
    };

    const getTileClass = (x: number, y: number) => {
        let baseClass = "w-12 h-12 border border-gray-600 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-bold";
        
        // Alternating tile colors (checkerboard pattern)
        if ((x + y) % 2 === 0) {
            baseClass += " bg-green-800";
        } else {
            baseClass += " bg-green-700";
        }

        // Selected tile
        if (selectedTile && selectedTile.x === x && selectedTile.y === y) {
            baseClass += " ring-2 ring-yellow-400 bg-yellow-600";
        }
        
        // Hovered tile
        else if (hoveredTile && hoveredTile.x === x && hoveredTile.y === y) {
            baseClass += " bg-blue-500";
        }

        return baseClass;
    };

    const renderGrid = () => {
        const grid = [];
        
        for (let y = 0; y < GRID_ROWS; y++) {
            const row = [];
            for (let x = 0; x < GRID_COLS; x++) {
                row.push(
                    <div
                        key={`${x}-${y}`}
                        className={getTileClass(x, y)}
                        onClick={() => handleTileClick(x, y)}
                        onMouseEnter={() => handleTileHover(x, y)}
                        onMouseLeave={handleTileLeave}
                    >
                        {/* Grid coordinates (for development) */}
                        <span className="text-gray-400 opacity-50">
                            {x},{y}
                        </span>
                    </div>
                );
            }
            grid.push(
                <div key={y} className="flex">
                    {row}
                </div>
            );
        }
        
        return grid;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-white mb-2">BATTLE ARENA</h1>
                    <p className="text-gray-300">Tactical combat grid</p>
                </div>

                {/* Back Button */}
                <div className="mb-4">
                    <button
                        onClick={handleBackToMenu}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                        ← Back to Main Menu
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Battle Grid */}
                    <div className="flex-1">
                        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-4">Battle Grid ({GRID_COLS} × {GRID_ROWS})</h2>
                            
                            <div className="inline-block border-2 border-gray-500 rounded-lg overflow-hidden">
                                {renderGrid()}
                            </div>

                            {/* Grid Info */}
                            <div className="mt-4 text-sm text-gray-400">
                                <p>Click on tiles to select them</p>
                                {selectedTile && (
                                    <p>Selected: ({selectedTile.x}, {selectedTile.y})</p>
                                )}
                                {hoveredTile && (
                                    <p>Hovering: ({hoveredTile.x}, {hoveredTile.y})</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Battle Info Panel */}
                    <div className="lg:w-80">
                        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-4">Battle Status</h2>
                            
                            {/* Selected Character Info */}
                            {selectedCharacter && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">Selected Character</h3>
                                    <div className="bg-blue-900/30 rounded-lg p-3">
                                        <p className="text-blue-300 font-medium">{selectedCharacter.Name}</p>
                                        <p className="text-gray-300 text-sm">{selectedCharacter.Race} {selectedCharacter.Class}</p>
                                        <p className="text-gray-300 text-sm">Role: {selectedCharacter.Role}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Turn Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-2">Current Turn</h3>
                                <div className="bg-gray-800 rounded-lg p-3">
                                    <p className="text-gray-300 text-sm">Waiting for battle to start...</p>
                                </div>
                            </div>

                            {/* Team Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-2">Teams</h3>
                                
                                {/* Heroes */}
                                <div className="bg-blue-900/30 rounded-lg p-3 mb-3">
                                    <h4 className="text-blue-300 font-medium mb-1">Heroes (Left Side)</h4>
                                    <p className="text-gray-300 text-sm">No characters positioned</p>
                                </div>

                                {/* Villains */}
                                <div className="bg-red-900/30 rounded-lg p-3">
                                    <h4 className="text-red-300 font-medium mb-1">Villains (Right Side)</h4>
                                    <p className="text-gray-300 text-sm">No characters positioned</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors duration-200 opacity-50 cursor-not-allowed">
                                        Start Battle
                                    </button>
                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors duration-200 opacity-50 cursor-not-allowed">
                                        Position Characters
                                    </button>
                                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg transition-colors duration-200 opacity-50 cursor-not-allowed">
                                        End Turn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BattleView;