import { Character } from '@shared/types/character';

interface Ability {
    damage?: number;
    ability_type?: string;
    stamina_cost?: number;
    mana_cost?: number;
}

export const basic_attack = (attacker: Character, defender: Character, ability: Ability) => {
    let damage = 0;
    const damageMultiplier = ability.damage || 1.0;

    if (ability.ability_type === 'physical_attack') {
        damage = Math.max(0, (attacker.physical_attack || 0) - (defender.physical_defence || 0)) * damageMultiplier;
    } else if (ability.ability_type === 'magic_attack') {
        damage = Math.max(0, (attacker.magic_attack || 0) - (defender.magic_defence || 0)) * damageMultiplier;
    }
    
    const newDefenderHealth = Math.max(0, (defender.health || 0) - damage);

    return {
        damage,
        newDefenderHealth,
    };
};

export const basic_heal = (healer: Character) => {
    const newHealerHealth = Math.min(healer.max_health || 0, (healer.health || 0) + (healer.health_recovery || 0));
    return { newHealerHealth };
}