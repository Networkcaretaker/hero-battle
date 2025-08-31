// ./shared/types/character.ts

export interface Character {
	// Character Details
	character_id: string; // Unique character identifier
	character_name: string; // Display name of the character
	character_description: string; // Flavor text/background description
    character_race_id: CharacterRaces; // References shared CharacterRace definition
	character_class_id: CharacterClasses; // References shared CharacterClass definition  
	character_role_id: CharacterRoles; // References shared CharacterRole definition

	// Experience
    character_xp: number; // Total XP accumulated
	character_level: number; // Current level (1-100)
	character_rank: number; // Current rank for stat multipliers
	current_level_xp: number; // XP earned towards next level (e.g., 480 out of 500)
	xp_to_next_level: number; // XP still needed for next level (e.g., 20)

	/* Primary Stats */
    // Primary Stats: Base Stats (stored - from race + class)
	base_strength: number; // character_race.strength + character_class.strength
	base_intelligence: number; // character_race.intelligence + character_class.intelligence
	base_agility: number; // character_race.agility + character_class.agility
	base_magic: number; // character_race.magic + character_class.magic

	// Primary Stats: Stat Points (stored - earned from leveling)
	strength_points: number; // Player-allocated points (3 per level earned)
	intelligence_points: number; // Player-allocated points (3 per level earned)
	agility_points: number; // Player-allocated points (3 per level earned)
	magic_points: number; // Player-allocated points (3 per level earned)

	// Primary Stats: Bonus Stats (stored - from equipment/traits, calculated outside battle)
	bonus_strength: number; // From weapons, armour, items, traits
	bonus_intelligence: number; // From weapons, armour, items, traits
	bonus_agility: number; // From weapons, armour, items, traits
	bonus_magic: number; // From weapons, armour, items, traits

	// Primary Stats: Character Stats (stored - calculated at level up, or when a bonus is added)
	strength: number; // (((base_strength * character_level) + strength_points + character_level) * character_rank) + bonus_strength
	intelligence: number; // (((base_intelligence * character_level) + intelligence_points + character_level) * character_rank) + bonus_intelligence
	agility: number; // (((base_agility * character_level) + agility_points + character_level) * character_rank) + bonus_agility
	magic: number; // (((base_magic * character_level) + magic_points + character_level) * character_rank) + bonus_magic

	// Primary Stats: Battle Stats (calculated during battle - can change with status effects)
	battle_strength: number; // strength + temporary_effects
	battle_intelligence: number; // intelligence + temporary_effects
	battle_agility: number; // agility + temporary_effects
	battle_magic: number; // magic + temporary_effects

	// Primary Stats: Character Power (stored - used for game calculations outside battle)
	total_power: number; // strength + intelligence + agility + magic

	/* Energy Stats */
	// Energy Stats: Base Energy (calculated from primary stats)
	base_health: number; // (strength + intelligence) * level * rank
	base_stamina: number; // agility * level * rank
	base_mana: number; // magic * level * rank

	// Energy Stats: Bonus (from external sources)
	bonus_health: number; // From weapons, armour, items, traits
	bonus_stamina: number; // From weapons, armour, items, traits
	bonus_mana: number; // From weapons, armour, items, traits

	// Energy Stats: Total Energy (base + bonus - the character's actual energy pools)
	health: number; // base_health + bonus_health
	stamina: number; // base_stamina + bonus_stamina
	mana: number; // base_mana + bonus_mana

	// Energy Stats: Battle Energy (battle state - reset to health/stamina/mana at battle start)
	battle_health: number; // Current HP during battle (can decrease from damage)
	battle_stamina: number; // Current stamina during battle (consumed by abilities)
	battle_mana: number; // Current mana during battle (consumed by spells)

	// Energy Stats: Max Energy (battle limits - can be modified by abilities/status effects)
	max_health: number; // Maximum HP during battle (health + temporary_effects)
	max_stamina: number; // Maximum stamina during battle (stamina + temporary_effects)
	max_mana: number; // Maximum mana during battle (mana + temporary_effects)

	// Energy Stats: Bonus Energy Recovery
	bonus_health_recovery: number; // From weapons, armour, items, traits, skills
	bonus_stamina_recovery: number; // From weapons, armour, items, traits, skills
	bonus_mana_recovery: number; // From weapons, armour, items, traits, skills

	// Energy Stats: (fixed rates calculated outside battle, used when resting during battle)
	health_recovery: number; // recovery when resting: (health * 0.1) + bonus_health_recovery
	stamina_recovery: number; //  recovery when resting: (stamina * 0.1) + bonus_stamina_recovery
	mana_recovery: number; //  recovery when resting: (mana * 0.1) + bonus_mana_recovery

	/* Battle Power Stats */
	// Battle Power Stats: Base
	base_physical_attack: number; // character_race.physical_attack
	base_magic_attack: number; // character_race.magic_attack
	base_physical_defence: number;// character_race.physical_defence
	base_magic_defence: number;// character_race.magic_defence

	// Battle Power Stats: Base
	bonus_physical_attack: number; // From weapons, armour, items, traits, skills
	bonus_magic_attack: number; // From weapons, armour, items, traits, skills
	bonus_physical_defence: number; // From weapons, armour, items, traits, skills
	bonus_magic_defence: number; // From weapons, armour, items, traits, skills

	// Battle Power Stats: Calculated
	physical_attack: number; // ((strength + (agility * level) + (base_physical_attack * level)) * rank) + bonus_physical_attack
	magic_attack: number; // ((intelligence + (magic * level) + (base_magic_attack * level)) * rank) + bonus_magic_attack
	physical_defence: number; // ((agility + (strength * level) + (base_physical_defence * level)) * rank) + bonus_physical_defence
	magic_defence: number; // ((magic + (intelligence * level) + (base_magic_defence * level)) * rank) + bonus_magic_defence
	
	// Battle Power Stats: Defence Penitration and resistance
	armour_penitration: number; // From weapons, armour, items, traits, skills
	magic_penitration: number; // From weapons, armour, items, traits, skills
	magic_resistance: number; // From weapons, armour, items, traits, skills

	// Attributes
	skills: CharacterSkill[]; // References skills with current skill level 
	traits: CharacterTrait[]; // References traits with current trait power and current cooldown and is_active
	abilities: CharacterAbility[]; // References abilities with current cooldown
	ultimate_ability_id: CharacterAbility; // References Ultimate ability with current cooldown

	// Equipment
	weapon_id: Weapon; // References shared Weapon definition
	armour_id: Armour; // References shared Armour definition

	// Battle Attributes
	position: [number, number]; // [x, y] coordinates on the battle grid
	status_effects: CharacterStatusEffect[]; // References active status effects with current duration
	action_points: number; // start with 2 at beguining of turn, can be modified with status effects
	ultimate_energy: number; // 1-100 percent based, energy is gained during battles and used for Ultimate ability
	
	// Character Flags
	flags: CharacterFlags;
}

// Character Race
export interface CharacterRace {
	readonly race_id: CharacterRaces; // Unique ID referencing CharacterRaces
	readonly race_name: string; // race_id.toUpperCase()
    readonly race_description: string; // A description of the race
    readonly strength: number; // Base strength and stat bonus per level
    readonly intelligence: number; // Base intelligence and stat bonus per level
    readonly agility: number; // Base agility and stat bonus per level
    readonly magic: number; // Base magic and stat bonus per level
    readonly skills?: string[]; // IDs referencing skill definitions
    readonly traits?: string[]; // IDs referencing trait definitions
    readonly abilities?: string[]; // IDs referencing ability definitions
}
export enum CharacterRaces {
	HUMAN = "human",
	DWARF = "dwarf",
	ELF = "elf", 
	ORC = "orc"
}

// Character Class
export interface CharacterClass {
	readonly class_id: CharacterClasses; // Unique ID referencing CharacterClasses
	readonly class_name: string; // class_id.toUpperCase()
    readonly class_description: string; // A description of the class
    readonly strength: number; // Base strength and stat bonus per level
    readonly intelligence: number; // Base intelligence and stat bonus per level
    readonly agility: number; // Base agility and stat bonus per level
    readonly magic: number; // Base magic and stat bonus per level
    readonly skills?: string[]; // IDs referencing skill definitions
    readonly traits?: string[]; // IDs referencing trait definitions
    readonly abilities?: string[]; // IDs referencing ability definitions
}
export enum CharacterClasses {
	MAGE = "Mage",
	BRAWLER = "Brawler",
	ROUGE = "Rouge",
	HEALER = "Healer",
	COMMANDER = "Commander"
}

// Character Role
export interface CharacterRole {
	readonly role_id: CharacterRoles; // Unique ID referencing CharacterRoles
	readonly role_name: string; // role_id.toUpperCase()
    readonly role_description: string; // A description of the role
    readonly bonus_stats: Array<{ stat: string; value: number; }>;
    readonly skills?: string[]; // IDs referencing skill definitions
    readonly traits?: string[]; // IDs referencing trait definitions
    readonly abilities?: string[]; // IDs referencing ability definitions
}
export enum CharacterRoles {
	TANK = "Tank", 
	WARRIOR = "Warrior", 
	MARKSMAN = "Marksman", 
	SUPPORT = "Support",
	CONTROL = "Control"
}

// Character Trait
export interface CharacterTrait {
    trait_id: CharacterTraits; // References shared trait definition
    base_trait_power: number; // Invested power from player resources
    bonus_trait_power: number; // Bonus power from equipment/items
    trait_power: number; // Total power: base_trait_power + bonus_trait_power
    current_cooldown: number; // Turns remaining before can activate again (0 = ready)
    is_active: boolean; // Whether trait is currently available (from equipped items/etc)
}
// Shared trait definitions (stored in game data JSON)
export interface TraitDefinition {
    readonly trait_id: CharacterTraits; // Unique identifier
    readonly trait_name: string; // Display name ("Lucky", "Critical Hit")
    readonly trait_description: string; // What the trait does
    readonly status_effect_id: string; // Status effect this trait activates
    readonly duration: number; // How many turns the status effect lasts
    readonly cooldown: number; // How many turns before trait can activate again
}
export enum CharacterTraits {
	LUCKY = "Lucky", // adds lucky status effect
	UNLUCKY = "Unlucky", // adds unlucky status effect
	BRUTAL = "Brutal", // adds critical_hit status effect
	PROTECTOR = "Protector", // adds block status effect
	AGILE = "Agile" // applies dodge status effect
}

// Character's skill instances
export interface CharacterSkill {
    skill_id: string; // References shared skill definition
    skill_level: number; // Current level (1-10)
}
// Shared skill definitions (stored in game data JSON)
export interface SkillDefinition {
    readonly skill_id: string; // Unique identifier
    readonly skill_name: string; // Display name ("Sword Master", "Heavy Armour")
    readonly skill_description: string; // What the skill does
    readonly skill_category: string; // "Weapon", "Armour", "Magic", etc.
    readonly bonuses?: SkillBonus[]; // Stat bonuses this skill provides
    readonly requirments?: SkillRequirements; // Stat bonuses this skill provides
	
}
// Skill requirements for equipment/abilities
export interface SkillRequirements {
    skill_id: string; // Required skill
    minimum_level?: number; // Minimum skill level needed (1-10)
    race_id?: string; // Optional race requirement
    class_id?: string; // Optional class requirement  
    role_id?: string; // Optional role requirement
}
// Skill bonuses
export interface SkillBonus {
    stat: string; // "strength", "bonus_physical_attack", etc.
    value: number; // Bonus amount per level
}
export enum CharacterSkills {
	LIGHT_ARMOUR = "Light_Armour",
	HEAVY_ARMOUR = "Heavy_Armour",
	SHORT_SWORD = "Short_Sword",
	LONG_SWORD = "Long_Sword",
	BOW = "Bow",
	SPELLS = "Spells"
}

// Character's ability instances
export interface CharacterAbility {
    ability_id: string; // References shared ability definition
    current_cooldown: number; // Turns remaining before can use again (0 = ready)
}
export interface AbilityDefinition {
    readonly ability_id: string; // Unique identifier
    readonly ability_name: string; // Display name ("Fireball", "Heal", "Power Strike")
    readonly ability_description: string; // What the ability does
    readonly ability_type: AbilityTypes; // What the ability does
    // Damage, healing and energy recovery - these are calculated at runtime
    damage?: number; // e.g. "physical_attack * 1.0", "magic_attack * 0.2"
    healing?: number; // e.g. "magic_attack * 0.1"
    recover_stamina?: number; // e.g. "intelligence * 0.1"
	recover_mana?: number; // e.g. "intelligence * 0.1"
    // Targeting and Range
    readonly range: number; // How far the ability can reach (tiles)
    readonly aoe: boolean; // Whether it affects multiple targets
    readonly aoe_range?: number; // Radius of area effect
	readonly damage_target?: string; // Who can be targeted ('ally' | 'enemy' | 'self' | 'allies' | 'enemies')
	readonly healing_target?: string; // Who can be targeted ('ally' | 'enemy' | 'self' | 'allies' | 'enemies')
	readonly recovery_target?: string; // Who can be targeted ('ally' | 'enemy' | 'self' | 'allies' | 'enemies')
	readonly status_target?: string; // Who can be targeted ('ally' | 'enemy' | 'self' | 'allies' | 'enemies')
    // Resource Costs
    readonly mana_cost: number; // Mana required to use
    readonly stamina_cost: number; // Stamina required to use
    readonly cooldown: number; // Turns before usable again 
    // Status Effects
    readonly apply_status?: string; // Status effect ID to apply (optional)
    readonly status_duration: number; // How long status effect lasts
}
export enum AbilityTypes {
	ULTIMATE = "Ultimate",
	PHYSICAL = "Physical Attack",
	MAGICAL = "Magic Attack",
	RANGED = "Ranged Attack",
	HEAL = "Healing",
	RECOVER = "Recovery",
	BUFF = "Status Effect"
}

// Character's active status effects
export interface CharacterStatusEffect {
    status_effect_id: string;             // References StatusEffectDefinition
    remaining_duration: number;           // Turns left before effect expires
    stack_count: number;                  // How many times this effect is stacked (default 1)
}
// Status effect definitions
export interface StatusEffectDefinition {
    readonly status_effect_id: string;    // Unique identifier
    readonly status_name: string;         // Display name ("Poisoned", "Stunned", etc.)
    readonly status_description: string;  // What the effect does
    readonly status_type: StatusType;     // Buff, Debuff, or Neutral
    
    // Effect properties
    readonly damage_per_turn?: number;    // Damage dealt each turn (poison)
    readonly healing_per_turn?: number;   // Healing done each turn (regeneration)
    readonly prevents_movement: boolean;  // Blocks movement (stun, root)
    readonly prevents_actions: boolean;   // Blocks abilities (stun, silence)
    
    // Stat modifications (applied while active)
    readonly stat_modifiers?: Array<{
        stat: string;                     // Which stat to modify
        modifier_type: 'multiply' | 'add'; // How to apply the modifier
        value: number;                    // Amount (0.5 for half, 10 for +10, etc.)
    }>;
    
    readonly max_stacks: number;          // Maximum times this can stack (1 = no stacking)
    readonly is_removable: boolean;       // Can be cleansed/dispelled
}
// Status effect types
export enum StatusType {
    BUFF = "Buff",         // Positive effects
    DEBUFF = "Debuff",     // Negative effects  
    NEUTRAL = "Neutral"    // Neither positive nor negative
}
export enum CharacterStatusEffects {
	LUCKY = "Lucky", 
	UNLUCKY = "Unlucky",
	CRITICAL = "Critical_Hit",
	BLOCK = "Block",
	DODGE = "Dodge",
	POISONED = "Poisoned",
	STUNNED = "Stunned",
	WEAKENED = "Weakend",
	STRENGTHENED = "Strengthened"
}

// Character Flags
export interface CharacterFlags {
    is_xp_capped: boolean;           // XP gain blocked due to player level or max level
    can_level_up: boolean;           // Has enough XP and player level allows leveling
    is_max_level: boolean;           // Character reached level cap (100)
    needs_stat_allocation: boolean;   // Has unspent stat points (for future)
    has_equipment_upgrade: boolean;   // Equipment can be upgraded (for future)
    is_battle_ready: boolean;        // Character is healthy/ready for battle (for future)
}

// XP Lookup Table (will be in game data JSON)
export interface LevelRequirement {
    level: number;
    total_xp_required: number;      // Total XP needed to reach this level
    xp_from_previous: number;       // XP needed from previous level
}

// Battle XP (separate from character)
export interface BattleXPResult {
    character_id: string;
    battle_id: string;
    xp_earned: number;              // XP that would be gained
    xp_applied: number;             // Actual XP added (may be 0 if capped)
    xp_sources: Array<{
        source: 'skill_use' | 'ability_use' | 'enemy_defeated' | 'battle_victory' | 'bonus';
        amount: number;
        description: string;
    }>;
    was_capped: boolean;            // True if XP was blocked due to player level
    cap_reason: 'player_level' | 'max_level' | 'none';
}

// Item rarity enum
export enum ItemRarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon", 
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary"
}

// Weapon Interface
export interface Weapon {
	weapon_id: string;                     // Unique weapon identifier
    weapon_name: string;                   // Display name
    weapon_type: string;                   // "Sword", "Staff", "Bow", "Axe", etc.
    weapon_description: string;            // Flavor text
    weapon_level: number;                  // Required level to use
	weapon_rarity: ItemRarity;             // Quality/rarity of the weapon
    weapon_durability: number;             // Current durability (0 = broken)
    max_durability: number;                // Maximum durability when new
    weapon_damage: number;                 // Base damage bonus for abilities
    // Stat bonuses the weapon provides
    bonus_stats: Array<{
        stat: string;                      // "strength", "bonus_physical_attack", etc.
        value: number;                     // Bonus amount
    }>;
    // Abilities and traits granted by this weapon
    traits: string[];                      // Trait IDs this weapon grants
    abilities: string[];                   // Ability IDs this weapon grants
    // Requirements to use this weapon
    requirements: WeaponRequirements;
}
// Weapon requirements
export interface WeaponRequirements {
    minimum_level?: number;                // Character level requirement
    required_skills?: Array<{              // Required weapon skills
        skill_id: string;
        minimum_level: number;
    }>;
    required_race?: string;                // Race restriction (optional)
    required_class?: string;               // Class restriction (optional)
    required_role?: string;                // Role restriction (optional)
}

// Armour interface
export interface Armour {
    armour_id: string;                     // Unique armour identifier
    armour_name: string;                   // Display name
    armour_type: string;                   // "Light", "Heavy", "Robes", "Leather", etc.
    armour_description: string;            // Flavor text
    armour_level: number;                  // Reference level for UI display
    armour_rarity: ItemRarity;             // Quality/rarity of the armour
    armour_durability: number;             // Current durability (0 = broken)
    max_durability: number;                // Maximum durability when new
    armour_protection: number;             // Base protection bonus
    
    // Stat bonuses the armour provides
    bonus_stats: Array<{
        stat: string;                      // "defense", "bonus_physical_defence", etc.
        value: number;                     // Bonus amount
    }>;
    
    // Abilities and traits granted by this armour
    traits: string[];                      // Trait IDs this armour grants
    abilities: string[];                   // Ability IDs this armour grants
    
    // Requirements to use this armour
    requirements: ArmourRequirements;
}
// Armour requirements
export interface ArmourRequirements {
    minimum_level?: number;                // Character level requirement
    required_skills?: Array<{              // Required armour skills
        skill_id: string;
        minimum_level: number;
    }>;
    required_race?: string;                // Race restriction (optional)
    required_class?: string;               // Class restriction (optional)
    required_role?: string;                // Role restriction (optional)
}

// To add to character: pedigree, division, species, faction, runes, glyphs, rings, amulets, sheilds, relics