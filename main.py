def on_hit_wall(sprite, location):
    global Keys
    if tiles.tile_at_location_equals(location, sprites.dungeon.door_closed_north) and Keys >= 1:
        tiles.set_tile_at(location, sprites.dungeon.door_open_north)
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        tiles.set_wall_at(location, False)
        Keys += -1
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def render_walls():
    
    def on_for_each_tile_in_map(column, row, location2):
        global mySprite
        if tiles.tile_at_location_is_wall(location2):
            tiles.set_tile_at(location2, sprites.builtin.brick)
        elif tiles.tile_at_location_equals(location2, assets.tile("""
            Stairs down
            """)):
            tiles.place_on_tile(Wizard, location2)
        elif tiles.tile_at_location_equals(location2, sprites.dungeon.door_closed_north):
            tiles.set_wall_at(location2, True)
        elif tiles.tile_at_location_equals(location2, tileUtil.object4):
            tiles.set_tile_at(location2, assets.tile("""
                transparency16
                """))
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
                SpriteKind.enemy)
            tiles.place_on_tile(mySprite, location2)
            mySprite.vx = 40
            mySprite.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
        elif tiles.tile_at_location_equals(location2, tileUtil.object6):
            tiles.set_tile_at(location2, assets.tile("""
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
                SpriteKind.enemy)
            tiles.place_on_tile(mySprite, location2)
            mySprite.vy = 40
            mySprite.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
    tileUtil.for_each_tile_in_map(tileUtil.current_tilemap(), on_for_each_tile_in_map)
    
def create_wizard():
    global wiz
    wiz = sprites.create(assets.image("""
        Wiz
        """), SpriteKind.player)
    controller.move_sprite(wiz, 60, 60)
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
    if Magic:
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

def on_overlap_tile(sprite2, location3):
    tiles.set_tile_at(location3, assets.tile("""
        transparency16
        """))
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(1)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_blue_crystal,
    on_overlap_tile)

def on_overlap_tile2(sprite3, location4):
    global coins
    tiles.set_tile_at(location4, sprites.dungeon.chest_open)
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.IN_BACKGROUND)
    coins += 10
    update_labels()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile2)

def update_labels():
    magic_label.set_text("x" + str(Magic))
    key_label.set_text("x" + str(Keys))
    coin_label.set_text("x" + str(coins))

def on_overlap_tile3(sprite4, location5):
    global Magic
    tiles.set_tile_at(location5, assets.tile("""
        transparency16
        """))
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    Magic += 1
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_red_crystal,
    on_overlap_tile3)

def on_overlap_tile4(sprite5, location6):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.stair_large,
    on_overlap_tile4)

def on_on_overlap(sprite6, otherSprite):
    sprites.destroy(sprite6)
    sprites.destroy(otherSprite, effects.fire, 100)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite7, otherSprite2):
    if True:
        pass
    else:
        pass
    sprites.destroy(otherSprite2)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

projectile: Sprite = None
label: TextSprite = None
wiz: Sprite = None
mySprite: Sprite = None
coin_label: TextSprite = None
magic_label: TextSprite = None
key_label: TextSprite = None
Keys = 0
Magic = 0
coins = 0
Wizard: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
    """))
Wizard = create_wizard()
render_walls()
coins = 0
Magic = 3
Keys = 0
key_label = create_label(img("""
        . . . . c c c c . . . .
        . . . c 5 5 5 5 c . . .
        . . . c 5 c c 5 c . . .
        . . . c 5 c c 5 c . . .
        . . . c 5 c c 5 c . . .
        . . . c 5 5 5 5 c . . .
        . . . . c 5 c c . . . .
        . . . . . 5 c . . . . .
        . . . . . 5 c . . . . .
        . . . . . 5 c 5 5 . . .
        . . . . . 5 c c c . . .
        . . . . . 5 c 5 . . . .
        """),
    85)
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
update_labels()