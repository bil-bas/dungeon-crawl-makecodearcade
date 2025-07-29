@namespace
class SpriteKind:
    Snail = SpriteKind.create()
    Ghost = SpriteKind.create()
    Bat = SpriteKind.create()
    Monkey = SpriteKind.create()

def on_overlap_tile(sprite, location):
    tiles.set_tile_at(location, assets.tile("""
        transparency16
        """))
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(1)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
        """),
    on_overlap_tile)

def on_on_overlap(sprite2, otherSprite):
    music.play(music.melody_playable(music.big_crash),
        music.PlaybackMode.IN_BACKGROUND)
    game.set_game_over_message(False, "Slimed by the boss snail!")
    info.change_life_by(-10)
sprites.on_overlap(SpriteKind.player, SpriteKind.Snail, on_on_overlap)

def on_on_overlap2(sprite3, otherSprite2):
    music.play(music.melody_playable(music.small_crash),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(otherSprite2)
    game.set_game_over_message(False, "Sucked dry by a vampire bat!")
    info.change_life_by(-1)
    change_floater(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . f f f . f f f . . . .
            . . . . f 3 3 3 f 3 3 3 f . . .
            . . . . f 3 3 3 3 3 1 3 f . . .
            . . . . f 3 3 3 3 3 3 3 f . . .
            . . . . . f 3 b b b 3 f . . . .
            . . . . . f f b b b f f . . . .
            . . . . . . f f b f f . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        -1)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bat, on_on_overlap2)

def on_hit_wall(sprite4, location2):
    global Keys, coins
    if tiles.tile_at_location_equals(location2, sprites.dungeon.door_closed_north) and Keys >= 1:
        Keys += -1
        tiles.set_tile_at(location2, assets.tile("""
            transparency16
            """))
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        tiles.set_wall_at(location2, False)
        update_labels()
    elif tiles.tile_at_location_equals(location2, sprites.dungeon.chest_closed) and Keys >= 1:
        Keys += -1
        tiles.set_tile_at(location2, sprites.dungeon.chest_open)
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        coins += 10
        update_labels()
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def render_walls():
    
    def on_for_each_tile_in_map(column, row, location3):
        if tiles.tile_at_location_is_wall(location3):
            tiles.set_tile_at(location3, sprites.builtin.brick)
        elif tiles.tile_at_location_equals(location3, assets.tile("""
            Stairs down
            """)):
            tiles.place_on_tile(Wizard, location3)
            tiles.set_tile_at(location3, assets.tile("""
                transparency16
                """))
        elif tiles.tile_at_location_equals(location3, tileUtil.object4):
            create_bat(location3)
        elif tiles.tile_at_location_equals(location3, tileUtil.object6):
            create_ghost(location3)
        elif tiles.tile_at_location_equals(location3, tileUtil.object12):
            create_monkey(location3)
        elif tiles.tile_at_location_equals(location3, tileUtil.object14):
            create_boss(location3)
        elif tiles.tile_at_location_equals(location3, sprites.dungeon.chest_closed) or (tiles.tile_at_location_equals(location3, sprites.dungeon.door_closed_north) or tiles.tile_at_location_equals(location3, sprites.dungeon.stair_ladder)):
            tiles.set_wall_at(location3, True)
    tileUtil.for_each_tile_in_map(tileUtil.current_tilemap(), on_for_each_tile_in_map)
    

def on_hit_wall2(sprite5, location4):
    if characterAnimations.matches_rule(sprite5, characterAnimations.rule(Predicate.MOVING_UP)):
        mySprite.set_velocity(-30, 0)
    elif characterAnimations.matches_rule(sprite5, characterAnimations.rule(Predicate.MOVING_DOWN)):
        mySprite.set_velocity(30, 0)
    elif characterAnimations.matches_rule(sprite5, characterAnimations.rule(Predicate.MOVING_LEFT)):
        mySprite.set_velocity(0, 30)
    elif characterAnimations.matches_rule(sprite5, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        mySprite.set_velocity(0, -30)
scene.on_hit_wall(SpriteKind.Snail, on_hit_wall2)

def on_on_overlap3(sprite6, otherSprite3):
    global Magic
    music.play(music.melody_playable(music.spooky),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(otherSprite3)
    if Magic:
        Magic += -1
        change_floater(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . 2 2 . . . . . . .
                . . . . . . 3 1 1 3 . . . . . .
                . . . . . 2 1 1 1 1 2 . . . . .
                . . . . . 2 1 1 1 1 2 . . . . .
                . . . . . . 3 1 1 3 . . . . . .
                . . . . . . . 2 2 . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            -1)
        update_labels()
    else:
        game.set_game_over_message(False, "Soul drained by a ghost!")
        info.change_life_by(-1)
        change_floater(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . f f f . f f f . . . .
                . . . . f 3 3 3 f 3 3 3 f . . .
                . . . . f 3 3 3 3 3 1 3 f . . .
                . . . . f 3 3 3 3 3 3 3 f . . .
                . . . . . f 3 b b b 3 f . . . .
                . . . . . f f b b b f f . . . .
                . . . . . . f f b f f . . . . .
                . . . . . . . f f f . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            -1)
sprites.on_overlap(SpriteKind.player, SpriteKind.Ghost, on_on_overlap3)

def on_b_pressed():
    global Magic
    if Magic >= 3 and not (falling):
        Starfire()
        Magic += -3
        update_labels()
        
        def on_after():
            Starfire()
            
            def on_after2():
                Starfire()
            timer.after(200, on_after2)
            
        timer.after(200, on_after)
        
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def create_wizard():
    global wiz
    wiz = sprites.create(assets.image("""
        Wiz
        """), SpriteKind.player)
    info.set_life(3)
    scene.camera_follow_sprite(wiz)
    characterAnimations.loop_frames(wiz,
        [img("""
                . . . . . . c c c . . . . . . .
                . . . . . . c 5 b c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f f f f f f f f f f . .
                . . f f f f f f f f f f f f . .
                . . . f f f f f f f f f f . . .
                . . . e e f f f f f f f e . . .
                . . e b f b 5 b b 5 b c b e . .
                . . e e f 5 5 5 5 5 5 f e e . .
                . . . . c b 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . c c . . . . . .
                . . . . . . . c 5 c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f f f f f f f f f f . .
                . . f f f f f f f f f f f f . .
                . . . f f f f f f f f f f . . .
                . . . e b e e f f f f b b e . .
                . . . e b b e b b 5 5 f e e . .
                . . . . c e e 5 5 5 5 5 f . . .
                . . . . . f f f f f f f . . . .
                """),
            img("""
                . . . . . . . c c c . . . . . .
                . . . . . . c b 5 c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f f f f f f f f f f . .
                . . f f f f f f f f f f f f . .
                . . . f f f f f f f f f f . . .
                . . . e e f f f f f f e e . . .
                . . e b c b 5 b b 5 b f b e . .
                . . e e f 5 5 5 5 5 5 f e e . .
                . . . . c b 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . c c . . . . . . . .
                . . . . . . c 5 c . . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f f f f f f f f f f . .
                . . f f f f f f f f f f f f . .
                . . . f f f f f f f e e f . . .
                . . e b b f e e e e e b e . . .
                . . e e f 5 5 b b e b b e . . .
                . . . f 5 5 5 5 5 e e c . . . .
                . . . . f f f f f f f . . . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(wiz,
        [img("""
            . . . . . . c c c . . . . . . .
            . . . . . . c 5 b c . . . . . .
            . . . . c c c 5 5 c c c . . . .
            . . c c c c 5 5 5 5 c b c c . .
            . c b b 5 b 5 5 5 5 b 5 b b c .
            . c b 5 5 b b 5 5 b b 5 5 b c .
            . . c 5 5 5 b b b b 5 5 5 f . .
            . . f f 5 5 5 5 5 5 5 5 f f . .
            . . f f f f f f f f f f f f . .
            . . f f f f f f f f f f f f . .
            . . . f f f f f f f f f f . . .
            . . . e e f f f f f f f e . . .
            . . e b f b 5 b b 5 b c b e . .
            . . e e f 5 5 5 5 5 5 f e e . .
            . . . . c b 5 5 5 5 b c . . . .
            . . . . . f f f f f f . . . . .
            """)],
        200,
        characterAnimations.rule(Predicate.FACING_UP))
    characterAnimations.loop_frames(wiz,
        [img("""
                . . . . . . . c c c . . . . . .
                . . . . . . c b 5 c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f b f e e f b f f f . .
                . . f f f 1 f b b f 1 f f f . .
                . . . f f b b b b b b f f . . .
                . . . e e f e e e e f e e . . .
                . . e b c b 5 b b 5 b f b e . .
                . . e e f 5 5 5 5 5 5 f e e . .
                . . . . c b 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . c c . . . . . . . .
                . . . . . . c 5 c . . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f b f e e f b f f f . .
                . . f f f 1 f b b f 1 f f f . .
                . . . f f b b b b e e e f . . .
                . . e b b f e e e e b b e . . .
                . . e e f 5 5 b b e b b e . . .
                . . . f 5 5 5 5 5 e e c . . . .
                . . . . f f f f f f f . . . . .
                """),
            img("""
                . . . . . . c c c . . . . . . .
                . . . . . . c 5 b c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f b f e e f b f f f . .
                . . f f f 1 f b b f 1 f f f . .
                . . . f f b b b b b b f f . . .
                . . . e e f e e e e f e e . . .
                . . e b f b 5 b b 5 b c b e . .
                . . e e f 5 5 5 5 5 5 f e e . .
                . . . . c b 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . c c . . . . . .
                . . . . . . . c 5 c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f b f e e f b f f f . .
                . . f f f 1 f b b f 1 f f f . .
                . . . f e e e b b b b f f . . .
                . . . e b b e e e e f b b e . .
                . . . e b b e b b 5 5 f e e . .
                . . . . c e e 5 5 5 5 5 f . . .
                . . . . . f f f f f f f . . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_DOWN))
    characterAnimations.loop_frames(wiz,
        [img("""
            . . . . . . . c c c . . . . . .
            . . . . . . c b 5 c . . . . . .
            . . . . c c c 5 5 c c c . . . .
            . . c c b c 5 5 5 5 c c c c . .
            . c b b 5 b 5 5 5 5 b 5 b b c .
            . c b 5 5 b b 5 5 b b 5 5 b c .
            . . f 5 5 5 b b b b 5 5 5 c . .
            . . f f 5 5 5 5 5 5 5 5 f f . .
            . . f f f b f e e f b f f f . .
            . . f f f 1 f b b f 1 f f f . .
            . . . f f b b b b b b f f . . .
            . . . e e f e e e e f e e . . .
            . . e b c b 5 b b 5 b f b e . .
            . . e e f 5 5 5 5 5 5 f e e . .
            . . . . c b 5 5 5 5 b c . . . .
            . . . . . f f f f f f . . . . .
            """)],
        200,
        characterAnimations.rule(Predicate.FACING_DOWN))
    characterAnimations.loop_frames(wiz,
        [img("""
                . . . . . . . c c . . . . . . .
                . . . . . . c 5 c . . . . . . .
                . . . . c c 5 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . . f 5 5 5 5 5 5 5 5 f f . .
                . . . . f e e e f b e e f f . .
                . . . . f e b b f 1 b f f f . .
                . . . . f b b b b b b f f . . .
                . . . . . f e e e e f e e . . .
                . . . . . f 5 b b e b b e . . .
                . . . . f 5 5 5 5 e b b e . . .
                . . . . c b 5 5 5 5 e e . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . c c . . . . . . .
                . . . . . . c c 5 c . . . . . .
                . . . . c c 5 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . . f 5 5 5 5 5 5 5 5 f f . .
                . . . . f e e e f b e e f f . .
                . . . . f e b b f 1 b f f f . .
                . . . . f b b b b e e f f . . .
                . . . . . f e e e b b e f . . .
                . . . . f 5 b b e b b e . . . .
                . . . . c 5 5 5 5 e e f . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . c c . . . . . . .
                . . . . . . c 5 c . . . . . . .
                . . . . c c 5 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . . f 5 5 5 5 5 5 5 5 f f . .
                . . . . f e e e f b e e f f . .
                . . . . f e b b f 1 b f f f . .
                . . . . f b b b b b b f f . . .
                . . . . . f e e e e f e e . . .
                . . . . . f 5 b b e b b e . . .
                . . . . f 5 5 5 5 e b b e . . .
                . . . . c b 5 5 5 5 e e . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . c c . . . . . . .
                . . . . . . c c 5 c . . . . . .
                . . . . c c 5 5 5 c c c . . . .
                . . c c c c 5 5 5 5 c b c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . c 5 5 5 b b b b 5 5 5 f . .
                . . . f 5 5 5 5 5 5 5 5 f f . .
                . . . . f e e e f b e e f f . .
                . . . . f e b b f 1 b f f f . .
                . . . . f b b b b b b f f . . .
                . . . . . f e e e e e b b e . .
                . . . . f 5 5 b b b e b b e . .
                . . . . c 5 5 5 5 5 e e e . . .
                . . . . . f f f f f f . . . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(wiz,
        [img("""
            . . . . . . . c c . . . . . . .
            . . . . . . c 5 c . . . . . . .
            . . . . c c 5 5 5 c c c . . . .
            . . c c c c 5 5 5 5 c b c c . .
            . c b b 5 b 5 5 5 5 b 5 b b c .
            . c b 5 5 b b 5 5 b b 5 5 b c .
            . . c 5 5 5 b b b b 5 5 5 f . .
            . . . f 5 5 5 5 5 5 5 5 f f . .
            . . . . f e e e f b e e f f . .
            . . . . f e b b f 1 b f f f . .
            . . . . f b b b b b b f f . . .
            . . . . . f e e e e f e e . . .
            . . . . . f 5 b b e b b e . . .
            . . . . f 5 5 5 5 e b b e . . .
            . . . . c b 5 5 5 5 e e . . . .
            . . . . . f f f f f f . . . . .
            """)],
        200,
        characterAnimations.rule(Predicate.FACING_LEFT))
    characterAnimations.loop_frames(wiz,
        [img("""
                . . . . . . . c c . . . . . . .
                . . . . . . . c 5 c . . . . . .
                . . . . c c c 5 5 5 c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f . . .
                . . f f e e b f e e e f . . . .
                . . f f f b 1 f b b e f . . . .
                . . . f f b b b b b b f . . . .
                . . . e e f e e e e f . . . . .
                . . . e b b e b b 5 f . . . . .
                . . . e b b e 5 5 5 5 f . . . .
                . . . . e e 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . c c . . . . . . .
                . . . . . . c 5 c c . . . . . .
                . . . . c c c 5 5 5 c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f . . .
                . . f f e e b f e e e f . . . .
                . . f f f b 1 f b b e f . . . .
                . . . f f e e b b b b f . . . .
                . . . f e b b e e e f . . . . .
                . . . . e b b e b b 5 f . . . .
                . . . . f e e 5 5 5 5 c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . c c . . . . . . .
                . . . . . . . c 5 c . . . . . .
                . . . . c c c 5 5 5 c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f . . .
                . . f f e e b f e e e f . . . .
                . . f f f b 1 f b b e f . . . .
                . . . f f b b b b b b f . . . .
                . . . e e f e e e e f . . . . .
                . . . e b b e b b 5 f . . . . .
                . . . e b b e 5 5 5 5 f . . . .
                . . . . e e 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . c c . . . . . . .
                . . . . . . c 5 c c . . . . . .
                . . . . c c c 5 5 5 c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f . . .
                . . f f e e b f e e e f . . . .
                . . f f f b 1 f b b e f . . . .
                . . . f f b b b b b b f . . . .
                . . e b b e e e e e f . . . . .
                . . e b b e b b b 5 5 f . . . .
                . . . e e e 5 5 5 5 5 c . . . .
                . . . . . f f f f f f . . . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    characterAnimations.loop_frames(wiz,
        [img("""
            . . . . . . . c c . . . . . . .
            . . . . . . . c 5 c . . . . . .
            . . . . c c c 5 5 5 c c . . . .
            . . c c b c 5 5 5 5 c c c c . .
            . c b b 5 b 5 5 5 5 b 5 b b c .
            . c b 5 5 b b 5 5 b b 5 5 b c .
            . . f 5 5 5 b b b b 5 5 5 c . .
            . . f f 5 5 5 5 5 5 5 5 f . . .
            . . f f e e b f e e e f . . . .
            . . f f f b 1 f b b e f . . . .
            . . . f f b b b b b b f . . . .
            . . . e e f e e e e f . . . . .
            . . . e b b e b b 5 f . . . . .
            . . . e b b e 5 5 5 5 f . . . .
            . . . . e e 5 5 5 5 b c . . . .
            . . . . . f f f f f f . . . . .
            """)],
        200,
        characterAnimations.rule(Predicate.FACING_RIGHT))
    return wiz
def change_floater(icon: Image, change: number):
    global textSprite
    if change > 0:
        textSprite = textsprite.create("+" + str(change))
    else:
        textSprite = textsprite.create("" + str(change))
    textSprite.set_max_font_height(5)
    textSprite.set_icon(icon)
    textSprite.z = 99
    textSprite.set_position(Wizard.x, Wizard.y)
    
    def on_after3():
        sprites.destroy(textSprite, effects.disintegrate, 500)
    timer.after(500, on_after3)
    

def on_on_overlap4(sprite7, otherSprite4):
    global Keys
    music.play(music.melody_playable(music.thump),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(otherSprite4)
    if Keys:
        Keys += -1
        change_floater(img("""
                . . . . 5 5 5 5 . . . .
                . . . 5 e e e e e . . .
                . . . 5 e c c e e . . .
                . . . 5 e c c e e . . .
                . . . 5 e c c 5 e . . .
                . . . 5 e e 5 e e . . .
                . . . . e e e e . . . .
                . . . . . 5 e . . . . .
                . . . . . 5 e . . . . .
                . . . . . 5 e 5 5 . . .
                . . . . . 5 e e e . . .
                . . . . . 5 e 5 . . . .
                """),
            -1)
        update_labels()
    else:
        game.set_game_over_message(False, "Eyes gouged by evil monkey!")
        info.change_life_by(-1)
        change_floater(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . f f f . f f f . . . .
                . . . . f 3 3 3 f 3 3 3 f . . .
                . . . . f 3 3 3 3 3 1 3 f . . .
                . . . . f 3 3 3 3 3 3 3 f . . .
                . . . . . f 3 b b b 3 f . . . .
                . . . . . f f b b b f f . . . .
                . . . . . . f f b f f . . . . .
                . . . . . . . f f f . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            -1)
sprites.on_overlap(SpriteKind.player, SpriteKind.Monkey, on_on_overlap4)

def on_overlap_tile2(sprite8, location5):
    global Keys
    tiles.set_tile_at(location5, assets.tile("""
        transparency16
        """))
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    Keys += 1
    update_labels()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile
        """),
    on_overlap_tile2)

def create_label(Icon: Image, Y: number):
    global label
    label = textsprite.create("x0", 0, 1)
    label.set_icon(Icon)
    label.set_outline(1, 6)
    label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    label.top = 0
    label.left = Y
    return label

def on_a_pressed():
    global projectile, Magic
    if Magic and not (falling):
        if characterAnimations.matches_rule(Wizard, characterAnimations.rule(Predicate.MOVING_RIGHT)) or characterAnimations.matches_rule(Wizard,
            characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_RIGHT)):
            projectile = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . . . . . 2 2 1 1 1 1 2 . .
                    . . . . 2 2 3 3 1 1 1 1 1 1 . .
                    . . 3 3 3 3 1 1 1 1 1 1 1 1 . .
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . 3 3 2 2 3 1 1 1 1 1 1 1 . .
                    . . . . . . 2 2 3 1 1 1 1 2 . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    """),
                Wizard,
                100,
                0)
        elif characterAnimations.matches_rule(Wizard, characterAnimations.rule(Predicate.MOVING_LEFT)) or characterAnimations.matches_rule(Wizard,
            characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_LEFT)):
            projectile = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . 2 2 2 2 . . . . . . . . .
                    . . 2 1 1 1 1 2 2 . . . . . . .
                    . . 1 1 1 1 1 1 3 3 2 2 . . . .
                    . . 1 1 1 1 1 1 1 1 3 3 3 3 . .
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . 1 1 1 1 1 1 1 3 2 2 3 3 . .
                    . . 2 1 1 1 1 3 2 2 . . . . . .
                    . . . 2 2 2 2 . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    """),
                Wizard,
                -100,
                0)
        elif characterAnimations.matches_rule(Wizard, characterAnimations.rule(Predicate.MOVING_UP)) or characterAnimations.matches_rule(Wizard,
            characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_UP)):
            projectile = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . 2 1 1 1 1 2 . . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . . 3 1 1 1 1 2 . . . . .
                    . . . . . 2 1 1 1 3 2 . . . . .
                    . . . . . 2 3 1 1 3 . . . . . .
                    . . . . . . 2 1 3 2 . . . . . .
                    . . . . . . 2 1 3 2 . . . . . .
                    . . . . . . 3 1 3 . . . . . . .
                    . . . . . . 3 1 3 . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    """),
                Wizard,
                0,
                -100)
        elif characterAnimations.matches_rule(Wizard, characterAnimations.rule(Predicate.MOVING_DOWN)) or characterAnimations.matches_rule(Wizard,
            characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_DOWN)):
            projectile = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . 3 1 3 . . . . . . .
                    . . . . . . 3 1 3 . . . . . . .
                    . . . . . . 2 1 3 2 . . . . . .
                    . . . . . . 2 1 3 2 . . . . . .
                    . . . . . 2 3 1 1 3 . . . . . .
                    . . . . . 2 1 1 1 3 2 . . . . .
                    . . . . . 3 1 1 1 1 2 . . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . 2 1 1 1 1 1 1 2 . . . .
                    . . . . . 2 1 1 1 1 2 . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    """),
                Wizard,
                0,
                100)
        projectile.start_effect(effects.trail)
        Magic += -1
        update_labels()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def create_ghost(tile: tiles.Location):
    global mySprite
    tiles.set_tile_at(tile, assets.tile("""
        transparency16
        """))
    mySprite = sprites.create(img("""
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            """),
        SpriteKind.Ghost)
    tiles.place_on_tile(mySprite, tile)
    mySprite.vy = 40
    mySprite.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
    characterAnimations.loop_frames(mySprite,
        [img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111ffff.....
                ......fffcdb1bc111cf....
                ....fc111cbfbf1b1b1f....
                ....f1b1b1ffffbfbfbf....
                ....fbfbfffffff.........
                .........fffff..........
                ..........fff...........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .....ffff111111bf.......
                ....fc111cdb1bdfff......
                ....f1b1bcbfbfc111cf....
                ....fbfbfbffff1b1b1f....
                .........fffffffbfbf....
                ..........fffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(mySprite,
        [img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111ffff.....
                ......fffcdb1bc111cf....
                ....fc111cbfbf1b1b1f....
                ....f1b1b1ffffbfbfbf....
                ....fbfbfffffff.........
                .........fffff..........
                ..........fff...........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """),
            img("""
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .....ffff111111bf.......
                ....fc111cdb1bdfff......
                ....f1b1bcbfbfc111cf....
                ....fbfbfbffff1b1b1f....
                .........fffffffbfbf....
                ..........fffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_DOWN))

def on_on_overlap5(sprite9, otherSprite5):
    sprites.destroy(sprite9)
    sprites.destroy(otherSprite5, effects.fire, 100)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Ghost, on_on_overlap5)

def on_on_overlap6(sprite10, otherSprite6):
    sprites.destroy(sprite10)
    sprites.destroy(otherSprite6, effects.fire, 100)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Bat, on_on_overlap6)

def create_boss(tile2: tiles.Location):
    global mySprite
    tiles.set_tile_at(tile2, assets.tile("""
        transparency16
        """))
    mySprite = sprites.create(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . c c . . .
            . . . . . . . c c c c 6 3 c . .
            . . . . . . c 6 3 3 3 3 6 c . .
            . . . . . c 6 6 3 3 3 3 3 3 c .
            . . . . c 6 6 6 6 3 3 3 3 3 3 c
            . c c c c c 6 6 c c 3 3 3 3 3 c
            b 5 5 c 3 3 c c 5 5 c 3 3 3 c c
            f f 5 c c c 3 c 5 f f 6 6 6 c c
            f f 5 c c c c c 5 f f 3 3 3 3 c
            . b 5 5 3 c 3 5 5 c 3 3 3 3 3 c
            . c 4 4 5 5 5 5 4 c c 3 3 3 c .
            c 4 5 5 4 4 4 4 5 5 4 c b b . .
            c 5 5 5 c 4 c 5 5 5 c 4 c 5 c .
            c 5 5 5 5 c 5 5 5 5 c 4 c 5 c .
            . c c c c c c c c c . . c c c .
            """),
        SpriteKind.Snail)
    tiles.place_on_tile(mySprite, tile2)
    mySprite.vy = 30
    mySprite.set_scale(2, ScaleAnchor.MIDDLE)
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . . c 5 5 5 5 b c c 3 3 3 3 3 c
                . . c 4 5 5 4 b 5 5 c 3 3 3 c .
                . c 5 b 4 4 b b 5 c c b b b . .
                . c 4 4 b 5 5 5 4 c 4 4 4 5 b .
                . c 5 4 c 5 5 5 c 4 4 4 c 5 c .
                . c 5 c 5 5 5 5 c 4 4 4 c c c .
                . . c c c c c c c . . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . c c . . . .
                . . . . . . c c c c 6 3 c . . .
                . . . . . c 6 6 3 3 3 6 c . . .
                . . . . c 6 6 3 3 3 3 3 3 c . .
                b c c c 6 6 c c 3 3 3 3 3 3 c .
                b 5 5 c 6 c 5 5 c 3 3 3 3 3 c .
                f f 5 c 6 c 5 f f 6 3 3 3 c c .
                f f 5 c c c 5 f f 6 6 6 6 c c .
                . b 5 5 3 5 5 c 3 3 3 3 3 3 c .
                . c 5 5 5 5 4 c c c 3 3 3 3 c .
                . c 4 5 5 4 4 b 5 5 c 3 3 c . .
                . c 5 b 4 4 b b 5 c b b c . . .
                . c c 5 4 c 5 5 5 c c 5 c . . .
                . . . c c 5 5 5 5 c c c c . . .
                . . . . c c c c c c . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 6 3 3 3 6 c . .
                . . . . . c 6 6 3 3 3 3 3 3 c .
                . b c c c 6 6 c c 3 3 3 3 3 3 c
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . f f 5 c c c 5 f f 6 6 6 6 c c
                . . b 5 5 3 5 5 c c c 3 3 3 3 c
                . . c 5 5 5 5 5 b 5 5 c 3 3 3 c
                . c 4 4 5 5 4 4 b b 5 c 3 3 c .
                . c 5 5 b 4 4 4 b 5 5 5 b c . .
                . c 5 5 5 4 4 4 c 5 5 5 c b . .
                . . c c c c 4 c 5 5 5 5 c c . .
                . . . . c c c c c c c c c c . .
                """),
            img("""
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . c c 5 5 5 5 4 c c 3 3 3 3 3 c
                c 5 5 4 5 5 4 c 5 5 c 3 3 3 c .
                b 5 4 b 4 4 4 c 5 5 5 b c c . .
                c 4 5 5 b 4 4 c 5 5 5 c b b . .
                c 5 5 5 c 4 c 5 5 5 5 c c 5 b .
                c 5 5 5 5 c 4 c c c c c c 5 c .
                . c c c c c c . . . . . c c c .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c b 5 5 5 5 c . .
                . c 3 3 3 c 5 5 b 4 5 5 4 c . .
                . . b b b c c 5 b b 4 4 b 5 c .
                . b 5 4 4 4 c 4 5 5 5 b 4 4 c .
                . c 5 c 4 4 4 c 5 5 5 c 4 5 c .
                . c c c 4 4 4 c 5 5 5 5 c 5 c .
                . . . . . . . c c c c c c c . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . c c . . . . . . . . . .
                . . . c 3 6 c c c c . . . . . .
                . . . c 6 3 3 3 6 6 c . . . . .
                . . c 3 3 3 3 3 3 6 6 c . . . .
                . c 3 3 3 3 3 3 c c 6 6 c c c b
                . c 3 3 3 3 3 c 5 5 c 6 c 5 5 b
                . c c 3 3 3 6 f f 5 c 6 c 5 f f
                . c c 6 6 6 6 f f 5 c c c 5 f f
                . c 3 3 3 3 3 3 c 5 5 3 5 5 b .
                . c 3 3 3 3 c c c 4 5 5 5 5 c .
                . . c 3 3 c 5 5 b 4 4 5 5 4 c .
                . . . c b b c 5 b b 4 4 b 5 c .
                . . . c 5 c c 5 5 5 c 4 5 c c .
                . . . c c c c 5 5 5 5 c c . . .
                . . . . . . c c c c c c . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 6 6 c . . . . . .
                . c 3 3 3 3 3 3 6 6 c . . . . .
                c 3 3 3 3 3 3 c c 6 6 c c c b .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 f f 5 c c c 5 f f .
                c 3 3 3 3 c c c 5 5 3 5 5 b . .
                c 3 3 3 c 5 5 b 5 5 5 5 5 c . .
                . c 3 3 c 5 b b 4 4 5 5 4 4 c .
                . . c b 5 5 5 b 4 4 4 b 5 5 c .
                . . b c 5 5 5 c 4 4 4 5 5 5 c .
                . . c c 5 5 5 5 c 4 c c c c . .
                . . c c c c c c c c c c . . . .
                """),
            img("""
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c 4 5 5 5 5 c c .
                . c 3 3 3 c 5 5 c 4 5 5 4 5 5 c
                . . c c b 5 5 5 c 4 4 4 b 4 5 b
                . . b b c 5 5 5 c 4 4 b 5 5 4 c
                . b 5 c c 5 5 5 5 c 4 c 5 5 5 c
                . c 5 c c c c c c 4 c 5 5 5 5 c
                . c c c . . . . . c c c c c c .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_DOWN))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . . c 5 5 5 5 b c c 3 3 3 3 3 c
                . . c 4 5 5 4 b 5 5 c 3 3 3 c .
                . c 5 b 4 4 b b 5 c c b b b . .
                . c 4 4 b 5 5 5 4 c 4 4 4 5 b .
                . c 5 4 c 5 5 5 c 4 4 4 c 5 c .
                . c 5 c 5 5 5 5 c 4 4 4 c c c .
                . . c c c c c c c . . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . c c . . . .
                . . . . . . c c c c 6 3 c . . .
                . . . . . c 6 6 3 3 3 6 c . . .
                . . . . c 6 6 3 3 3 3 3 3 c . .
                b c c c 6 6 c c 3 3 3 3 3 3 c .
                b 5 5 c 6 c 5 5 c 3 3 3 3 3 c .
                f f 5 c 6 c 5 f f 6 3 3 3 c c .
                f f 5 c c c 5 f f 6 6 6 6 c c .
                . b 5 5 3 5 5 c 3 3 3 3 3 3 c .
                . c 5 5 5 5 4 c c c 3 3 3 3 c .
                . c 4 5 5 4 4 b 5 5 c 3 3 c . .
                . c 5 b 4 4 b b 5 c b b c . . .
                . c c 5 4 c 5 5 5 c c 5 c . . .
                . . . c c 5 5 5 5 c c c c . . .
                . . . . c c c c c c . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 6 3 3 3 6 c . .
                . . . . . c 6 6 3 3 3 3 3 3 c .
                . b c c c 6 6 c c 3 3 3 3 3 3 c
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . f f 5 c c c 5 f f 6 6 6 6 c c
                . . b 5 5 3 5 5 c c c 3 3 3 3 c
                . . c 5 5 5 5 5 b 5 5 c 3 3 3 c
                . c 4 4 5 5 4 4 b b 5 c 3 3 c .
                . c 5 5 b 4 4 4 b 5 5 5 b c . .
                . c 5 5 5 4 4 4 c 5 5 5 c b . .
                . . c c c c 4 c 5 5 5 5 c c . .
                . . . . c c c c c c c c c c . .
                """),
            img("""
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . c c 5 5 5 5 4 c c 3 3 3 3 3 c
                c 5 5 4 5 5 4 c 5 5 c 3 3 3 c .
                b 5 4 b 4 4 4 c 5 5 5 b c c . .
                c 4 5 5 b 4 4 c 5 5 5 c b b . .
                c 5 5 5 c 4 c 5 5 5 5 c c 5 b .
                c 5 5 5 5 c 4 c c c c c c 5 c .
                . c c c c c c . . . . . c c c .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c b 5 5 5 5 c . .
                . c 3 3 3 c 5 5 b 4 5 5 4 c . .
                . . b b b c c 5 b b 4 4 b 5 c .
                . b 5 4 4 4 c 4 5 5 5 b 4 4 c .
                . c 5 c 4 4 4 c 5 5 5 c 4 5 c .
                . c c c 4 4 4 c 5 5 5 5 c 5 c .
                . . . . . . . c c c c c c c . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . c c . . . . . . . . . .
                . . . c 3 6 c c c c . . . . . .
                . . . c 6 3 3 3 6 6 c . . . . .
                . . c 3 3 3 3 3 3 6 6 c . . . .
                . c 3 3 3 3 3 3 c c 6 6 c c c b
                . c 3 3 3 3 3 c 5 5 c 6 c 5 5 b
                . c c 3 3 3 6 f f 5 c 6 c 5 f f
                . c c 6 6 6 6 f f 5 c c c 5 f f
                . c 3 3 3 3 3 3 c 5 5 3 5 5 b .
                . c 3 3 3 3 c c c 4 5 5 5 5 c .
                . . c 3 3 c 5 5 b 4 4 5 5 4 c .
                . . . c b b c 5 b b 4 4 b 5 c .
                . . . c 5 c c 5 5 5 c 4 5 c c .
                . . . c c c c 5 5 5 5 c c . . .
                . . . . . . c c c c c c . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 6 6 c . . . . . .
                . c 3 3 3 3 3 3 6 6 c . . . . .
                c 3 3 3 3 3 3 c c 6 6 c c c b .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 f f 5 c c c 5 f f .
                c 3 3 3 3 c c c 5 5 3 5 5 b . .
                c 3 3 3 c 5 5 b 5 5 5 5 5 c . .
                . c 3 3 c 5 b b 4 4 5 5 4 4 c .
                . . c b 5 5 5 b 4 4 4 b 5 5 c .
                . . b c 5 5 5 c 4 4 4 5 5 5 c .
                . . c c 5 5 5 5 c 4 c c c c . .
                . . c c c c c c c c c c . . . .
                """),
            img("""
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c 4 5 5 5 5 c c .
                . c 3 3 3 c 5 5 c 4 5 5 4 5 5 c
                . . c c b 5 5 5 c 4 4 4 b 4 5 b
                . . b b c 5 5 5 c 4 4 b 5 5 4 c
                . b 5 c c 5 5 5 5 c 4 c 5 5 5 c
                . c 5 c c c c c c 4 c 5 5 5 5 c
                . c c c . . . . . c c c c c c .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_RIGHT))

def on_on_overlap7(sprite, otherSprite):
    sprites.destroy(sprite)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Snail, on_on_overlap7)

def Starfire():
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . 2 2 2 2 . . .
            . . . . . . . 2 2 1 1 1 1 2 . .
            . . . . 2 2 3 3 1 1 1 1 1 1 . .
            . . 3 3 3 3 1 1 1 1 1 1 1 1 . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . 3 3 2 2 3 1 1 1 1 1 1 1 . .
            . . . . . . 2 2 3 1 1 1 1 2 . .
            . . . . . . . . . 2 2 2 2 . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        Wizard,
        100,
        0)
    projectile.start_effect(effects.trail)
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . 2 2 2 2 . . . . . . . . .
            . . 2 1 1 1 1 2 2 . . . . . . .
            . . 1 1 1 1 1 1 3 3 2 2 . . . .
            . . 1 1 1 1 1 1 1 1 3 3 3 3 . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . 1 1 1 1 1 1 1 3 2 2 3 3 . .
            . . 2 1 1 1 1 3 2 2 . . . . . .
            . . . 2 2 2 2 . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        Wizard,
        -100,
        0)
    projectile.start_effect(effects.trail)
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . 2 1 1 1 1 2 . . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . . 3 1 1 1 1 2 . . . . .
            . . . . . 2 1 1 1 3 2 . . . . .
            . . . . . 2 3 1 1 3 . . . . . .
            . . . . . . 2 1 3 2 . . . . . .
            . . . . . . 2 1 3 2 . . . . . .
            . . . . . . 3 1 3 . . . . . . .
            . . . . . . 3 1 3 . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        Wizard,
        0,
        -100)
    projectile.start_effect(effects.trail)
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . 3 1 3 . . . . . . .
            . . . . . . 3 1 3 . . . . . . .
            . . . . . . 2 1 3 2 . . . . . .
            . . . . . . 2 1 3 2 . . . . . .
            . . . . . 2 3 1 1 3 . . . . . .
            . . . . . 2 1 1 1 3 2 . . . . .
            . . . . . 3 1 1 1 1 2 . . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . 2 1 1 1 1 1 1 2 . . . .
            . . . . . 2 1 1 1 1 2 . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        Wizard,
        0,
        100)
    projectile.start_effect(effects.trail)


def update_labels():
    magic_label.set_text("x" + str(Magic))
    key_label.set_text("x" + str(Keys))
    coin_label.set_text("x" + str(coins))


def advance_level():
    global current_level
    current_level += 1
    Wizard.set_scale(1, ScaleAnchor.MIDDLE)
    controller.move_sprite(Wizard, 60, 60)
    tiles.set_current_tilemap(levels[current_level])
    render_walls()


def create_bat(tile3: tiles.Location):
    tiles.set_tile_at(tile3, assets.tile("transparency16"))
    mySprite = sprites.create(img("""
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c b b b b b b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b c b b b c b b b b f . . . .
            f b 1 f f f 1 b b b b f c . . .
            f b b b b b b b b b b f c c . .
            . f b b b b b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            """),
        SpriteKind.Bat)
    tiles.place_on_tile(mySprite, tile3)
    mySprite.vx = 40
    mySprite.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . f f f . . . . . . . . f f f
                . f f c c . . . . . . f c b b c
                f f c c . . . . . . f c b b c .
                f c f c . . . . . . f b c c c .
                f f f c c . c c . f c b b c c .
                f f c 3 c c 3 c c f b c b b c .
                f f b 3 b c 3 b c f b c c b c .
                . c b b b b b b c b b c c c . .
                . c 1 b b b 1 b b c c c c . . .
                c b b b b b b b b b c c . . . .
                c b c b b b c b b b b f . . . .
                f b 1 f f f 1 b b b b f c . . .
                f b b b b b b b b b b f c c . .
                . f b b b b b b b b c f . . . .
                . . f b b b b b b c f . . . . .
                . . . f f f f f f f . . . . . .
                """),
            img("""
                . . f f f . . . . . . . . . . .
                f f f c c . . . . . . . . f f f
                f f c c . . c c . . . f c b b c
                f f c 3 c c 3 c c f f b b b c .
                f f b 3 b c 3 b c f b b c c c .
                . c b b b b b b c f b c b c c .
                . c b b b b b b c b b c b b c .
                c b 1 b b b 1 b b b c c c b c .
                c b b b b b b b b c c c c c . .
                f b c b b b c b b b b f c . . .
                f b 1 f f f 1 b b b b f c c . .
                . f b b b b b b b b c f . . . .
                . . f b b b b b b c f . . . . .
                . . . f f f f f f f . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . c c . . c c . . . . . . . .
                . . c 3 c c 3 c c c . . . . . .
                . c b 3 b c 3 b c c c . . . . .
                . c b b b b b b b b f f . . . .
                c c b b b b b b b b f f . . . .
                c b 1 b b b 1 b b c f f f . . .
                c b b b b b b b b f f f f . . .
                f b c b b b c b c c b b b . . .
                f b 1 f f f 1 b f c c c c . . .
                . f b b b b b b f b b c c . . .
                c c f b b b b b c c b b c . . .
                c c c f f f f f f c c b b c . .
                . c c c . . . . . . c c c c c .
                . . c c c . . . . . . . c c c c
                . . . . . . . . . . . . . . . .
                """),
            img("""
                . f f f . . . . . . . . f f f .
                f f c . . . . . . . f c b b c .
                f c c . . . . . . f c b b c . .
                c f . . . . . . . f b c c c . .
                c f f . . . . . f f b b c c . .
                f f f c c . c c f b c b b c . .
                f f f c c c c c f b c c b c . .
                . f c 3 c c 3 b c b c c c . . .
                . c b 3 b c 3 b b c c c c . . .
                c c b b b b b b b b c c . . . .
                c b 1 b b b 1 b b b b f c . . .
                f b b b b b b b b b b f c c . .
                f b c b b b c b b b b f . . . .
                . f 1 f f f 1 b b b c f . . . .
                . . f b b b b b b c f . . . . .
                . . . f f f f f f f . . . . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(mySprite,
        [img("""
                f f f . . . . . . . . f f f . .
                c b b c f . . . . . . c c f f .
                . c b b c f . . . . . . c c f f
                . c c c b f . . . . . . c f c f
                . c c b b c f . c c . c c f f f
                . c b b c b f c c 3 c c 3 c f f
                . c b c c b f c b 3 c b 3 b f f
                . . c c c b b c b b b b b b c .
                . . . c c c c b b 1 b b b 1 c .
                . . . . c c b b b b b b b b b c
                . . . . f b b b b c b b b c b c
                . . . c f b b b b 1 f f f 1 b f
                . . c c f b b b b b b b b b b f
                . . . . f c b b b b b b b b f .
                . . . . . f c b b b b b b f . .
                . . . . . . f f f f f f f . . .
                """),
            img("""
                . . . . . . . . . . . f f f . .
                f f f . . . . . . . . c c f f f
                c b b c f . . . c c . . c c f f
                . c b b b f f c c 3 c c 3 c f f
                . c c c b b f c b 3 c b 3 b f f
                . c c b c b f c b b b b b b c .
                . c b b c b b c b b b b b b c .
                . c b c c c b b b 1 b b b 1 b c
                . . c c c c c b b b b b b b b c
                . . . c f b b b b c b b b c b f
                . . c c f b b b b 1 f f f 1 b f
                . . . . f c b b b b b b b b f .
                . . . . . f c b b b b b b f . .
                . . . . . . f f f f f f f . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . c c . . c c . .
                . . . . . . c c c 3 c c 3 c . .
                . . . . . c c c b 3 c b 3 b c .
                . . . . f f b b b b b b b b c .
                . . . . f f b b b b b b b b c c
                . . . f f f c b b 1 b b b 1 b c
                . . . f f f f b b b b b b b b c
                . . . b b b c c b c b b b c b f
                . . . c c c c f b 1 f f f 1 b f
                . . . c c b b f b b b b b b f .
                . . . c b b c c b b b b b f c c
                . . c b b c c f f f f f f c c c
                . c c c c c . . . . . . c c c .
                c c c c . . . . . . . c c c . .
                . . . . . . . . . . . . . . . .
                """),
            img("""
                . f f f . . . . . . . . f f f .
                . c b b c f . . . . . . . c f f
                . . c b b c f . . . . . . c c f
                . . c c c b f . . . . . . . f c
                . . c c b b f f . . . . . f f c
                . . c b b c b f c c . c c f f f
                . . c b c c b f c c c c c f f f
                . . . c c c b c b 3 c c 3 c f .
                . . . c c c c b b 3 c b 3 b c .
                . . . . c c b b b b b b b b c c
                . . . c f b b b b 1 b b b 1 b c
                . . c c f b b b b b b b b b b f
                . . . . f b b b b c b b b c b f
                . . . . f c b b b 1 f f f 1 f .
                . . . . . f c b b b b b b f . .
                . . . . . . f f f f f f f . . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_RIGHT))

def on_overlap_tile3(sprite12, location6):
    global Magic
    tiles.set_tile_at(location6, assets.tile("""
        transparency16
        """))
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    Magic += 1
    update_labels()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
        """),
    on_overlap_tile3)

def on_life_zero():
    info.set_score(coins)
    game.game_over(False)
info.on_life_zero(on_life_zero)

def on_overlap_tile4(sprite13, location7):
    global falling
    if not falling:
        falling = 1
        controller.move_sprite(sprite13, 0, 0)
        tiles.place_on_tile(sprite13, location7)
        
        def on_after4():
            music.play(music.melody_playable(music.jump_down),
                music.PlaybackMode.IN_BACKGROUND)
            sprite13.set_scale(0.75, ScaleAnchor.MIDDLE)
            
            def on_after5():
                sprite13.set_scale(0.5, ScaleAnchor.MIDDLE)
                
                def on_after6():
                    global falling
                    advance_level()
                    falling = 0
                timer.after(500, on_after6)
                
            timer.after(500, on_after5)
            
        timer.after(250, on_after4)
        
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_hole,
    on_overlap_tile4)

def create_monkey(tile4: tiles.Location):
    tiles.set_tile_at(tile4, assets.tile("transparency16"))
    mySprite = sprites.create(img("""
            . . . . f f f f f . . . . . . .
            . . . f e e e e e f . . . . . .
            . . f d d d d e e e f . . . . .
            . c d f d d f d e e f f . . . .
            . c d f d d f d e e d d f . . .
            c d e e d d d d e e b d c . . .
            c d d d d c d d e e b d c . f f
            c c c c c d d d e e f c . f e f
            . f d d d d d e e f f . . f e f
            . . f f f f f e e e e f . f e f
            . . . . f e e e e e e e f f e f
            . . . f e f f e f e e e e f f .
            . . . f e f f e f e e e e f . .
            . . . f d b f d b f f e f . . .
            . . . f d d c d d b b d f . . .
            . . . . f f f f f f f f f . . .
            """),
        SpriteKind.Monkey)
    tiles.place_on_tile(mySprite, tile4)
    mySprite.vy = 40
    mySprite.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f f . . . .
                . c d f d d f d e e d d f . . .
                c d e e d d d d e e b d c . . .
                c d d d d c d d e e b d c . f f
                c c c c c d d d e e f c . f e f
                . f d d d d d e e f f . . f e f
                . . f f f f f e e e e f . f e f
                . . . . f e e e e e e e f f e f
                . . . f e f f e f e e e e f f .
                . . . f e f f e f e e e e f . .
                . . . f d b f d b f f e f . . .
                . . . f d d c d d b b d f . . .
                . . . . f f f f f f f f f . . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f . . . . .
                . c d f d d f d e e f f . . . .
                c d e e d d d d e e d d f . . .
                c d d d d c d d e e b d c . . .
                c c c c c d d e e e b d c . f f
                . f d d d d e e e f f c . f e f
                . f f f f f f e e e e f . f e f
                . f f f f e e e e e e e f f e f
                f d d f d d f e f e e e e f f .
                f d b f d b f e f e e e e f . .
                f f f f f f f f f f f f e f . .
                . . . . . . . . . f c d d f . .
                . . . . . . . . . . f f f f . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f f . . . .
                . c d d d d d d e e d d f . . .
                . c d f d d f d e e b d c . . .
                c d d f d d f d e e b d c . f f
                c d e e d d d d e e f c . f e f
                c d d d d c d e e e f . . f e f
                . f c c c d e e e f f . . f e f
                . . f f f f f e e e e f . f e f
                . . . . f e e e e e e e f f f .
                . . f f e f e e f e e e e f . .
                . f e f f e e f f f e e e f . .
                f d d b d d c f f f f f f b f .
                f d d c d d d f . . f c d d f .
                . f f f f f f f . . . f f f . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f f f . . . .
                . . f d d d e e e e d d f . . .
                . c d d d d d e e e b d c . . .
                . c d d d d d d e e b d c . . .
                c d d f d d f d e e f c . f f .
                c d d f d d f d e e f . . f e f
                c d e e d d d d e e f . . f e f
                . f d d d c d e e f f . . f e f
                . . f f f d e e e e e f . f e f
                . . . . f e e e e e e e f f f .
                . . . . f f e e e e e b f f . .
                . . . f e f f e e c d d f f . .
                . . f d d b d d c f f f . . . .
                . . f d d c d d d f f . . . . .
                . . . f f f f f f f . . . . . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f f . . . .
                . c d f d d f d e e d d f . . .
                c d e e d d d d e e b d c . . .
                c d d d d c d d e e b d c . . .
                c c c c c d d e e e f c . . . .
                . f d d d d e e e f f . . . . .
                . . f f f f f e e e e f . . . .
                . . . . f f e e e e e e f . f f
                . . . f e e f e e f e e f . e f
                . . f e e f e e f e e e f . e f
                . f b d f d b f b b f e f f e f
                . f d d f d d f d d b e f f f f
                . . f f f f f f f f f f f f f .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                f f . c d b e e d d c d d d d c
                f e f . c f e e d d d c c c c c
                f e f . . f f e e d d d d d f .
                f e f . f e e e e f f f f f . .
                f e f f e e e e e e e f . . . .
                . f f e e e e f e f f e f . . .
                . . f e e e e f e f f e f . . .
                . . . f e f f b d f b d f . . .
                . . . f d b b d d c d d f . . .
                . . . f f f f f f f f f . . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . . f e e d f d d f d c .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d d d d e e d c
                . . . c d b e e d d c d d d d c
                f f . c d b e e e d d c c c c c
                f e f . c f f e e e d d d d f .
                f e f . f e e e e f f f f f f .
                f e f f e e e e e e e f f f f .
                . f f e e e e f e f d d f d d f
                . . f e e e e f e f b d f b d f
                . . f e f f f f f f f f f f f f
                . . f d d c f . . . . . . . . .
                . . f f f f . . . . . . . . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . f f e e e d d d d f . .
                . . . f d d e e d d d d d d c .
                . . . c d b e e d f d d f d c .
                f f . c d b e e d f d d f d d c
                f e f . c f e e d d d d e e d c
                f e f . . f e e e d c d d d d c
                f e f . . f f e e e d c c c f .
                f e f . f e e e e f f f f f . .
                . f f f e e e e e e e f . . . .
                . . f e e e e f e e f e f f . .
                . . f e e e f f f e e f f e f .
                . f b f f f f f f c d d b d d f
                . f d d c f . . f d d d c d d f
                . . f f f . . . f f f f f f f .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . f f f e e e e e f . . .
                . . . f d d e e e e d d d f . .
                . . . c d b e e e d d d d d c .
                . . . c d b e e d d d d d d c .
                . f f . c f e e d f d d f d d c
                f e f . . f e e d f d d f d d c
                f e f . . f e e d d d d e e d c
                f e f . . f f e e d c d d d f .
                f e f . f e e e e e d f f f . .
                . f f f e e e e e e e f . . . .
                . . f f b e e e e e f f . . . .
                . . f f d d c e e f f e f . . .
                . . . . f f f c d d b d d f . .
                . . . . . f f d d d c d d f . .
                . . . . . . f f f f f f f . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                . . . c d b e e d d c d d d d c
                . . . . c f e e e d d c c c c c
                . . . . . f f e e e d d d d f .
                . . . . f e e e e f f f f f . .
                f f . f e e e e e e f f . . . .
                f e . f e e f e e f e e f . . .
                f e . f e e e f e e f e e f . .
                f e f f e f b b f b d f d b f .
                f f f f e b d d f d d f d d f .
                . f f f f f f f f f f f f f . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_DOWN))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                f f . c d b e e d d c d d d d c
                f e f . c f e e d d d c c c c c
                f e f . . f f e e d d d d d f .
                f e f . f e e e e f f f f f . .
                f e f f e e e e e e e f . . . .
                . f f e e e e f e f f e f . . .
                . . f e e e e f e f f e f . . .
                . . . f e f f b d f b d f . . .
                . . . f d b b d d c d d f . . .
                . . . f f f f f f f f f . . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . . f e e d f d d f d c .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d d d d e e d c
                . . . c d b e e d d c d d d d c
                f f . c d b e e e d d c c c c c
                f e f . c f f e e e d d d d f .
                f e f . f e e e e f f f f f f .
                f e f f e e e e e e e f f f f .
                . f f e e e e f e f d d f d d f
                . . f e e e e f e f b d f b d f
                . . f e f f f f f f f f f f f f
                . . f d d c f . . . . . . . . .
                . . f f f f . . . . . . . . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . f f e e e d d d d f . .
                . . . f d d e e d d d d d d c .
                . . . c d b e e d f d d f d c .
                f f . c d b e e d f d d f d d c
                f e f . c f e e d d d d e e d c
                f e f . . f e e e d c d d d d c
                f e f . . f f e e e d c c c f .
                f e f . f e e e e f f f f f . .
                . f f f e e e e e e e f . . . .
                . . f e e e e f e e f e f f . .
                . . f e e e f f f e e f f e f .
                . f b f f f f f f c d d b d d f
                . f d d c f . . f d d d c d d f
                . . f f f . . . f f f f f f f .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . f f f e e e e e f . . .
                . . . f d d e e e e d d d f . .
                . . . c d b e e e d d d d d c .
                . . . c d b e e d d d d d d c .
                . f f . c f e e d f d d f d d c
                f e f . . f e e d f d d f d d c
                f e f . . f e e d d d d e e d c
                f e f . . f f e e d c d d d f .
                f e f . f e e e e e d f f f . .
                . f f f e e e e e e e f . . . .
                . . f f b e e e e e f f . . . .
                . . f f d d c e e f f e f . . .
                . . . . f f f c d d b d d f . .
                . . . . . f f d d d c d d f . .
                . . . . . . f f f f f f f . . .
                """),
            img("""
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                . . . c d b e e d d c d d d d c
                . . . . c f e e e d d c c c c c
                . . . . . f f e e e d d d d f .
                . . . . f e e e e f f f f f . .
                f f . f e e e e e e f f . . . .
                f e . f e e f e e f e e f . . .
                f e . f e e e f e e f e e f . .
                f e f f e f b b f b d f d b f .
                f f f f e b d d f d d f d d f .
                . f f f f f f f f f f f f f . .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    characterAnimations.loop_frames(mySprite,
        [img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f f . . . .
                . c d f d d f d e e d d f . . .
                c d e e d d d d e e b d c . . .
                c d d d d c d d e e b d c . f f
                c c c c c d d d e e f c . f e f
                . f d d d d d e e f f . . f e f
                . . f f f f f e e e e f . f e f
                . . . . f e e e e e e e f f e f
                . . . f e f f e f e e e e f f .
                . . . f e f f e f e e e e f . .
                . . . f d b f d b f f e f . . .
                . . . f d d c d d b b d f . . .
                . . . . f f f f f f f f f . . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f . . . . .
                . c d f d d f d e e f f . . . .
                c d e e d d d d e e d d f . . .
                c d d d d c d d e e b d c . . .
                c c c c c d d e e e b d c . f f
                . f d d d d e e e f f c . f e f
                . f f f f f f e e e e f . f e f
                . f f f f e e e e e e e f f e f
                f d d f d d f e f e e e e f f .
                f d b f d b f e f e e e e f . .
                f f f f f f f f f f f f e f . .
                . . . . . . . . . f c d d f . .
                . . . . . . . . . . f f f f . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f f . . . .
                . c d d d d d d e e d d f . . .
                . c d f d d f d e e b d c . . .
                c d d f d d f d e e b d c . f f
                c d e e d d d d e e f c . f e f
                c d d d d c d e e e f . . f e f
                . f c c c d e e e f f . . f e f
                . . f f f f f e e e e f . f e f
                . . . . f e e e e e e e f f f .
                . . f f e f e e f e e e e f . .
                . f e f f e e f f f e e e f . .
                f d d b d d c f f f f f f b f .
                f d d c d d d f . . f c d d f .
                . f f f f f f f . . . f f f . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f f f . . . .
                . . f d d d e e e e d d f . . .
                . c d d d d d e e e b d c . . .
                . c d d d d d d e e b d c . . .
                c d d f d d f d e e f c . f f .
                c d d f d d f d e e f . . f e f
                c d e e d d d d e e f . . f e f
                . f d d d c d e e f f . . f e f
                . . f f f d e e e e e f . f e f
                . . . . f e e e e e e e f f f .
                . . . . f f e e e e e b f f . .
                . . . f e f f e e c d d f f . .
                . . f d d b d d c f f f . . . .
                . . f d d c d d d f f . . . . .
                . . . f f f f f f f . . . . . .
                """),
            img("""
                . . . . f f f f f . . . . . . .
                . . . f e e e e e f . . . . . .
                . . f d d d d e e e f . . . . .
                . c d f d d f d e e f f . . . .
                . c d f d d f d e e d d f . . .
                c d e e d d d d e e b d c . . .
                c d d d d c d d e e b d c . . .
                c c c c c d d e e e f c . . . .
                . f d d d d e e e f f . . . . .
                . . f f f f f e e e e f . . . .
                . . . . f f e e e e e e f . f f
                . . . f e e f e e f e e f . e f
                . . f e e f e e f e e e f . e f
                . f b d f d b f b b f e f f e f
                . f d d f d d f d d b e f f f f
                . . f f f f f f f f f f f f f .
                """)],
        200,
        characterAnimations.rule(Predicate.MOVING_LEFT))

def on_hit_wall3(sprite14, location8):
    if tiles.tile_at_location_equals(location8, sprites.dungeon.stair_ladder):
        tiles.set_tile_at(location8, assets.tile("""
            transparency16
            """))
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        tiles.set_wall_at(location8, False)
scene.on_hit_wall(SpriteKind.projectile, on_hit_wall3)

def init_inventory():
    global coins, Magic, Keys, key_label, magic_label, coin_label
    coins = 0
    Magic = 3
    Keys = 0
    key_label = create_label(img("""
            . . . . 5 5 5 5 . . . .
            . . . 5 e e e e e . . .
            . . . 5 e c c e e . . .
            . . . 5 e c c e e . . .
            . . . 5 e c c 5 e . . .
            . . . 5 e e 5 e e . . .
            . . . . e e e e . . . .
            . . . . . 5 e . . . . .
            . . . . . 5 e . . . . .
            . . . . . 5 e 5 5 . . .
            . . . . . 5 e e e . . .
            . . . . . 5 e 5 . . . .
            """),
        85)
    key_label.z += 100
    magic_label = create_label(img("""
            . . . . . 3 3 . . . . .
            . . . . 3 1 1 3 . . . .
            . . . . 3 1 1 3 . . . .
            3 2 2 3 1 1 1 1 3 2 2 .
            3 3 1 1 1 1 1 1 1 1 3 3
            3 3 1 1 1 1 1 1 1 1 3 3
            . 3 1 1 1 1 1 1 1 1 3 .
            . . 3 1 1 1 1 1 1 3 . .
            . . 2 1 1 1 1 1 1 2 . .
            . . 2 1 1 3 3 1 1 2 . .
            . . 3 3 3 2 2 2 3 3 . .
            . . . . . . . . . . . .
            """),
        55)
    magic_label.z += 100
    coin_label = create_label(img("""
            . . . . . . . . . . . .
            . . . . . . . . . . . .
            . . . . b b b b . . . .
            . . . b 5 5 5 5 b . . .
            . . b 5 d 3 3 d 5 b . .
            . . b 5 3 5 5 1 5 b . .
            . . c 5 3 5 5 1 d c . .
            . . c d d 1 1 d d c . .
            . . . f d d d d f . . .
            . . . . . . . . . . . .
            . . . . . . . . . . . .
            . . . . . . . . . . . .
            """),
        115)
    coin_label.z += 100
    update_labels()
coin_label: TextSprite = None
key_label: TextSprite = None
magic_label: TextSprite = None
projectile: Sprite = None
label: TextSprite = None
textSprite: TextSprite = None
wiz: Sprite = None
Magic = 0
mySprite: Sprite = None
coins = 0
Keys = 0
Wizard: Sprite = None
current_level = 0
levels: List[tiles.TileMapData] = []
falling = 0
game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
falling = 0
init_inventory()
levels = [tilemap("""
        level0
        """),
    tilemap("""
        level7
        """),
    tilemap("""
        level5
        """)]
current_level = -1
Wizard = create_wizard()
advance_level()