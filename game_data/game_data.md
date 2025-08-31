# Game Data

## Character

```json
[
	{
		"character_name": "Name",
		"character_description": "Description",
		"character_race": "Race",
		"character_class": "Class",
		"character_role": "Role",
		"character_level": 1,
		"character_rank": 1,
		"base_strength": 0,
		"base_intelligence": 0,
		"base_agility": 0,
		"base_magic": 0,
		"base_health": 0,
		"base_stamina": 0,
		"base_mana": 0
	}
]
```

### Race

Adds 2 points to primary stats for each `character_level`

```json
[
	{
		"race_name": "Human",
		"intelligence": 2
	},
	{
		"race_name": "Dwarf",
		"strength": 2
	},
	{
		"race_name": "Elf",
		"magic": 2
	},
	{
		"race_name": "Orc",
		"agility": 2
	}
]
```

## Primary Stats

```py
strength = base_strength + character_level * character_rank
intelligence = base_intelligence + character_level * character_rank
agility = base_agility + character_level * character_rank
magic = base_magic + character_level * character_rank
```

    // Race Skills
    	"archery",
        "nature_magic",
        "stealth",
        "herbalism"
    	"berserker_rage",
        "intimidation",
        "survival"
    	"heavy_armour",
        "weapon_crafting",
        "mining"
    	"weapon_mastery",
        "tactical_awareness"
    // Class Skills
    	"elemental_magic",
        "spell_focus",
        "mana_efficiency",
    	"unarmed_combat",
        "intimidation",
        --- "pain_tolerance"
    	"stealth",
        "lockpicking",
        "backstab",
        "acrobatics"
    	"divine_magic",
        "herbalism",
        ---"first_aid",
        "purification"
    	"leadership",
        "tactical_planning",
        "rally",
        "formation_fighting"
    // Role Skills
    	"heavy_armour",
        "shield_mastery",
        "taunt"
    	"weapon_mastery",
        "combat_reflexes",


        "marksmanship",
        "quick_draw",
        "tracking"
    	"healing_arts",
        "buff_magic",
        "resource_management",
        "empathy",
    	"crowd_control",

        "spell_disruption",
        "area_magic"

    // Race Traits
    	"adaptable",
        "quick_learner"
    	"stone_skin",
        "magic_resistance",

    	"keen_senses",

        "magical_affinity",
    	"bloodlust",
        "thick_hide",
        "battle_fury"
    // Class Traits


    	"iron_fists",
        "berserker_rage",
        "thick_skin",
    	"shadow_step",
        "critical_strike",
        "evasion",
    	"healing_touch",
        "divine_favor",
        "pacifist",
    	"inspiring_presence",
        "tactical_mind",
        "battlefield_awareness"
    // Role Traits
    	"damage_reduction",
        "threat_generation",
        "immovable",
    	"battle_hardened",
        "weapon_expertise",
        "second_wind",
    	"eagle_eye",
        "steady_aim",
        "glass_cannon",
    	"healing_efficiency",
        "aura_mastery",
        "team_player",
    	"spell_mastery",
        "tactical_positioning",
        -- "disruptor"

    // Race Abilities
    	"human_cunning",
    	"dwarven_blow",
        "fortify",
    	"elven_strike",
        "nature_blessing"
    	"orc_bash",
        "war_cry"
    // Class Abilities
    	"fireball",
        "lightning_storm",
        "mana_shield",
    	"power_strike",
        "ground_slam",
        "intimidating_shout"
    	"sneak_attack",
        "smoke_bomb",
        "poison_blade"
    	"heal",
        "group_heal",
        "purify",
        "blessing"
    	"battle_orders",
        "inspire_courage",
        "tactical_strike",
        "rally_troops"
    // Role Abilities
    	"shield_wall",
        "provoke",
        "defensive_stance"
    	"charge_attack",
        "weapon_throw",
        "battle_stance"
    	"aimed_shot",
        "multi_shot",
        "hunters_mark"
    	"mass_heal",
        "team_blessing",
        "dispel_magic",
        "sanctuary"
    	"mass_stun",
        "terrain_control",
        "silence_field",
        "gravity_well"
