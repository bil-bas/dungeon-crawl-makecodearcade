scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth) && Keys >= 1) {
        tiles.setTileAt(location, sprites.dungeon.doorOpenNorth)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        tiles.setWallAt(location, false)
        Keys += -1
    }
})
function render_walls () {
    for (let column = 0; column <= 17; column++) {
        for (let row = 0; row <= 17; row++) {
            if (tiles.tileAtLocationIsWall(tiles.getTileLocation(column, row))) {
                tiles.setTileAt(tiles.getTileLocation(column, row), sprites.builtin.brick)
            } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), assets.tile`Stairs down`)) {
                tiles.placeOnTile(Wizard, tiles.getTileLocation(column, row))
            } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), sprites.dungeon.doorClosedNorth)) {
                tiles.setWallAt(tiles.getTileLocation(column, row), true)
            } else {
                tiles.setTileAt(tiles.getTileLocation(column, row), assets.tile`transparency16`)
            }
        }
    }
}
function create_wizard () {
    wiz = sprites.create(assets.image`Wiz`, SpriteKind.Player)
    controller.moveSprite(wiz, 60, 60)
    info.setLife(3)
    info.setScore(0)
    Keys = 0
    Magic = 0
    scene.cameraFollowSprite(wiz)
    return wiz
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    info.changeScoreBy(10)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    Magic += 1
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    game.gameOver(true)
})
let Magic = 0
let wiz: Sprite = null
let Keys = 0
let Wizard: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Wizard = create_wizard()
render_walls()
