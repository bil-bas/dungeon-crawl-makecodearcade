// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`12001200101112131415151617000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000100000000000000000900000000000000000000000000000000000000000700000000000000000800000000000000000000000000000000000000000000000000000000000000060000000700000000000000000000000000000000000000000000000000000000000000000018000000000000000000000000040000000000000000000000000000000000000000070000000600000000000000000000190000000000000000001800000000000000000000000000000000000000000700000000001a000000000000000100000000000000000000000000000000040000000000000002000000000000000f000000000000180003050a01040b0c06070d0e00000000000000`, img`
222222222222222222
22.......22......2
22.222...2...2.2.2
22..22...2...2.2.2
222.22...2...2.222
2....22222...2.222
2....222222222...2
2....2.....222.2.2
2222...2.2.....2.2
222222.....22222.2
2......2.2.......2
2.2222.....2222.22
2.2..22.2.22..2..2
2....22.2.2...22.2
2.22.22.2.2...22.2
2.22.22.222.2222.2
2................2
222222222222222222
`, [myTiles.transparency16,sprites.dungeon.chestClosed,myTiles.tile1,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.doorClosedNorth,sprites.dungeon.collectibleRedCrystal,tileUtil.object4,tileUtil.object6,tileUtil.object0,sprites.dungeon.hazardHole,sprites.dungeon.chestOpen,sprites.dungeon.doorOpenNorth,sprites.builtin.brick,tileUtil.object12,tileUtil.object14,sprites.dungeon.stairLadder,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterEast0,myTiles.tile2,myTiles.tile3,myTiles.tile5], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Stairs down":
            case "tile1":return tile1;
            case "myTile":
            case "tile2":return tile2;
            case "myTile0":
            case "tile3":return tile3;
            case "myTile2":
            case "tile5":return tile5;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
