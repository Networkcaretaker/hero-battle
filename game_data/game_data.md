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
Adds 2 points to primary stats for each ```character_level``` 

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