scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth) && Keys >= 1) {
        tiles.setTileAt(location, sprites.dungeon.doorOpenNorth)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        tiles.setWallAt(location, false)
        Keys += -1
    }
})
function render_walls () {
    tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function (column, row, location) {
        if (tiles.tileAtLocationIsWall(location)) {
            tiles.setTileAt(location, sprites.builtin.brick)
        } else if (tiles.tileAtLocationEquals(location, assets.tile`Stairs down`)) {
            tiles.placeOnTile(Wizard, location)
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth)) {
            tiles.setWallAt(location, true)
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object4)) {
            tiles.setTileAt(location, assets.tile`transparency16`)
            mySprite = sprites.create(img`
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
                `, SpriteKind.Enemy)
            tiles.placeOnTile(mySprite, location)
            mySprite.vx = 40
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object6)) {
            tiles.setTileAt(location, assets.tile`transparency16`)
            mySprite = sprites.create(img`
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
                `, SpriteKind.Enemy)
            tiles.placeOnTile(mySprite, location)
            mySprite.vy = 40
        }
    })
}
function create_wizard () {
    wiz = sprites.create(assets.image`Wiz`, SpriteKind.Player)
    controller.moveSprite(wiz, 60, 60)
    info.setLife(3)
    scene.cameraFollowSprite(wiz)
    characterAnimations.loopFrames(
    wiz,
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
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    wiz,
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
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    wiz,
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
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    wiz,
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
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    return wiz
}
function create_label (Icon: Image, Y: number) {
    label = textsprite.create("x0", 0, 1)
    label.setOutline(1, 6)
    label.top = 0
    label.left = Y
    label.setIcon(Icon)
    return label
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    coins += 10
    update_labels()
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.vx = sprite.vx * -1
    sprite.vy = sprite.vy * -1
})
function update_labels () {
    magic_label.setText("x" + Magic)
    key_label.setText("x" + Keys)
    coin_label.setText("x" + coins)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    Magic += 1
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    game.gameOver(true)
})
let label: TextSprite = null
let wiz: Sprite = null
let mySprite: Sprite = null
let coin_label: TextSprite = null
let magic_label: TextSprite = null
let key_label: TextSprite = null
let Keys = 0
let Magic = 0
let coins = 0
let Wizard: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Wizard = create_wizard()
render_walls()
coins = 0
Magic = 2
Keys = 0
key_label = create_label(img`
    . . . . c c c c . . . . 
    . . . c c c c c c . . . 
    . . . c c . . c c . . . 
    . . . c c . . c c . . . 
    . . . c c . . c c . . . 
    . . . c c c c c c . . . 
    . . . . c c c c . . . . 
    . . . . . c c . . . . . 
    . . . . . c c . . . . . 
    . . . . . c c c c . . . 
    . . . . . c c . . . . . 
    . . . . . c c c . . . . 
    `, 160)
magic_label = create_label(img`
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
coin_label = create_label(img`
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
    `, 220)
update_labels()
