// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1200120000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000010000000000000000090000000000000000000000000000000000000000070000000000000000080000000000000000000000000000000000000000000000000000000000000006000000070000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000004000000000000000000000000000000000000000007000000060000000000000000000005000000000000000000080000000000000000000000000000000000000000070000000000030000000000000001000000000000000000000000000000000400000000000000020000000000000000000000000000000003050a01040b0c06070d0e00000000000000`, img`
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
2.2..22.2.2...2..2
2....22.2.2...22.2
2.22.22.2.2...22.2
2.22.22.222.2222.2
2................2
222222222222222222
`, [myTiles.transparency16,sprites.dungeon.chestClosed,myTiles.tile1,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.doorClosedNorth,sprites.dungeon.collectibleRedCrystal,tileUtil.object4,tileUtil.object6,tileUtil.object0,sprites.dungeon.hazardHole,sprites.dungeon.chestOpen,sprites.dungeon.doorOpenNorth,sprites.builtin.brick,tileUtil.object12,tileUtil.object14], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Stairs down":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
