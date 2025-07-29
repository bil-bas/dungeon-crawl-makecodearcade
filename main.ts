namespace SpriteKind {
    export const BossSnail = SpriteKind.create()
    export const Ghost = SpriteKind.create()
    export const Bat = SpriteKind.create()
    export const Monkey = SpriteKind.create()
}

scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossSnail, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    game.setGameOverMessage(false, "Slimed by the boss snail!")
    info.changeLifeBy(-10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bat, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    game.setGameOverMessage(false, "Sucked dry by a vampire bat!")
    info.changeLifeBy(-1)
    change_floater(img`
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
            `, -1)
})
scene.onHitWall(SpriteKind.Player, function on_hit_wall(sprite: Sprite, location: tiles.Location) {
    
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth) && Keys >= 1) {
        Keys += -1
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        tiles.setWallAt(location, false)
        update_labels()
    } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.chestClosed) && Keys >= 1) {
        Keys += -1
        tiles.setTileAt(location, sprites.dungeon.chestOpen)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        coins += 10
        update_labels()
    }
    
})
function render_walls() {
    tileUtil.forEachTileInMap(tileUtil.currentTilemap(), function on_for_each_tile_in_map(column: number, row: number, location: tiles.Location) {
        if (tiles.tileAtLocationIsWall(location)) {
            tiles.setTileAt(location, sprites.builtin.brick)
        } else if (tiles.tileAtLocationEquals(location, assets.tile`Stairs down`)) {
            tiles.placeOnTile(Wizard, location)
            tiles.setTileAt(location, assets.tile`transparency16`)
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object4)) {
            create_bat(location)
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object6)) {
            create_ghost(location)
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object12)) {
            create_monkey(location)
        } else if (tiles.tileAtLocationEquals(location, tileUtil.object14)) {
            create_boss(location)
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.chestClosed) || tiles.tileAtLocationEquals(location, sprites.dungeon.doorClosedNorth) || tiles.tileAtLocationEquals(location, sprites.dungeon.stairLadder)) {
            tiles.setWallAt(location, true)
        }
        
    })
}

scene.onHitWall(SpriteKind.BossSnail, function on_hit_wall2(sprite: Sprite, location: tiles.Location) {
    if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
        sprite.setVelocity(-30, 0)
    } else if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
        sprite.setVelocity(30, 0)
    } else if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
        sprite.setVelocity(0, 30)
    } else if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
        sprite.setVelocity(0, -30)
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ghost, function on_on_overlap3(sprite: Sprite, otherSprite: Sprite) {
    
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    if (Magic) {
        Magic -= 1
        change_floater(img`
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
                `, -1)
        update_labels()
    } else {
        game.setGameOverMessage(false, "Soul drained by a ghost!")
        info.changeLifeBy(-1)
        change_floater(img`
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
                `, -1)
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (Magic >= 3 && !falling) {
        Starfire()
        Magic -= 3
        update_labels()
        timer.after(200, function on_after() {
            Starfire()
            timer.after(200, function on_after2() {
                Starfire()
            })
        })
    }
    
})
function create_wizard(): Sprite {
    let wiz = sprites.create(assets.image`
        Wiz
        `, SpriteKind.Player)
    info.setLife(3)
    scene.cameraFollowSprite(wiz)
    characterAnimations.loopFrames(wiz, [img`
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
        `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingUp))
    characterAnimations.loopFrames(wiz, [img`
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
            `], 200, characterAnimations.rule(Predicate.FacingUp))
    characterAnimations.loopFrames(wiz, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingDown))
    characterAnimations.loopFrames(wiz, [img`
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
            `], 200, characterAnimations.rule(Predicate.FacingDown))
    characterAnimations.loopFrames(wiz, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingLeft))
    characterAnimations.loopFrames(wiz, [img`
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
            `], 200, characterAnimations.rule(Predicate.FacingLeft))
    characterAnimations.loopFrames(wiz, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingRight))
    characterAnimations.loopFrames(wiz, [img`
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
            `], 200, characterAnimations.rule(Predicate.FacingRight))
    return wiz
}

function change_floater(icon: Image, change: number) {
    let textSprite = textsprite.create((change > 0 ? "+" : "") + ("" + change))
    textSprite.setMaxFontHeight(5)
    textSprite.setIcon(icon)
    textSprite.z = 99
    textSprite.setPosition(Wizard.x, Wizard.y)
    timer.after(500, function on_after3() {
        sprites.destroy(textSprite, effects.disintegrate, 500)
    })
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Monkey, function on_on_overlap4(sprite7: Sprite, otherSprite4: Sprite) {
    
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite4)
    if (Keys) {
        Keys -= 1
        change_floater(img`
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
                `, -1)
        update_labels()
    } else {
        game.setGameOverMessage(false, "Eyes gouged by evil monkey!")
        info.changeLifeBy(-1)
        change_floater(img`
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
                `, -1)
    }
    
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function on_overlap_tile2(sprite: Sprite, location: tiles.Location) {
    
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    Keys += 1
    update_labels()
})
function create_label(Icon: Image, Y: number): TextSprite {
    let label = textsprite.create("x0", 0, 1)
    label.setIcon(Icon)
    label.setOutline(1, 6)
    label.setFlag(SpriteFlag.RelativeToCamera, true)
    label.top = 0
    label.left = Y
    return label
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let projectile: Sprite;
    
    if (Magic && !falling) {
        if (characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))) {
            projectile = sprites.createProjectileFromSprite(img`
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
                    `, Wizard, 100, 0)
        } else if (characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))) {
            projectile = sprites.createProjectileFromSprite(img`
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
                    `, Wizard, -100, 0)
        } else if (characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingUp))) {
            projectile = sprites.createProjectileFromSprite(img`
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
                    `, Wizard, 0, -100)
        } else if (characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(Wizard, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingDown))) {
            projectile = sprites.createProjectileFromSprite(img`
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
                    `, Wizard, 0, 100)
        }
        
        projectile.startEffect(effects.trail)
        Magic -= 1
        update_labels()
    }
    
})
function create_ghost(tile: tiles.Location) {
    tiles.setTileAt(tile, assets.tile`transparency16`)
    let mySprite = sprites.create(img`
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
            `, SpriteKind.Ghost)
    tiles.placeOnTile(mySprite, tile)
    mySprite.vy = 40
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingUp))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingDown))
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Ghost, function on_on_overlap5(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Bat, function on_on_overlap6(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
})
function create_boss(tile: tiles.Location) {
    tiles.setTileAt(tile, assets.tile`transparency16`)
    let mySprite = sprites.create(img`
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
            `, SpriteKind.BossSnail)
    tiles.placeOnTile(mySprite, tile)
    mySprite.vy = 30
    mySprite.setScale(2, ScaleAnchor.Middle)
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingUp))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingDown))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingLeft))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingRight))
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BossSnail, function on_on_overlap7(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(sprite)
})
function Starfire() {
    let projectile = sprites.createProjectileFromSprite(img`
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
    `, Wizard, 100, 0)
    projectile.startEffect(effects.trail)
    projectile = sprites.createProjectileFromSprite(img`
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
            `, Wizard, -100, 0)
    projectile.startEffect(effects.trail)
    projectile = sprites.createProjectileFromSprite(img`
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
            `, Wizard, 0, -100)
    projectile.startEffect(effects.trail)
    projectile = sprites.createProjectileFromSprite(img`
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
            `, Wizard, 0, 100)
    projectile.startEffect(effects.trail)
}

function update_labels() {
    magic_label.setText("x" + ("" + Magic))
    key_label.setText("x" + ("" + Keys))
    coin_label.setText("x" + ("" + coins))
}

function advance_level() {
    
    current_level += 1
    Wizard.setScale(1, ScaleAnchor.Middle)
    controller.moveSprite(Wizard, 60, 60)
    tiles.setCurrentTilemap(levels[current_level])
    render_walls()
}

function create_bat(tile: tiles.Location) {
    tiles.setTileAt(tile, assets.tile`transparency16`)
    let mySprite = sprites.create(img`
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
            `, SpriteKind.Bat)
    tiles.placeOnTile(mySprite, tile)
    mySprite.vx = 40
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingLeft))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingRight))
}

scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function on_overlap_tile3(sprite: Sprite, location: tiles.Location) {
    
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    Magic += 1
    update_labels()
})
info.onLifeZero(function on_life_zero() {
    info.setScore(coins)
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardHole, function on_overlap_tile4(sprite: Sprite, location: tiles.Location) {
    
    if (!falling) {
        falling = true
        controller.moveSprite(sprite, 0, 0)
        tiles.placeOnTile(sprite, location)
        timer.after(250, function on_after4() {
            music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
            sprite.setScale(0.75, ScaleAnchor.Middle)
            timer.after(500, function on_after5() {
                sprite.setScale(0.5, ScaleAnchor.Middle)
                timer.after(500, function on_after6() {
                    
                    advance_level()
                    falling = false
                })
            })
        })
    }
    
})
function create_monkey(tile: tiles.Location) {
    tiles.setTileAt(tile, assets.tile`transparency16`)
    let mySprite = sprites.create(img`
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
            `, SpriteKind.Monkey)
    tiles.placeOnTile(mySprite, tile)
    mySprite.vy = 40
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingUp))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingDown))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingRight))
    characterAnimations.loopFrames(mySprite, [img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `, img`
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
                `], 200, characterAnimations.rule(Predicate.MovingLeft))
}

scene.onHitWall(SpriteKind.Projectile, function on_hit_wall3(sprite: Sprite, location: tiles.Location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.stairLadder)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        tiles.setWallAt(location, false)
    }
    
})
function init_inventory() {
    
    key_label = create_label(img`
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
            `, 85)
    key_label.z += 100
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
            `, 55)
    magic_label.z += 100
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
            `, 115)
    coin_label.z += 100
    update_labels()
}

let coin_label : TextSprite = null
let key_label : TextSprite = null
let magic_label : TextSprite = null
let Magic = 3
let coins = 0
let Keys = 0
let Wizard : Sprite = null
let falling = false
let current_level = -1
let levels = [tilemap`level_0`, tilemap`level_1`, tilemap`level_2`]
game.setGameOverScoringType(game.ScoringType.HighScore)
init_inventory()
Wizard = create_wizard()
advance_level()
