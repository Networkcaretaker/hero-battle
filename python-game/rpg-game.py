import pygame
import os
import random
import sys
from enum import Enum
from dataclasses import dataclass
from typing import List, Dict, Tuple, Optional
import copy

# Initialize Pygame
pygame.init()

# Screen constants
SCREEN_WIDTH = 1520
SCREEN_HEIGHT = 750
GRID_SIZE = 100
GRID_COLS = 11 
GRID_ROWS = 6

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
GRAY = (100, 100, 100)
DARK_GRAY = (10, 10, 10)
LIGHT_BLUE = (173, 216, 230)
BROWN = (139, 69, 19)
LIGHT_GREEN = (144, 238, 144)
PURPLE = (128, 0, 128)
ORANGE = (255, 165, 0)

# Game constants
FPS = 60

class Race(Enum):
    # Hero races
    ELF = "Elf"
    DWARF = "Dwarf"
    HUMAN = "Human"
    #LYNX = "Lynx"
    #ANGEL = "Angel"
    #PIXI = "Pixi"

    # Villain races
    ORC = "Orc"
    GOBLIN = "Goblin"
    GIANT = "Giant"
    #OGAR = "Ogar"
    #DEMON = "Demon"
    #DRAGON = "Dragon Lord"

class CharacterClass(Enum):
    WARRIOR = "Warrior"
    WIZARD = "Wizard"
    HEALER = "Healer"
    SUPPORT = "Support"
    TANK = "Tank"
    #CONTROL = "Control"

class Team(Enum):
    HERO = "Hero"
    VILLAIN = "Villain"

class StatusEffect(Enum):
    POISONED = "Poisoned"     # Deals damage over time
    STUNNED = "Stunned"       # Skip next turn
    WEAKENED = "Weakened"     # Reduced damage
    PROTECTED = "Protected"   # Reduced damage taken
    STRENGTHENED = "Strengthened"  # Increased damage
    HASTED = "Hasted"         # Increased action points
    SLOWED = "Slowed"         # Decrease enemy action points

@dataclass
class Ability:
    name: str
    description: str
    damage: int = 0
    healing: int = 0
    recover: int = 0
    aoe: bool = False        # Area of effect
    aoe_range: int = 0       # How many tiles are affected
    cooldown: int = 0        # Turns before usable again
    current_cooldown: int = 0
    mana_cost: int = 0
    apply_status: Optional[StatusEffect] = None
    status_duration: int = 0
    range: int = 1           # How far the ability can reach
    
    def can_use(self, character):
        return self.current_cooldown == 0 and character.mana >= self.mana_cost
    
    def use(self):
        self.current_cooldown = self.cooldown
        
    def tick_cooldown(self):
        if self.current_cooldown > 0:
            self.current_cooldown -= 1

class Character:
    def __init__(self, name, race, char_class, team):
        self.name = name
        self.race = race
        self.char_class = char_class
        self.team = team
        
        # Base stats modified by race and class
        self.base_hp = 100
        self.base_strength = 10
        self.base_defense = 10
        self.base_agility = 10
        self.base_intelligence = 10
        self.base_mana = 50
        
        # Modified stats
        self.max_hp = self.base_hp
        self.hp = self.max_hp
        self.strength = self.base_strength
        self.defense = self.base_defense
        self.agility = self.base_agility
        self.intelligence = self.base_intelligence
        self.max_mana = self.base_mana
        self.mana = self.max_mana
        
        # Battle attributes
        self.position = (0, 0)
        self.abilities = []
        self.status_effects = {}  # StatusEffect -> remaining turns
        self.action_points = 2
        self.level = 1
        self.experience = 0
        
        # Apply race modifiers
        self.apply_race_modifiers()
        
        # Apply class modifiers
        self.apply_class_modifiers()
        
        # Give abilities based on class
        self.give_class_abilities()
        
    def apply_race_modifiers(self):
        if self.race == Race.ELF:
            self.agility += 5
            self.intelligence += 5
            self.defense -= 2
        elif self.race == Race.DWARF:
            self.defense += 5
            self.strength += 5
            self.agility -= 2
        elif self.race == Race.HUMAN:
            self.strength += 2
            self.agility += 2
            self.intelligence += 2
            self.defense += 2
        elif self.race == Race.ORC:
            self.strength += 7
            self.max_hp += 20
            self.hp += 20
            self.intelligence -= 3
        elif self.race == Race.GOBLIN:
            self.agility += 7
            self.intelligence += 2
            self.defense -= 3
            self.max_hp -= 10
            self.hp -= 10
        elif self.race == Race.GIANT:
            self.strength += 8
            self.max_hp += 50
            self.hp += 50
            self.agility -= 5
            
    def apply_class_modifiers(self):
        if self.char_class == CharacterClass.WARRIOR:
            self.strength += 5
            self.defense += 3
            self.max_hp += 20
            self.hp += 20
            self.max_mana -= 20
            self.mana -= 20
        elif self.char_class == CharacterClass.WIZARD:
            self.intelligence += 7
            self.max_mana += 50
            self.mana += 50
            self.max_hp -= 10
            self.hp -= 10
        elif self.char_class == CharacterClass.HEALER:
            self.intelligence += 5
            self.max_mana += 30
            self.mana += 30
            self.defense += 2
        elif self.char_class == CharacterClass.SUPPORT:
            self.intelligence += 4
            self.agility += 3
            self.max_mana += 20
            self.mana += 20
        elif self.char_class == CharacterClass.TANK:
            self.defense += 7
            self.max_hp += 40
            self.hp += 40
            self.strength += 2
            self.agility -= 3
            
    def give_class_abilities(self):
        basic_attack = Ability("Attack", "Basic attack", damage=self.strength, cooldown=0)
        self.abilities.append(basic_attack)
        
        if self.race == Race.ELF:
            self.abilities.append(Ability("Elven Strike", "Strong single-target attack", 
                                        damage=self.agility * 2, cooldown=2, mana_cost=10))
        elif self.race == Race.HUMAN:
            self.abilities.append(Ability("Human Cunning", "Strong single-target attack", 
                                        damage=self.agility * 2, cooldown=2, mana_cost=10))
        elif self.race == Race.DWARF:
            self.abilities.append(Ability("Dwarven Blow", "Strong single-target attack", 
                                        damage=self.strength * 2, cooldown=2, mana_cost=10))
        elif self.race == Race.ORC:
            self.abilities.append(Ability("Orc Bash", "Strong single-target attack", 
                                        damage=self.strength * 2, cooldown=2, mana_cost=10))
        elif self.race == Race.GOBLIN:
            self.abilities.append(Ability("Goblin Cleave", "Strong single-target attack", 
                                        damage=self.agility * 2, cooldown=2, mana_cost=10))
        elif self.race == Race.GIANT:
            self.abilities.append(Ability("Giant Stomp", "Strong single-target attack", 
                                        damage=self.strength * 2, cooldown=2, mana_cost=10))
            
        if self.char_class == CharacterClass.WARRIOR:
            self.abilities.append(Ability("Power Strike", "Strong single-target attack", 
                                        damage=self.strength * 2.5, cooldown=3, mana_cost=10))
            self.abilities.append(Ability("Whirlwind", "Attack all adjacent enemies", 
                                        damage=self.strength, aoe=True, aoe_range=1, cooldown=3, mana_cost=15))
            self.abilities.append(Ability("Thunder Smash", "Powerful Area Attack", 
                                        damage=self.strength * 3, aoe=True, aoe_range=2, cooldown=5, mana_cost=30))
            
        elif self.char_class == CharacterClass.WIZARD:
            self.abilities.append(Ability("Fireball", "Magical attack on a single target", 
                                        damage=self.intelligence * 1.5, cooldown=1, mana_cost=15, range=5))
            self.abilities.append(Ability("Lightning Storm", "Attack multiple enemies in an area", 
                                        damage=self.intelligence, aoe=True, aoe_range=3, cooldown=4, mana_cost=30, range=4))
            self.abilities.append(Ability("Recover", "Increase Mana for an ally", 
                                        recover=self.intelligence, cooldown=4, range=3))
            
        elif self.char_class == CharacterClass.HEALER:
            self.abilities.append(Ability("Heal", "Restore health to a single ally", 
                                        healing=self.intelligence * 1.5, mana_cost=15, range=3))
            self.abilities.append(Ability("Group Heal", "Heal all nearby allies", 
                                        healing=self.intelligence, aoe=True, aoe_range=2, range=2, cooldown=3, mana_cost=25))
            self.abilities.append(Ability("Haste", "Increased action points for an ally", 
                                        cooldown=4, mana_cost=30, apply_status=StatusEffect.HASTED, status_duration=1, range=1))
            
        elif self.char_class == CharacterClass.SUPPORT:
            self.abilities.append(Ability("Strengthen", "Increase an ally's damage", 
                                        cooldown=2, mana_cost=15, apply_status=StatusEffect.STRENGTHENED, status_duration=3, range=2))
            self.abilities.append(Ability("Weaken", "Decrease an enemy's damage", 
                                        cooldown=2, mana_cost=15, apply_status=StatusEffect.WEAKENED, status_duration=3, range=2))
            self.abilities.append(Ability("Poison", "Decrease an enemy's damage over time", 
                                        damage=self.agility, cooldown=4, mana_cost=20, apply_status=StatusEffect.POISONED, status_duration=3, range=1))
            
        elif self.char_class == CharacterClass.TANK:
            self.abilities.append(Ability("Shield Bash", "Attack and stun an enemy", 
                                        damage=self.strength, cooldown=3, apply_status=StatusEffect.STUNNED, status_duration=1))
            self.abilities.append(Ability("Protect", "Reduce damage taken by an ally", 
                                        cooldown=2, mana_cost=10, apply_status=StatusEffect.PROTECTED, status_duration=2, range=1))
            self.abilities.append(Ability("Slow", "Decrease action points for an enemy", 
                                        cooldown=4, mana_cost=30, apply_status=StatusEffect.SLOWED, status_duration=2, range=3))
            self.abilities.append(Ability("Disable", "Weaken and damage and enemies", 
                                        damage=self.defense * 3, cooldown=5, mana_cost=30, apply_status=StatusEffect.WEAKENED, status_duration=3, aoe=True, aoe_range=3, range=1))
        
        recharge = Ability("Haste", "Increased action points", apply_status=StatusEffect.HASTED, status_duration=1, range=0)
        self.abilities.append(recharge)
    



    
    def is_alive(self):
        return self.hp > 0
    
    def take_damage(self, amount):
        # Calculate actual damage after defense
        actual_damage = max(1, amount - self.defense // 2)
        
        # Check for status effects that modify damage
        if StatusEffect.PROTECTED in self.status_effects:
            actual_damage = actual_damage // 2
            
        self.hp = max(0, self.hp - actual_damage)
        return actual_damage
    
    def heal(self, amount):
        old_hp = self.hp
        self.hp = min(self.max_hp, self.hp + amount)
        return self.hp - old_hp

    def recover(self, amount):
        old_mana = self.mana
        self.mana = min(self.max_mana, self.mana + amount)
        return self.mana - old_mana
    
    def apply_status(self, status, duration):
        self.status_effects[status] = duration
    
    def tick_status_effects(self):
        # Process status effects
        to_remove = []
        
        for status, duration in self.status_effects.items():
            # Apply effect
            if status == StatusEffect.POISONED:
                self.take_damage(10)
                
            # Decrement duration
            self.status_effects[status] = duration - 1
            if self.status_effects[status] <= 0:
                to_remove.append(status)
                
        # Remove expired effects
        for status in to_remove:
            del self.status_effects[status]
    
    def start_turn(self):
        self.action_points = 2
        
        # Skip turn if stunned
        if StatusEffect.STUNNED in self.status_effects:
            self.action_points = 0
            
        # Extra action point if hasted
        if StatusEffect.HASTED in self.status_effects:
            self.action_points += 1
        
        # Loss action point if slowed
        if StatusEffect.SLOWED in self.status_effects:
            self.action_points -= 1
            
        # Tick cooldowns on abilities
        for ability in self.abilities:
            ability.tick_cooldown()
            
        # Tick status effects
        self.tick_status_effects()
        
        # Regenerate some mana
        self.mana = min(self.max_mana, self.mana + int(self.intelligence * 0.2))
    
    def can_move(self):
        return self.action_points > 0 and StatusEffect.STUNNED not in self.status_effects
    
    def move(self, new_position):
        if self.can_move():
            self.position = new_position
            self.action_points -= 1
            return True
        return False
    
    def can_use_ability(self, ability_index):
        if ability_index >= len(self.abilities):
            return False
            
        ability = self.abilities[ability_index]
        return self.action_points > 0 and ability.can_use(self)
    
    def use_ability(self, ability_index, target):
        if not self.can_use_ability(ability_index):
            return False
            
        ability = self.abilities[ability_index]
        
        # Use action point
        self.action_points -= 1
        
        # Use mana
        self.mana -= ability.mana_cost
        
        # Put ability on cooldown
        ability.use()
        
        return True
    
    def get_info(self):
        """Return a string with character information"""
        status_str = ", ".join([s.value for s in self.status_effects.keys()]) if self.status_effects else "None"
        return (f"{self.name} \n({self.race.value} {self.char_class.value})\n\n"
                f"HP: {self.hp}/{self.max_hp}  \nMana: {self.mana}/{self.max_mana}\n"
                f"STR: {self.strength} \nDEF: {self.defense} \nAGI: {self.agility} \nINT: {self.intelligence}\n"
                f"Status: {status_str}\n"
                f"AP: {self.action_points}")
    
    def get_enemy_info(self):
        """Return a string with enemy information"""
        status_str = ", ".join([s.value for s in self.status_effects.keys()]) if self.status_effects else "None"
        return (f"{self.name} ({self.race.value} {self.char_class.value})\n\n"
                f"HP: {self.hp}/{self.max_hp}  Mana: {self.mana}/{self.max_mana}\n"
                f"STR: {self.strength}  DEF: {self.defense}  AGI: {self.agility}  INT: {self.intelligence}\n"
                f"Status: {status_str}"
                )

class Battle:
    def __init__(self, heroes, villains):
        self.heroes = heroes
        self.villains = villains
        self.all_characters = heroes + villains
        self.current_turn = 0
        self.active_character = None
        self.turn_order = []
        self.selected_ability = None
        self.game_over = False
        self.winner = None
        
        # Position characters
        self.position_teams()
        
        # Determine turn order based on agility
        self.determine_turn_order()
        
    def position_teams(self):
        # Position heroes on the left side
        for i, hero in enumerate(self.heroes):
            row = i % GRID_ROWS
            col = i // GRID_ROWS
            hero.position = (col, row)
            
        # Position villains on the right side
        for i, villain in enumerate(self.villains):
            row = i % GRID_ROWS
            col = GRID_COLS - 1 - (i // GRID_ROWS)
            villain.position = (col, row)
    
    def determine_turn_order(self):
        # Sort by agility (higher goes first)
        # self.turn_order = sorted(self.all_characters, key=lambda c: c.agility, reverse=True)
        self.turn_order = sorted(self.all_characters, key=lambda c: c.strength, reverse=True)
        
        # Set first character active
        if self.turn_order:
            self.active_character = self.turn_order[0]
            self.active_character.start_turn()
    
    def next_turn(self):
        # Move to next character in turn order
        self.current_turn = (self.current_turn + 1) % len(self.turn_order)
        self.active_character = self.turn_order[self.current_turn]
        
        # Skip dead characters
        while not self.active_character.is_alive():
            self.current_turn = (self.current_turn + 1) % len(self.turn_order)
            self.active_character = self.turn_order[self.current_turn]
            
            # Check if all characters of a team are dead
            if self.check_game_over():
                return
                
        # Start the character's turn
        self.active_character.start_turn()
    
    def check_game_over(self):
        # Check if all heroes are dead
        heroes_alive = any(hero.is_alive() for hero in self.heroes)
        
        # Check if all villains are dead
        villains_alive = any(villain.is_alive() for villain in self.villains)
        
        if not heroes_alive:
            self.game_over = True
            self.winner = Team.VILLAIN
            return True
        
        if not villains_alive:
            self.game_over = True
            self.winner = Team.HERO
            return True
        
        return False
    
    def get_character_at(self, position):
        for character in self.all_characters:
            if character.position == position and character.is_alive():
                return character
        return None
    
    def calculate_distance(self, pos1, pos2):
        """Calculate Manhattan distance between two grid positions"""
        return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])
    
    def get_valid_moves(self, character):
        """Return list of valid move positions for a character"""
        valid_positions = []
        
        # Move 1 tile in any direction (no diagonals)
        #directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        # Move 1 tile in any direction (only diagonals)
        #directions = [(1, 1), (-1, -1), (1, -1), (-1, 1)]

        # Move 1 tile in any direction (including diagonals)
        #directions = [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (-1, -1), (1, -1), (-1, 1)]

        # Move 2 tile in any direction (including diagonals)
        #directions = [(0, 2), (2, 0), (0, -2), (-2, 0), (2, 2), (-2, -2), (2, -2), (-2, 2)]

        # Move 1 or 2 tile in any direction (including diagonals)
        #directions = [(0, 2), (2, 0), (0, -2), (-2, 0), (2, 2), (-2, -2), (2, -2), (-2, 2), (1, 2), (2, 1), (1, -2), (-2, 1), (-1, 2), (2, -1), (-1, -2), (-2, -1)]
        
        # Move 3 tile in any direction (including diagonals)
        #directions = [(0, 3), (3, 0), (0, -3), (-3, 0), (3, 3), (-3, -3), (3, -3), (-3, 3)]

        # Move 3 tiles horizontal and vertical, 2 tiles diagonals
        #directions = [(0, 3), (3, 0), (0, -3), (-3, 0), (2, 2), (-2, -2), (2, -2), (-2, 2)]

        # Chess Knight Move
        directions = [(1, 2), (2, 1), (1, -2), (-2, 1), (-1, -2), (-2, -1), (-1, 2), (2, -1)]

        for dx, dy in directions:
            new_x = character.position[0] + dx
            new_y = character.position[1] + dy
            
            # Check if position is within grid
            if 0 <= new_x < GRID_COLS and 0 <= new_y < GRID_ROWS:
                # Check if position is empty
                if not self.get_character_at((new_x, new_y)):
                    valid_positions.append((new_x, new_y))
                    
        return valid_positions
    
    def get_valid_targets(self, character, ability_index):
        """Return list of valid targets for a character's ability"""
        if ability_index >= len(character.abilities):
            return []
            
        ability = character.abilities[ability_index]
        valid_targets = []
        
        # Determine if targeting allies or enemies
        target_team = None
        if ability.damage > 0:
            # Damaging abilities target enemies
            target_team = Team.VILLAIN if character.team == Team.HERO else Team.HERO
        elif ability.healing > 0 or ability.recover > 0 or ability.apply_status in [StatusEffect.PROTECTED, StatusEffect.STRENGTHENED, StatusEffect.HASTED]:
            # Healing and buffs target allies
            target_team = character.team
        elif ability.apply_status in [StatusEffect.WEAKENED, StatusEffect.STUNNED, StatusEffect.POISONED, StatusEffect.SLOWED]:
            # Debuffs target enemies
            target_team = Team.VILLAIN if character.team == Team.HERO else Team.HERO
            
        if target_team is None:
            return []
            
        # Get all characters of the target team
        potential_targets = [c for c in self.all_characters if c.team == target_team and c.is_alive()]
        
        # Check range
        for target in potential_targets:
            distance = self.calculate_distance(character.position, target.position)
            if distance <= ability.range:
                valid_targets.append(target)
                
        return valid_targets
    
    def use_ability(self, ability_index, target):
        """Use active character's ability on target"""
        if not self.active_character.can_use_ability(ability_index):
            return False
            
        ability = self.active_character.abilities[ability_index]
        
        # Check if target is valid
        valid_targets = self.get_valid_targets(self.active_character, ability_index)
        if target not in valid_targets:
            return False
            
        # Use ability resources (action points, mana, cooldown)
        success = self.active_character.use_ability(ability_index, target)
        if not success:
            return False
            
        # Apply ability effects
        if ability.damage > 0:
            damage_amount = ability.damage

            # Damage Modifier 
            damage_modifier = [0.5, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.5]
            damage_weight = random.choices(damage_modifier, weights=(1, 5, 10, 20, 48, 10, 5, 1), k=1)
            damage_amount = int(damage_amount * damage_weight[0])

            # Apply status effects that modify damage
            if StatusEffect.STRENGTHENED in self.active_character.status_effects:
                damage_amount = int(damage_amount * 1.5)
                
            if StatusEffect.WEAKENED in self.active_character.status_effects:
                damage_amount = int(damage_amount * 0.5)
                
            if ability.aoe:
                # Apply damage to all characters in range of the target
                for character in self.all_characters:
                    if character.team != self.active_character.team and character.is_alive():
                        distance = self.calculate_distance(target.position, character.position)
                        if distance <= ability.aoe_range:
                            character.take_damage(damage_amount)
            else:
                # Apply damage to single target
                target.take_damage(damage_amount)
                
        if ability.healing > 0:
            if ability.aoe:
                # Apply healing to all allies in range
                for character in self.all_characters:
                    if character.team == self.active_character.team and character.is_alive():
                        distance = self.calculate_distance(target.position, character.position)
                        if distance <= ability.aoe_range:
                            character.heal(ability.healing)
            else:
                # Apply healing to single target
                target.heal(ability.healing)
        
        if ability.recover > 0:
            if ability.aoe:
                # Apply healing to all allies in range
                for character in self.all_characters:
                    if character.team == self.active_character.team and character.is_alive():
                        distance = self.calculate_distance(target.position, character.position)
                        if distance <= ability.aoe_range:
                            character.recover(ability.recover)
            else:
                # Apply healing to single target
                target.recover(ability.recover)
                
        if ability.apply_status:
            target.apply_status(ability.apply_status, ability.status_duration)
            
        # Check for game over
        self.check_game_over()
        
        return True
    
    def end_active_turn(self):
        """End the current character's turn"""
        if self.active_character.action_points == 0 or not self.active_character.is_alive():
            self.next_turn()
            return True
        return False

# Create starting characters
def create_initial_characters():
    heroes = [
        Character("Eldrin", Race.HUMAN, CharacterClass.WIZARD, Team.HERO),
        Character("Thoric", Race.DWARF, CharacterClass.TANK, Team.HERO),
        Character("Lyra", Race.ELF, CharacterClass.HEALER, Team.HERO),
        Character("Rogar", Race.DWARF, CharacterClass.WARRIOR, Team.HERO),
        Character("Elara", Race.ELF, CharacterClass.SUPPORT, Team.HERO),
        Character("Storm", Race.HUMAN, CharacterClass.WARRIOR, Team.HERO)
    ]
    
    villains = [
        Character("Gruul", Race.ORC, CharacterClass.WARRIOR, Team.VILLAIN),
        Character("Zex", Race.GOBLIN, CharacterClass.WIZARD, Team.VILLAIN),
        Character("Thrag", Race.GIANT, CharacterClass.TANK, Team.VILLAIN),
        Character("Nixie", Race.GOBLIN, CharacterClass.SUPPORT, Team.VILLAIN),
        Character("Gorax", Race.ORC, CharacterClass.HEALER, Team.VILLAIN),
        Character("David", Race.GIANT, CharacterClass.WIZARD, Team.VILLAIN)
    ]
    
    return heroes, villains

class GameState(Enum):
    MAIN_MENU = 0
    BATTLE = 1
    CHARACTER_SELECT = 2
    GAME_OVER = 3

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Heroes vs. Villains Tactical RPG")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont(None, 24)
        self.title_font = pygame.font.SysFont(None, 48)
        
        self.state = GameState.MAIN_MENU
        self.battle = None
        
        # Game elements
        self.heroes, self.villains = create_initial_characters()
        
        # UI state
        self.selected_character = None
        self.selected_ability = None
        self.selected_tile = None
        self.hover_tile = None
        self.valid_moves = []
        self.valid_targets = []

        # Create a dictionary to store images
        self.images = {}
        # self.potraits = {}
        
        # Load images
        self.load_images()

    def load_images(self):
        """Load all game images"""
        # Load tile images
        #self.images['grass'] = pygame.image.load('assets/grass.png').convert()
        #self.images['highlight'] = pygame.image.load('assets/highlight.png').convert_alpha()
        
        # Load character images - you could organize these by race and class
        # Heroes
        self.images['human_wizard'] = pygame.image.load('assets/characters/human_wizard.jpg').convert_alpha()
        self.images['dwarf_tank'] = pygame.image.load('assets/characters/dwarf_tank.jpg').convert_alpha()
        self.images['elf_healer'] = pygame.image.load('assets/characters/elf_healer.jpg').convert_alpha()
        self.images['dwarf_warrior'] = pygame.image.load('assets/characters/dwarf_warrior.jpg').convert_alpha()
        self.images['elf_support'] = pygame.image.load('assets/characters/elf_support.jpg').convert_alpha()
        self.images['human_warrior'] = pygame.image.load('assets/characters/human_warrior.jpg').convert_alpha()

        self.images['orc_warrior'] = pygame.image.load('assets/characters/orc_warrior.jpg').convert_alpha()
        self.images['orc_healer'] = pygame.image.load('assets/characters/orc_healer.jpg').convert_alpha()
        self.images['goblin_support'] = pygame.image.load('assets/characters/goblin_support.jpg').convert_alpha()
        self.images['goblin_wizard'] = pygame.image.load('assets/characters/goblin_wizard.jpg').convert_alpha()
        self.images['giant_tank'] = pygame.image.load('assets/characters/giant_tank.jpg').convert_alpha()
        self.images['giant_wizard'] = pygame.image.load('assets/characters/giant_wizard.jpg').convert_alpha()

        self.potraits = copy.copy(self.images)
        
        # Resize images to fit grid if needed
        for key in self.images:
            # Character images might need different sizing
            self.images[key] = pygame.transform.scale(self.images[key], (GRID_SIZE - 10, GRID_SIZE - 10))
        for key in self.potraits:
            # Character images might need different sizing
            self.potraits[key] = pygame.transform.scale(self.potraits[key], (250, 250))

        # Load UI elements
        #self.images['button'] = pygame.image.load('assets/ui/button.png').convert_alpha()
        #self.images['panel'] = pygame.image.load('assets/ui/panel.png').convert_alpha()
        
        # Load status effect icons
        #self.images['poisoned'] = pygame.image.load('assets/effects/poisoned.png').convert_alpha()
        #self.images['stunned'] = pygame.image.load('assets/effects/stunned.png').convert_alpha()
        # More status effect images...
        
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
                
            if self.state == GameState.MAIN_MENU:
                if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                    self.start_battle()
                    
            elif self.state == GameState.BATTLE:
                if event.type == pygame.MOUSEBUTTONDOWN:
                    mouse_pos = pygame.mouse.get_pos()
                    
                    # Check if a UI button was clicked
                    if self.handle_ui_click(mouse_pos):
                        continue
                        
                    # Convert mouse position to grid coordinates
                    grid_x = mouse_pos[0] // GRID_SIZE
                    grid_y = mouse_pos[1] // GRID_SIZE
                    
                    if 0 <= grid_x < GRID_COLS and 0 <= grid_y < GRID_ROWS:
                        clicked_pos = (grid_x, grid_y)
                        
                        # If we have an active character
                        if self.battle.active_character:
                            # If we selected an ability already
                            if self.selected_ability is not None:
                                target = self.battle.get_character_at(clicked_pos)
                                if target in self.valid_targets:
                                    # Use ability on target
                                    ability_index = self.selected_ability
                                    self.battle.use_ability(ability_index, target)
                                    self.selected_ability = None
                                    self.valid_targets = []
                                    
                                    # Check if the turn should end
                                    self.battle.end_active_turn()
                            
                            # If we're moving the character
                            elif clicked_pos in self.valid_moves:
                                self.battle.active_character.move(clicked_pos)
                                self.valid_moves = self.battle.get_valid_moves(self.battle.active_character)
                                
                                # Check if the turn should end
                                if self.battle.active_character.action_points == 0:
                                    self.battle.end_active_turn()
                
                # Handle ability selection
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_KP1 and self.battle.active_character:
                        self.select_ability(0)
                    elif event.key == pygame.K_KP2 and self.battle.active_character:
                        self.select_ability(1)
                    elif event.key == pygame.K_KP3 and self.battle.active_character:
                        self.select_ability(2)
                    elif event.key == pygame.K_KP4 and self.battle.active_character:
                        self.select_ability(3)
                    elif event.key == pygame.K_KP5 and self.battle.active_character:
                        self.select_ability(4)
                    elif event.key == pygame.K_KP6 and self.battle.active_character:
                        self.select_ability(5)
                    elif event.key == pygame.K_SPACE and self.battle.active_character:
                        # End turn
                        self.select_ability(6)
                        #self.battle.active_character.status_effects = StatusEffect.HASTED
                        #self.battle.active_character.status_effects = Ability("Haste", "Increased action points for an ally", cooldown=0, mana_cost=0, apply_status=StatusEffect.HASTED, status_duration=1, range=1)








                        self.battle.next_turn()
                        self.selected_ability = None
                        self.valid_targets = []
                        
                    # Cancel ability selection with escape
                    elif event.key == pygame.K_ESCAPE:
                        self.selected_ability = None
                        self.valid_targets = []
                        
            elif self.state == GameState.GAME_OVER:
                if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                    self.state = GameState.MAIN_MENU
                    
        return True
    
    def handle_ui_click(self, mouse_pos):
        """Handle clicks on UI elements, return True if UI was clicked"""
        # End turn button
        end_turn_rect = pygame.Rect(SCREEN_WIDTH - 150, SCREEN_HEIGHT - 50, 130, 30)
        if end_turn_rect.collidepoint(mouse_pos) and self.battle and self.battle.active_character:
            self.battle.next_turn()
            self.selected_ability = None
            self.valid_targets = []
            return True
            
        # Ability buttons
        if self.battle and self.battle.active_character:
            for i, ability in enumerate(self.battle.active_character.abilities):
                ability_rect = pygame.Rect(SCREEN_WIDTH - 200, 200 + i * 40, 180, 30)
                if ability_rect.collidepoint(mouse_pos):
                    self.select_ability(i)
                    return True
                    
        return False
    
    def select_ability(self, ability_index):
        """Select an ability and show valid targets"""
        if not self.battle.active_character:
            return
            
        if ability_index < len(self.battle.active_character.abilities):
            ability = self.battle.active_character.abilities[ability_index]
            
            if self.battle.active_character.can_use_ability(ability_index):
                self.selected_ability = ability_index
                self.valid_targets = self.battle.get_valid_targets(self.battle.active_character, ability_index)
            else:
                self.selected_ability = None
                self.valid_targets = []
    
    def start_battle(self):
        """Start a new battle"""
        self.battle = Battle(self.heroes, self.villains)
        self.state = GameState.BATTLE
        
        # Initialize UI state
        self.selected_character = None
        self.selected_ability = None
        self.selected_tile = None
        self.hover_tile = None
        
        if self.battle.active_character:
            self.valid_moves = self.battle.get_valid_moves(self.battle.active_character)
        else:
            self.valid_moves = []
    
    def update(self):
        """Update game state"""
        # Check if battle is over
        if self.battle and self.battle.game_over:
            self.state = GameState.GAME_OVER
            
        # Update hover position
        mouse_pos = pygame.mouse.get_pos()
        grid_x = mouse_pos[0] // GRID_SIZE
        grid_y = mouse_pos[1] // GRID_SIZE
        
        if 0 <= grid_x < GRID_COLS and 0 <= grid_y < GRID_ROWS:
            self.hover_tile = (grid_x, grid_y)
        else:
            self.hover_tile = None
            
        # Update valid moves for active character
        if self.battle and self.battle.active_character and self.selected_ability is None:
            self.valid_moves = self.battle.get_valid_moves(self.battle.active_character)
            
    def render(self):
        """Render the game"""
        self.screen.fill(BLACK)
        
        if self.state == GameState.MAIN_MENU:
            self.render_main_menu()
        elif self.state == GameState.BATTLE:
            self.render_battle()
        elif self.state == GameState.GAME_OVER:
            self.render_game_over()
            
        pygame.display.flip()
        
    def render_main_menu(self):
        """Render the main menu"""
        title = self.title_font.render("Heroes vs. Villains Tactical RPG", True, WHITE)
        start_text = self.font.render("Press ENTER to start a new battle", True, WHITE)
        
        title_rect = title.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3))
        start_rect = start_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        
        self.screen.blit(title, title_rect)
        self.screen.blit(start_text, start_rect)
        
    def render_battle(self):
        """Render the battle screen"""
        # Draw grid
        for x in range(GRID_COLS):
            for y in range(GRID_ROWS):
                rect = pygame.Rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
                color = GRAY if (x + y) % 2 == 0 else BLACK
                
                # Highlight valid moves
                if (x, y) in self.valid_moves:
                    color = YELLOW
                    
                # Highlight valid targets
                if self.battle.get_character_at((x, y)) in self.valid_targets:
                    color = RED
                    
                # Highlight hover
                if self.hover_tile == (x, y):
                    color = pygame.Color(color[0] + 30 if color[0] < 225 else 255,
                                        color[1] + 30 if color[1] < 225 else 255,
                                        color[2] + 30 if color[2] < 225 else 255)
                    
                # Highlight active character
                if self.battle.active_character and self.battle.active_character.position == (x, y):
                    color = YELLOW
                    
                pygame.draw.rect(self.screen, color, rect)
                pygame.draw.rect(self.screen, BLACK, rect, 1)  # Grid lines
        
        # Draw characters
        for character in self.battle.all_characters:
            if character.is_alive():
                x, y = character.position
                #center_x = x * GRID_SIZE + GRID_SIZE // 2
                #center_y = y * GRID_SIZE + GRID_SIZE // 2
                pos = (x * GRID_SIZE + 5, y * GRID_SIZE + 5)  # +5 for padding

                # Determine which image to use based on race and class
                image_key = f"{character.race.value.lower()}_{character.char_class.value.lower()}"
                
                # Fall back to a default if specific combo isn't available
                if image_key not in self.images:
                    image_key = "default_character"
                    
                # Draw the character
                self.screen.blit(self.images[image_key], pos)
                
                # Draw character circle
                #color = BLUE if character.team == Team.HERO else RED
                #pygame.draw.circle(self.screen, color, (center_x, center_y), GRID_SIZE // 3)
                
                # Draw character initial
                #text = self.font.render(character.name[0], True, WHITE)
                #text_rect = text.get_rect(center=(center_x, center_y))
                #self.screen.blit(text, text_rect)
                
                # Draw health bar
                health_width = int((character.hp / character.max_hp) * (GRID_SIZE - 10))
                health_rect = pygame.Rect(x * GRID_SIZE + 5, y * GRID_SIZE + 5, health_width, 5)
                pygame.draw.rect(self.screen, GREEN, health_rect)
                pygame.draw.rect(self.screen, BLACK, pygame.Rect(x * GRID_SIZE + 5, y * GRID_SIZE + 5, GRID_SIZE - 10, 5), 1)
                
                # Draw mana bar
                mana_width = int((character.mana / character.max_mana) * (GRID_SIZE - 10))
                mana_rect = pygame.Rect(x * GRID_SIZE + 5, y * GRID_SIZE + 12, mana_width, 5)
                pygame.draw.rect(self.screen, BLUE, mana_rect)
                pygame.draw.rect(self.screen, BLACK, pygame.Rect(x * GRID_SIZE + 5, y * GRID_SIZE + 12, GRID_SIZE - 10, 5), 1)
                
                # Draw status effects
                status_y = y * GRID_SIZE + 25
                for status in character.status_effects:
                    status_color = {
                        StatusEffect.POISONED: GREEN,
                        StatusEffect.STUNNED: YELLOW,
                        StatusEffect.WEAKENED: ORANGE,
                        StatusEffect.PROTECTED: BLUE,
                        StatusEffect.STRENGTHENED: RED,
                        StatusEffect.HASTED: PURPLE,
                        StatusEffect.SLOWED: LIGHT_BLUE
                    }.get(status, WHITE)
                    
                    pygame.draw.circle(self.screen, status_color, (x * GRID_SIZE + 15, status_y), 5)
                    status_y += 10
        
        # Draw UI
        self.render_battle_ui()
        
    def render_battle_ui(self):
        """Render battle UI elements"""
        # Draw sidebar background
        sidebar_rect = pygame.Rect(GRID_COLS * GRID_SIZE, 0, SCREEN_WIDTH - (GRID_COLS * GRID_SIZE), SCREEN_HEIGHT)
        pygame.draw.rect(self.screen, DARK_GRAY, sidebar_rect)
        
        # Draw active character info
        if self.battle.active_character:
            character = self.battle.active_character

            # Determine which image to use based on race and class
            image_key = f"{character.race.value.lower()}_{character.char_class.value.lower()}"
            
            # Fall back to a default if specific combo isn't available
            if image_key not in self.potraits:
                image_key = "default_character"
                
            # Draw the character
            self.screen.blit(self.potraits[image_key], (GRID_COLS * GRID_SIZE + 10, 10))
            
            # Draw character stats
            stats_text = character.get_info().split('\n')
            for i, line in enumerate(stats_text):
                text = self.font.render(line, True, WHITE)
                self.screen.blit(text, (GRID_COLS * GRID_SIZE + 280, 10 + i * 20))
            
            # Draw abilities           
            for i, ability in enumerate(character.abilities):
                # Determine color based on availability
                if character.can_use_ability(i):
                    color = WHITE
                else:
                    if ability.current_cooldown > 0:
                        color = ORANGE
                    else:
                        color = RED  # Not enough mana
                
                # Highlight selected ability
                if self.selected_ability == i:
                    pygame.draw.rect(self.screen, BLUE, (GRID_COLS * GRID_SIZE + 5, 280 + i * 50, 280, 50))
                
                # Draw ability button and info
                ability_rect = pygame.Rect(GRID_COLS * GRID_SIZE + 10, 280 + i * 50, 280, 50)
                pygame.draw.rect(self.screen, DARK_GRAY, ability_rect, 1)
                
                key_text = self.font.render(f"{i+1}:", True, color)
                self.screen.blit(key_text, (GRID_COLS * GRID_SIZE + 15, 280 + i * 50))
                
                ability_text = self.font.render(f"{ability.name}", True, color)
                self.screen.blit(ability_text, (GRID_COLS * GRID_SIZE + 40, 280 + i * 50))
                
                # Show cooldown or mana cost
                if ability.current_cooldown > 0:
                    cd_text = self.font.render(f"CD: {ability.current_cooldown}", True, ORANGE)
                    self.screen.blit(cd_text, (GRID_COLS * GRID_SIZE + 200, 280 + i * 50))
                else:
                    mana_text = self.font.render(f"MP: {ability.mana_cost}", True, BLUE)
                    self.screen.blit(mana_text, (GRID_COLS * GRID_SIZE + 200, 280 + i * 50))
                
                # Draw ability description beneath
                desc_text = self.font.render(ability.description, True, GRAY)
                desc_rect = desc_text.get_rect()
                if desc_rect.width > 400:
                    # If description is too long, truncate with ellipsis
                    desc_text = self.font.render(ability.description[:20] + "...", True, GRAY)
                self.screen.blit(desc_text, (GRID_COLS * GRID_SIZE + 40, 300 + i * 50))
        
        # Draw end turn button
        end_turn_rect = pygame.Rect(SCREEN_WIDTH - 150, SCREEN_HEIGHT - 50, 130, 30)
        pygame.draw.rect(self.screen, BLUE, end_turn_rect)
        end_turn_text = self.font.render(" End Turn (Space) ", True, WHITE)
        end_turn_text_rect = end_turn_text.get_rect(center=end_turn_rect.center)
        self.screen.blit(end_turn_text, end_turn_text_rect)
        
        # Draw battle status
        heroes_alive = sum(1 for hero in self.battle.heroes if hero.is_alive())
        villains_alive = sum(1 for villain in self.battle.villains if villain.is_alive())
        
        status_text = self.font.render(f"Heroes: {heroes_alive}/5  Villains: {villains_alive}/5", True, WHITE)
        self.screen.blit(status_text, (GRID_COLS * GRID_SIZE + 10, SCREEN_HEIGHT - 50))
        
        # Draw hover info
        if self.hover_tile:
            hover_character = self.battle.get_character_at(self.hover_tile)
            if hover_character:
                # Draw a box with character info
                info_rect = pygame.Rect(30, SCREEN_HEIGHT - 100, 500, 110)
                # pygame.draw.rect(self.screen, DARK_GRAY, info_rect)
                pygame.draw.rect(self.screen, BLACK, info_rect, 2)

                #image
                
                info_text = hover_character.get_enemy_info().split('\n')
                for i, line in enumerate(info_text):
                    text = self.font.render(line, True, WHITE)
                    self.screen.blit(text, (25, SCREEN_HEIGHT - 125 + i * 20))

    def render_game_over(self):
        """Render game over screen"""
        # Draw background
        self.screen.fill(BLACK)
        
        # Draw game over message
        game_over_text = self.title_font.render("Game Over", True, WHITE)
        game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3))
        self.screen.blit(game_over_text, game_over_rect)
        
        # Draw winner message
        if self.battle.winner == Team.HERO:
            winner_text = self.font.render("Heroes are victorious!", True, BLUE)
        else:
            winner_text = self.font.render("Villains conquered the land!", True, RED)
        
        winner_rect = winner_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        self.screen.blit(winner_text, winner_rect)
        
        # Draw return to menu message
        return_text = self.font.render("Press ENTER to return to the main menu", True, WHITE)
        return_rect = return_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT * 2 // 3))
        self.screen.blit(return_text, return_rect)

    def run(self):
        """Main game loop"""
        running = True
        
        while running:
            # Handle events
            running = self.handle_events()
            
            # Update game state
            self.update()
            
            # Render
            self.render()
            
            # Cap the frame rate
            self.clock.tick(FPS)

# Main entry point
if __name__ == "__main__":
    game = Game()
    game.run()
    pygame.quit()
    sys.exit()