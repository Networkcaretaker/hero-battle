import { Character, CharacterRaces, CharacterClasses, CharacterRoles, CharacterTraits } from '../types/character';

export const load_characters: Character[] = [
  {
    character_id: "balrock",
    character_name: "Balrock",
    character_description: "A massive orc warrior with scars covering his muscled frame. Balroc has dedicated his life to perfecting the art of defense, using his intimidating presence and unbreakable will to protect his allies while drawing enemy fire.",
    character_race_id: CharacterRaces.ORC,
    character_class_id: CharacterClasses.BRAWLER, 
    character_role_id: CharacterRoles.TANK,

    character_xp: 0,
    character_level: 1,
    character_rank: 1,
    current_level_xp: 0,
    xp_to_next_level: 100,

    base_strength: 5,
    base_intelligence: 1,
    base_agility: 3,
    base_magic: 1,

    strength_points: 0,
    intelligence_points: 0,
    agility_points: 0,
    magic_points: 0,

    bonus_strength: 0,
    bonus_intelligence: 0,
    bonus_agility: 0,
    bonus_magic: 0,

    strength: 5,
    intelligence: 1,
    agility: 3,
    magic: 1,

    battle_strength: 5,
    battle_intelligence: 1,
    battle_agility: 3,
    battle_magic: 1,

    total_power: 10,

    base_health: 6,
    base_stamina: 3,
    base_mana: 1,

    bonus_health: 50,
    bonus_stamina: 0,
    bonus_mana: 0,

    health: 56,
    stamina: 5,
    mana: 3,

    battle_health: 56,
    battle_stamina: 5,
    battle_mana: 3,

    max_health: 56,
    max_stamina: 5,
    max_mana: 3,

    bonus_health_recovery: 0,
    bonus_stamina_recovery: 0,
    bonus_mana_recovery: 0,

    health_recovery: 5,
    stamina_recovery: 3,
    mana_recovery: 1,

    base_physical_attack: 0,
    base_magic_attack: 0,
    base_physical_defence: 0,
    base_magic_defence: 0,

    bonus_physical_attack: 0,
    bonus_magic_attack: 0,
    bonus_physical_defence: 15,
    bonus_magic_defence: 10,

    physical_attack: 8,
    magic_attack: 2,
    physical_defence: 23,
    magic_defence: 11,

    armour_penitration: 0,
    magic_penitration: 0,
    magic_resistance: 0,

    skills: [
      {
        skill_id: "heavy_armour",
        skill_level: 1
      }
    ],
    traits: [
      {
        trait_id: CharacterTraits.BRUTAL,
        base_trait_power: 5,
        bonus_trait_power: 0,
        trait_power: 5,
        current_cooldown: 0,
        is_available: true,
        is_active: false,
        trait_source: "race"
      }
    ],
    abilities: [
      {
        ability_id: "orc_bash",
        current_cooldown: 0
      },
      {
        ability_id: "self_heal",
        current_cooldown: 0
      }
    ],

    position: [0, 0],
    status_effects: [],
    action_points: 2,
    ultimate_energy: 0,

    resistance: [],
    weakness: [],

    flags: {
      is_xp_capped: false,
      can_level_up: false,
      is_max_level: false,
      needs_stat_allocation: false,
      has_equipment_upgrade: false,
      is_battle_ready: true
    }
  },
  {
    character_id: "dark_oracle",
    character_name: "Dark Oracle",
    character_description: "A mysterious human mage shrouded in dark robes, with eyes that seem to pierce through reality itself. The Dark Oracle has mastered forbidden arts of battlefield manipulation and uses ancient knowledge to control the flow of combat.",
    character_race_id: CharacterRaces.HUMAN,
    character_class_id: CharacterClasses.MAGE,
    character_role_id: CharacterRoles.CONTROL,

    character_xp: 0,
    character_level: 1,
    character_rank: 1,
    current_level_xp: 0,
    xp_to_next_level: 100,

    base_strength: 1,
    base_intelligence: 5,
    base_agility: 1,
    base_magic: 4,

    strength_points: 0,
    intelligence_points: 0,
    agility_points: 0,
    magic_points: 0,

    bonus_strength: 0,
    bonus_intelligence: 0,
    bonus_agility: 0,
    bonus_magic: 0,

    strength: 1,
    intelligence: 5,
    agility: 1,
    magic: 4,

    battle_strength: 1,
    battle_intelligence: 17,
    battle_agility: 1,
    battle_magic: 4,

    total_power: 23,

    base_health: 18,
    base_stamina: 1,
    base_mana: 4,

    bonus_health: 0,
    bonus_stamina: 0,
    bonus_mana: 30,

    health: 18,
    stamina: 1,
    mana: 34,

    battle_health: 18,
    battle_stamina: 1,
    battle_mana: 34,

    max_health: 18,
    max_stamina: 1,
    max_mana: 34,

    bonus_health_recovery: 0,
    bonus_stamina_recovery: 0,
    bonus_mana_recovery: 5,

    health_recovery: 8,
    stamina_recovery: 1,
    mana_recovery: 4,

    base_physical_attack: 0,
    base_magic_attack: 0,
    base_physical_defence: 0,
    base_magic_defence: 0,

    bonus_physical_attack: 0,
    bonus_magic_attack: 15,
    bonus_physical_defence: 0,
    bonus_magic_defence: 0,

    physical_attack: 2,
    magic_attack: 36,
    physical_defence: 2,
    magic_defence: 21,

    armour_penitration: 0,
    magic_penitration: 0,
    magic_resistance: 0,

    skills: [
      {
        skill_id: "short_sword",
        skill_level: 1
      }
    ],
    traits: [
      {
        trait_id: CharacterTraits.LEADERSHIP,
        base_trait_power: 5,
        bonus_trait_power: 0,
        trait_power: 5,
        current_cooldown: 0,
        is_available: true,
        is_active: false,
        trait_source: "race"
      }
    ],
    abilities: [
      {
        ability_id: "uppercut",
        current_cooldown: 0
      },
      {
        ability_id: "magic_blast",
        current_cooldown: 0
      }
    ],

    position: [0, 0],
    status_effects: [],
    action_points: 2,
    ultimate_energy: 0,

    resistance: [],
    weakness: [],

    flags: {
      is_xp_capped: false,
      can_level_up: false,
      is_max_level: false,
      needs_stat_allocation: false,
      has_equipment_upgrade: false,
      is_battle_ready: true
    }
  }
];