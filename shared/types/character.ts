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

	// Character Resistance and Weakness
	resistance: Array<{ stat: string; value: number; }>; // Percentage of resistance to physical damage, magic damage, fire magic, ice magic, bows, etc. Less damage
	weakness: Array<{ stat: string; value: number; }>; // Percentage of weakness to physical damage, magic damage, fire magic, ice magic, bows, etc. More damage.
	
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
    readonly bonus_stats: Array<{ stat: string; value: number; }>; // Bonus stats gained each level
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
// Traits give a chance of applying a status effect
// Traits can be activated when attacking and enemy, when an enemy attacks or both
// chance_of_success = CharacterTrait.traint_power / enemy.total_power
export interface CharacterTrait {
    trait_id: CharacterTraits; // Uniques ID from CharacterTraits
    base_trait_power: number; // Invested power from player resources (starts at 5)
    bonus_trait_power: number; // Bonus power from equipment/items
    trait_power: number; // Total power: base_trait_power + bonus_trait_power
    current_cooldown: number; // Turns remaining before can activate again (0 = ready)
    is_available: boolean; // Whether trait is currently available (from equipped items, class, race, role, etc)
    is_active: boolean; // Whether trait is currently active
	trait_source?: string; // Source of active trait (from equipment, race, role, class, etc)
}
// Shared trait definitions (stored in game data JSON)
export interface TraitDefinition {
    readonly trait_id: CharacterTraits; // Unique identifier
    readonly trait_name: string; // Display name ("Lucky", "Critical Hit") trait_id.toUpperCase()
    readonly trait_description: string; // A description of what the trait does
    readonly trait_target: string; // will apply the status effect to self, enemy, enemies, ally or allies
    readonly trait_activation: string; // When can a trait be activated (attack, defence, both)
    readonly status_effect_id: string; // Status effect this trait activates
    readonly duration: number; // How many turns the status effect lasts
    readonly cooldown: number; // How many turns before trait can activate again (default 3)
	readonly level: number; // required character level to allow trait 
}
export enum CharacterTraits {
	LUCKY = "lucky", // chance to apply lucky status effect to self for 2 turns
	UNLUCKY = "unlucky", // chance to apply lucky status effect to enemy for 2 turns
	VERY_LUCKY = "very_lucky", // chance to apply lucky status effect to allies (including self) for 1 turn
	VERY_UNLUCKY = "very_unlucky", // chance to apply lucky status effect to enemies for 1 turn
	BRUTAL = "brutal", // chance to apply critical_hit status effect to self for 2 turns
	LEADERSHIP = "leadership", // chance to apply critical_hit status effect to ally for 2 turns
	PROTECTOR = "protector", // chance to apply block status effect to self for 2 turns
	TACTICS = "battlefield_tactics", // chance to apply critical_hit status effect to allies for 1 turn
	AGILE = "agile", // chance to apply dodge status effect to self for 2 turns
	STRONG = "strong", // chance to apply strengthened status effect to self for 2 turns
	ENDURANCE = "endurance", // chance to apply endurance status effect to self for 2 turns
	ARCHER = "archer", // chance to apply archery status effect to self for 2 turns
	FITNESS = "fitness", // chance to apply haste status effect to self for 1 turn
	FIRST_AID = "first_aid", // chance to apply heal status effect to self for 2 turns
	TOXIC = "toxic", // chance to apply toxic status effect to self for 3 turns
	PAIN = "pain_tolerance", // chance to apply pain_tolerance status effect to self for 2 turns
	VENOMOUS = "venomous", // chance to apply poisoned status effect to enemy for 3 turns
	DISRUPTOR = "disruptor", // chance to apply stunned status effect to enemy for 1 turn
	STUBBORN = "stubborn", // chance to apply weakend status effect to enemy for 2 turns
	FOREST_WALKER = "forest_walker", // chance to apply slowed status effect to enemies for 1 turn
	ARCANE = "arcane_knowledge", // chance to apply arcane status effect to self for 2 turns
    SPELL_POWER = "spell_power", // chance to apply spell_power status effect to self for 2 turns
	FRAGILE = "fragile_body", // chance to apply fragile status effect to enemy for 3 turns
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
    race_ids?: string[]; // Optional race requirement
    class_ids?: string[]; // Optional class requirement  
    role_ids?: string[]; // Optional role requirement
}
// Skill bonuses
export interface SkillBonus {
    stat: string; // "strength", "bonus_physical_attack", etc.
    value: number; // Bonus amount per level
}
export enum CharacterSkills {
	LIGHT_ARMOUR = "light_armour",
	HEAVY_ARMOUR = "heavy_armour",
	SHORT_SWORD = "short_sword",
	LONG_SWORD = "long_sword",
	BOW = "bow",
	AXE = "axe",
	BATTLE_AXE = "battle_axe",
	SPELL = "spell"
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
    readonly min_level: number; // Minimum level required to use ability
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
    readonly apply_status?: string[]; // Status effect ID to apply (optional)
    readonly status_duration: number; // How long status effect lasts
	// Optional fields for complex abilities
	readonly damage_type?: "flat" | "percentage_current" | "percentage_max";
	readonly healing_type?: "flat" | "percentage_current" | "percentage_max";
	readonly recovery_type?: "flat" | "percentage_current" | "percentage_max";

}
export enum AbilityTypes {
	ULTIMATE = "ultimate",
	PHYSICAL = "physical_attack",
	MAGICAL = "magic_attack",
	RANGED = "ranged_ttack",
	HEALING = "healing",
	RECOVER = "recovery",
	BUFF = "status Effect"
}
export enum Abilities {
	"uppercut",
	"dwarven_blow",
	"elven_strike",
	"orc_bash"
}

// Character's active status effects
export interface CharacterStatusEffect {
    status_effect_id: string;             // References StatusEffectDefinition
    remaining_duration: number;           // Turns left before effect expires
    stack_count: number;                  // How many times this effect is stacked (default 1)
}
// Status effect definitions
export interface StatusEffectDefinition {
    readonly status_effect_id: string;
    readonly status_name: string;
    readonly status_description: string;
    readonly status_type: StatusType; // For UI color-coding/grouping
    readonly max_stacks?: number; // Default 1, only specify if different
    readonly is_removable?: boolean; // Default true, only specify if false
}
// Status effect types
export enum StatusType {
    BUFF = "Buff",         // Positive effects
    DEBUFF = "Debuff",     // Negative effects  
    NEUTRAL = "Neutral"    // Neither positive nor negative
}
export enum CharacterStatusEffects {
	// Positive Effects
	LUCKY = "lucky", // increases damage modifier for more of a chance at higher damage than base damage. {base_mod = (0.1, 0.8, 0.1), lucky_mod = (0, 0.5, 0.5)}
	CRITICAL = "critical_hit", // critical hit chance for damage multiplier 1.2 | 1.3 | 1.4 | 1.5 | 2 | 3 | 5 ... more damage
	BLOCK = "block", // chance to block incoming damage, damage multiplier 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 1 ... less damage
	DODGE = "dodge", // 50% chance to dodge attack
	STRENGTHENED = "strengthened", // +20% Strength
	ENDURANCE = "endurance", // +1 action point + 100 max_stamina
	HASTE = "haste", // +1 action point
	HEAL = "heal",
	PAIN = "pain_tolerance",
	ARCANE = "arcane_knowledge",
    SPELL_POWER = "spell_power",
	ARCHERY = "archery",
	// Neutral Effects
	TOXIC = "toxic", // any enemy withing a range of 1 gets damage of 10% health
	// Negative Effects
	UNLUCKY = "unlucky", // decreases damage modifier for more of a chance at less damage than base damage. {base_mod = (0.1, 0.8, 0.1), nulucky_mod = (0.5, 0.5, 0)}
	POISONED = "poisoned",
	STUNNED = "stunned",
	WEAKENED = "weakend",
	SLOWED = "slowed",
	FRAGILE = "fragile",
	VITALITY_DRAIN = "max_health_reduced"
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

// Damage Types (important for extra damage calculations including resistance and weakness effects)#
// Some abilities can have multiple damage types eg: damage = {magical_damage:5, fire_damage:20} (although the values will be calculated based on character stats)
export enum DamageType {
	PHYSICAL = "physical_damage",
	MAGIC = "magical_damage",
	PURE = "pure_damage",
	FIRE = "fire_damage",
	ICE = "ice_damage",
	EARTH = "earth_damage",
	AIR = "air_damage",
	DARK = "dark_magic_damage",
	LIGHT = "light_magic_damage",
	RANGE = "Range_damage",
	STAMINA = "stamina_drain",
	MANA = "mana_drain",
	ENERGY = "energy_drain",
	ULTIMATE = "ultimate_damage"
}

// To add to character: pedigree, division, species, faction, runes, glyphs, rings, amulets, sheilds, relics
