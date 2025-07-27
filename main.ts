scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth) && Keys >= 1) {
        tiles.setTileAt(location, sprites.dungeon.doorOpenNorth)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        tiles.setWallAt(location, false)
        Keys += -1
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Wizard,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    true
    )
})
function render_walls () {
    tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
        if (tiles.tileAtLocationIsWall(location)) {
            tiles.setTileAt(location, sprites.builtin.brick)
        } else if (tiles.tileAtLocationEquals(location, assets.tile`Stairs down`)) {
            tiles.placeOnTile(Wizard, location)
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth)) {
            tiles.setWallAt(location, true)
        }
    })
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
function create_label (Icon: Image, Y: number) {
    label = textsprite.create("x0", 0, 1)
    label.setOutline(1, 6)
    label.top = Y
    label.left = 0
    label.setIcon(Icon)
    return label
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Wizard)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Wizard,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Wizard)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Wizard)
})
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Wizard,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    true
    )
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Wizard)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Wizard,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    Magic += 1
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    game.gameOver(true)
})
let label: TextSprite = null
let Magic = 0
let wiz: Sprite = null
let Keys = 0
let Wizard: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Wizard = create_wizard()
render_walls()
let coin_label = create_label(img`
    . . b b b b . . 
    . b 5 5 5 5 b . 
    b 5 d 3 3 d 5 b 
    b 5 3 5 5 1 5 b 
    c 5 3 5 5 1 d c 
    c d d 1 1 d d c 
    . f d d d d f . 
    . . f f f f . . 
    `, 160)
let key_label = create_label(img`
    . b b d d b b . 
    b 1 1 3 3 1 1 b 
    b 1 3 5 5 3 1 b 
    b d 3 5 5 3 d b 
    c 1 1 d d 1 1 c 
    c d 1 d d 1 d c 
    . c c 7 6 c c . 
    . . 6 7 6 . . . 
    . . 6 6 8 8 8 6 
    . . 6 8 7 7 7 6 
    . . 8 7 7 7 6 . 
    . . 8 8 8 6 . . 
    `, 175)
let magic_label = create_label(img`
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
    `, 190)
