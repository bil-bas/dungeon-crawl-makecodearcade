def render_walls():
    for column in range(18):
        for row in range(18):
            if tiles.tile_at_location_is_wall(tiles.get_tile_location(column, row)):
                tiles.set_tile_at(tiles.get_tile_location(column, row), sprites.builtin.brick)
            elif tiles.tile_at_location_equals(tiles.get_tile_location(column, row),
                sprites.dungeon.stair_large):
                tiles.place_on_tile(Wizard, tiles.get_tile_location(column, row))
            else:
                pass
def create_wizard():
    global wiz
    wiz = sprites.create(assets.image("""
        Wiz
        """), SpriteKind.player)
    controller.move_sprite(wiz, 60, 60)
    info.set_life(3)
    info.set_score(0)
    scene.camera_follow_sprite(wiz)
    return wiz

def on_overlap_tile(sprite, location):
    tiles.set_tile_at(location, sprites.dungeon.chest_open)
    info.change_score_by(10)
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile)

wiz: Sprite = None
Wizard: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
    """))
Wizard = create_wizard()
render_walls()