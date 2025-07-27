// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`120012000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000006000000000000000000000000000000000304050708090a0b00000000000000000000`, img`
222222222222222222
22.......22......2
22.222...2...2.2.2
22..22...2...2.2.2
222.22...2...2.222
2....22222...2.222
2....222222222...2
2..........222.2.2
222222.2.2.....2.2
2..........22222.2
2.2222.2.2.......2
2.2.22.....2222.22
2.2..22.2.222....2
2....22.2.2...22.2
2.22.22.2.2...22.2
2.22.22.222.2222.2
2................2
222222222222222222
`, [myTiles.transparency16,sprites.dungeon.chestClosed,sprites.dungeon.stairLarge,sprites.builtin.brick,sprites.dungeon.floorLight0,sprites.dungeon.chestOpen,myTiles.tile1,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.floorLight2,sprites.dungeon.doorClosedNorth,sprites.dungeon.doorOpenNorth,sprites.dungeon.collectibleRedCrystal], TileScale.Sixteen);
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
