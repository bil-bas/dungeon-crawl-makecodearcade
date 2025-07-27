function render_walls () {
    for (let column = 0; column <= 17; column++) {
        for (let row = 0; row <= 17; row++) {
            if (tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row))) {
                tiles.setTileAt(tiles.getTileLocation(column, row), sprites.builtin.brick)
            } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), assets.tile`transparency16`)) {
                tiles.setTileAt(tiles.getTileLocation(0, 0), sprites.builtin.brick)
            } else {
            	
            }
        }
    }
}
function create_wizard () {
    Wizard = sprites.create(assets.image`Wiz`, SpriteKind.Player)
    controller.moveSprite(Wizard, 60, 60)
    info.setLife(3)
    info.setScore(0)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(10)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
let Wizard: Sprite = null
scene.cameraFollowSprite(Wizard)
tiles.setCurrentTilemap(tilemap`level1`)
render_walls()
create_wizard()
