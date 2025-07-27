// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1200120000000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000010000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000b0000000b0000000000000000000007000000000000000000000000000000000000000000000a000000000000000000000000090000000000000000000000000000000000000000000000000000000000000000000000000600000000000000010000000000000000000000000000000000000000000000000500000000000000000000000000000000030004060007080900000000000000000000`, img`
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
2.2..22.2.222....2
2....22.2.2...22.2
2.22.22.2.2...22.2
2.22.22.222.2222.2
2................2
222222222222222222
`, [myTiles.transparency16,sprites.dungeon.chestClosed,sprites.dungeon.stairLarge,sprites.builtin.brick,sprites.dungeon.chestOpen,myTiles.tile1,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.doorClosedNorth,sprites.dungeon.doorOpenNorth,sprites.dungeon.collectibleRedCrystal,tileUtil.object4,tileUtil.object6], TileScale.Sixteen);
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
