def render_walls():
    for column in range(18):
        for row in range(18):
            if tiles.tile_at_location_is_wall(tiles.get_tile_location(column, row)):
                tiles.set_tile_at(tiles.get_tile_location(column, row),
                    sprites.dungeon.chest_closed)
            elif tiles.tile_at_location_equals(tiles.get_tile_location(column, row),
                assets.tile("""
                    transparency16
                    """)):
                pass
            else:
                pass

def on_overlap_tile(sprite, location):
    tiles.set_tile_at(location, assets.tile("""
        transparency16
        """))
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile)

Wizard = sprites.create(assets.image("""Wiz"""), SpriteKind.player)
controller.move_sprite(Wizard, 60, 60)
scene.camera_follow_sprite(Wizard)
tiles.set_current_tilemap(tilemap("""level1"""))
render_walls()