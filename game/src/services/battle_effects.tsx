import React from 'react';

interface EffectProps {
    color: 'red' | 'purple' | 'yellow';
}

export const BattleEffect: React.FC<EffectProps> = ({ color }) => {
    const colorClasses = {
        red: 'bg-red-500/50',
        purple: 'bg-purple-500/50',
        yellow: 'bg-yellow-500/50',
    }
    return (
        <div className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-ping`}></div>
    );
};
