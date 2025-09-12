import { Character, CharacterRaces, CharacterClasses, CharacterRoles, CharacterTraits } from '../types/character';

export const load_characters: Character[] = [
	// BALROCK
	{
		character_id: "balrock",
		character_name: "Balrock",
		character_description: "A towering orc whose very presence on the battlefield shifts the tide of war through sheer intimidation and tactical brilliance. Balrock's weathered hide bears the scars of countless campaigns, each mark a testament to battles survived through cunning as much as brute strength. He combines his natural orcish ferocity with disciplined military expertise, making him the anchor around which entire armies rally, transforming chaos into order, weakness into strength, and scattered forces into an unstoppable war machine.",
		character_race_id: CharacterRaces.ORC,
		character_class_id: CharacterClasses.COMMANDER, 
		character_role_id: CharacterRoles.TANK,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 20,
		base_intelligence: 8,
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

		strength: 20,
		intelligence: 8,
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
		stamina: 30,
		mana: 10,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 56,
		max_stamina: 30,
		max_mana: 10,

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

		physical_attack: 23,
		magic_attack: 2,
		physical_defence: 10,
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
	// URKUL
	{
		character_id: "urkul",
		character_name: "Urkul",
		character_description: "Where most orcs rely on brute force and thunderous charges, Urkul has embraced the shadows and silence that his kin typically scorn. His lean, wiry frame defies orcish stereotypes, built for speed and precision rather than raw power. Peering from beneath his dark hood he tracks his targets with predatory focus, calculating angles and distances with the cold efficiency of a born killer. An orc who kills not with savage fury, but with patient, methodical precision that would make even elven assassins take notice.",
		character_race_id: CharacterRaces.ORC,
		character_class_id: CharacterClasses.ROUGE, 
		character_role_id: CharacterRoles.MARKSMAN,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 6,
		base_intelligence: 2,
		base_agility: 18,
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

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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
	// MURGASH
	{
		character_id: "murgash",
		character_name: "Murgash",
		character_description: "A primal force of nature wrapped in orcish flesh, Murgash embodies the savage heart that beats within every orc warrior. He fights like a cornered beast, his massive fists striking with the force of sledgehammers while his tusks and claws tear through armor as if it were parchment. He scorns weapons as tools for the weak, preferring to feel his enemies' bones break beneath his bare hands.In the heat of battle, Murgash enters a blood-drunk frenzy that makes him virtually unstoppable, his wounds healing through sheer fury and his strength growing with each drop of blood spilled. Pain only fuels his rage, and defeat only makes him deadlier.",
		character_race_id: CharacterRaces.ORC,
		character_class_id: CharacterClasses.BRAWLER, 
		character_role_id: CharacterRoles.WARRIOR,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 8,
		base_intelligence: 2,
		base_agility: 5,
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

		health: 100,
		stamina: 40,
		mana: 20,

		battle_health: 100,
		battle_stamina: 6,
		battle_mana: 3,

		max_health: 100,
		max_stamina: 40,
		max_mana: 20,

		bonus_health_recovery: 0,
		bonus_stamina_recovery: 0,
		bonus_mana_recovery: 0,

		health_recovery: 15,
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

		physical_attack: 24,
		magic_attack: 7,
		physical_defence: 12,
		magic_defence: 3,

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
	// BYSON
	{
		character_id: "byson",
		character_name: "Byson",
		character_description: "The destroyer and protector who has transformed himself into a living avatar of the legendary minotaur through strategic body modifications. Byson charges into battle as a living battering ram whose very presence galvanizes his allies. His thunderous war cries can rally faltering troops and strike terror into enemy ranks, while his devastating charges create openings that can be exploited. A master of the art of tactical brutality through acts of magnificent violence.",
		character_race_id: CharacterRaces.ORC,
		character_class_id: CharacterClasses.BRAWLER, 
		character_role_id: CharacterRoles.SUPPORT,

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

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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
	// DARK ORACLE
	{
		character_id: "dark_oracle",
		character_name: "Dark Oracle",
		character_description: "A mysterious mage shrouded in dark robes with golden ritualistic markings, with eyes that seem to pierce through reality itself. The Dark Oracle has mastered forbidden arts of space manipulation and uses ancient knowledge to control the flow of combat, a knowledge that mortals were never meant to possess. Her mastery over spatial magic allows her to tear holes in reality itself, stepping through abyssal portals that collapse behind her in violent implosions of dark energy.",
		character_race_id: CharacterRaces.HUMAN,
		character_class_id: CharacterClasses.MAGE,
		character_role_id: CharacterRoles.CONTROL,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 2,
		base_intelligence: 20,
		base_agility: 2,
		base_magic: 12,

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

		health: 180,
		stamina: 10,
		mana: 50,

		battle_health: 18,
		battle_stamina: 1,
		battle_mana: 34,

		max_health: 180,
		max_stamina: 10,
		max_mana: 50,

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
		},
		{
			ability_id: "self_heal",
			current_cooldown: 0
		},
		{
			ability_id: "arcane_bolt",
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
	// ARMAGEDDON
	{
		character_id: "armageddon",
		character_name: "Armageddon",
		character_description: "A fearsome dark elf mage whose mastery over flame magic is matched only by his brutal physical prowess. A brute force of nature, a walking apocalypse, his obsidian skin bears the glowing scars of countless infernal rituals, each crack pulsing with molten energy that courses through his veins. He scorns the frailty of pure spellcasters, preferring to combine devastating fire magic with raw, physical dominance. His very presence warps the air with heat, and enemies often find themselves facing not just his arcane fury, but also the crushing force of fists that strike like hammers fresh from the forge.",
		character_race_id: CharacterRaces.ELF,
		character_class_id: CharacterClasses.MAGE, 
		character_role_id: CharacterRoles.WARRIOR,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 11,
		base_intelligence: 1,
		base_agility: 4,
		base_magic: 8,

		strength_points: 0,
		intelligence_points: 0,
		agility_points: 0,
		magic_points: 0,

		bonus_strength: 0,
		bonus_intelligence: 0,
		bonus_agility: 0,
		bonus_magic: 0,

		strength: 5,
		intelligence: 7,
		agility: 3,
		magic: 6,

		battle_strength: 5,
		battle_intelligence: 1,
		battle_agility: 3,
		battle_magic: 1,

		total_power: 21,

		base_health: 6,
		base_stamina: 3,
		base_mana: 1,

		bonus_health: 50,
		bonus_stamina: 0,
		bonus_mana: 0,

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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
	// ABRAXAS
	{
		character_id: "abraxas",
		character_name: "Abraxas",
		character_description: "Once human, Abraxas now exists in the liminal space between life and death—a testament to the corrupting price of necromantic mastery. His pallid, decaying flesh bears the unmistakable marks of his dark craft. His very presence warps the boundary between life and death, allowing him to bolster his allies with necrotic energies while simultaneously replenishing his undead ranks from freshly created corpses. His cackling laughter echoes across battlefields as bones rise to serve and flesh reanimates at his command, turning every fallen foe into a potential ally.",
		character_race_id: CharacterRaces.HUMAN,
		character_class_id: CharacterClasses.MAGE, 
		character_role_id: CharacterRoles.SUPPORT,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 2,
		base_intelligence: 10,
		base_agility: 3,
		base_magic: 15,

		strength_points: 0,
		intelligence_points: 0,
		agility_points: 0,
		magic_points: 0,

		bonus_strength: 0,
		bonus_intelligence: 0,
		bonus_agility: 0,
		bonus_magic: 0,

		strength: 5,
		intelligence: 7,
		agility: 3,
		magic: 6,

		battle_strength: 5,
		battle_intelligence: 1,
		battle_agility: 3,
		battle_magic: 1,

		total_power: 21,

		base_health: 6,
		base_stamina: 3,
		base_mana: 1,

		bonus_health: 50,
		bonus_stamina: 0,
		bonus_mana: 0,

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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
	// BONECHILL
	{
		character_id: "bonechill",
		character_name: "Bonechill",
		character_description: "A towering ice elf whose massive frame rivals that of the mightiest orcs, while crystalline spikes of perpetual frost jut from his shoulders and crown like a living glacier given sentient form. Where other mages shield themselves behind arcane barriers and keep their distance, Bonechill wades directly into the heart of combat, his massive fists striking with the crushing force of avalanches while waves of killing frost radiate from his presence.",
		character_race_id: CharacterRaces.ELF,
		character_class_id: CharacterClasses.MAGE, 
		character_role_id: CharacterRoles.TANK,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 15,
		base_intelligence: 3,
		base_agility: 6,
		base_magic: 4,

		strength_points: 0,
		intelligence_points: 0,
		agility_points: 0,
		magic_points: 0,

		bonus_strength: 0,
		bonus_intelligence: 0,
		bonus_agility: 0,
		bonus_magic: 0,

		strength: 5,
		intelligence: 7,
		agility: 3,
		magic: 6,

		battle_strength: 5,
		battle_intelligence: 1,
		battle_agility: 3,
		battle_magic: 1,

		total_power: 21,

		base_health: 6,
		base_stamina: 3,
		base_mana: 1,

		bonus_health: 50,
		bonus_stamina: 0,
		bonus_mana: 0,

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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
	// CHAOS
	{
		character_id: "chaos",
		character_name: "Chaos",
		character_description: "Chaos, the evil angel king.",
		character_race_id: CharacterRaces.ELF,
		character_class_id: CharacterClasses.MAGE, 
		character_role_id: CharacterRoles.WARRIOR,

		character_xp: 0,
		character_level: 1,
		character_rank: 1,
		current_level_xp: 0,
		xp_to_next_level: 100,

		base_strength: 5,
		base_intelligence: 12,
		base_agility: 4,
		base_magic: 8,

		strength_points: 0,
		intelligence_points: 0,
		agility_points: 0,
		magic_points: 0,

		bonus_strength: 0,
		bonus_intelligence: 0,
		bonus_agility: 0,
		bonus_magic: 0,

		strength: 5,
		intelligence: 7,
		agility: 3,
		magic: 6,

		battle_strength: 5,
		battle_intelligence: 1,
		battle_agility: 3,
		battle_magic: 1,

		total_power: 21,

		base_health: 6,
		base_stamina: 3,
		base_mana: 1,

		bonus_health: 50,
		bonus_stamina: 0,
		bonus_mana: 0,

		health: 156,
		stamina: 50,
		mana: 30,

		battle_health: 56,
		battle_stamina: 5,
		battle_mana: 3,

		max_health: 156,
		max_stamina: 50,
		max_mana: 30,

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

		physical_attack: 23,
		magic_attack: 5,
		physical_defence: 10,
		magic_defence: 3,

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
		},
		{
			ability_id: "shadow_strike",
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