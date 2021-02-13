/**
 * Typing large quantities of JSON to fill a big rectangle of tiles takes a long time,
 * so it should be done here.
 */
function buildMapData() {
    buildDebugMap();
    buildStartMap();
    buildMap2();
};

function buildDebugMap() {
    width = 16;
    height = 16;
    index = 0;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            debugMap.Grass1[index] = {x:j*32,y:i*32};
            index = index + 1;
        }
    }
}

function buildStartMap() {
    width = 32;
    height = 32;
    index = 0;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            startMap.CastleFloor1[index] = {x:j*64,y:i*64};
            index = index + 1;
        }
    }
    var walls = startMap.CastleWall1Mid.length;
    for (var i = walls; i < walls+16; i++) {
        startMap.CastleWall1Mid[i] = {x:1079+i*32,y:1700};
    }
    walls = startMap.CastleWall1RightEdge.length;
    for (var i = walls; i < walls+16; i++) {
        startMap.CastleWall1RightEdge[i] = {x:1607,y:1684-i*16};
    }
}

function buildMap2() {
    mapWidth = 75;
    mapHeight = 75;
    borderThickness = 4;
    index = 0;

    //walls
    for (var i = 0; i < mapWidth; i++) {
        for (var j = 0; j < mapHeight; j++) {
            Map2.Grass1[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }

    //borders of the map
    index = 0;
    northBorderWidth = mapWidth;
    northBorderHeight = borderThickness;
    for (var i = 0; i < northBorderWidth; i++) {
        for (var j = 0; j < northBorderHeight; j++) {
            Map2.Wall[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }
    westBorderWidth = borderThickness;
    westBorderHeight = mapHeight;
    for (var i = 0; i < westBorderWidth; i++) {
        for (var j = northBorderHeight; j < westBorderHeight; j++) {
            Map2.Wall[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }
    eastBorderWidth = borderThickness;
    eastBorderHeight = mapHeight;
    for (var i = northBorderWidth - eastBorderWidth; i < northBorderWidth; i++) {
        for (var j = northBorderHeight; j < eastBorderHeight; j++) {
            Map2.Wall[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }
    southBorderWidth = mapWidth;
    southBorderHeight = borderThickness;
    for (var i = westBorderWidth; i < northBorderWidth - eastBorderWidth; i++) {
        for (var j = westBorderHeight - southBorderHeight; j < westBorderHeight; j++) {
            Map2.Wall[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }

    // northern chamber
    for (var i = 0; i < 4; i++) {
        Map2.Wall[index] = {x: 1600, y:135 + i * 310/8};
        index++;
    }
    for (var i = 1; i < 5; i++) {
        Map2.Wall[index] = {x: 1600 + i * 310/8, y:135 + 3 * 310/8};
        index++;
    }
    for (var i = 0; i < 4; i++) {
        Map2.Wall[index] = {x: 1835 + i * 310/8, y:135 + 3 * 310/8};
        index++;
    }
    for (var i = 0; i < 3; i++) {
        Map2.Wall[index] = {x: 1835 + 3 * 310/8, y:135 + i * 310/8};
        index++;
    }

    //western hallways
    startingWallX = 135;
    startingWallY = 1665;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 4; j++) {
            Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY + j * 2 * 310/8};
            index++;
        }
    }

    //center shrine
    startingWallX = 1125;
    startingWallY = 860;
    Map2.Wall[index] = {x: startingWallX, y: startingWallY};
    index++;
    Map2.Wall[index] = {x: startingWallX + 300 - 310/8, y: startingWallY};
    index++;
    Map2.Wall[index] = {x: startingWallX, y: startingWallY + 300 - 310/8};
    index++;
    Map2.Wall[index] = {x: startingWallX + 300 - 310/8, y: startingWallY + 300 - 310/8};
    index++;

    //southeast spiral
    startingWallX = 2239 - 15 * 310 / 8;
    startingWallY = 2239 - 17 * 310 / 8;
    for (var i = 0; i < 14; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }
    startingWallX = 2239 - 12 * 310 / 8;
    startingWallY = 2239 - 14 * 310 / 8;
    for (var i = 0; i < 15; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }
    startingWallX = 2239 - 9 * 310 / 8;
    startingWallY = 2239 - 11 * 310 / 8;
    for (var i = 0; i < 7; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }

    startingWallX = 2239 - 14 * 310 / 8;;
    startingWallY = 2239 - 2 * 310 / 8;;
    for (var i = 0; i < 12; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }
    startingWallX = 2239 - 11 * 310/8;
    startingWallY = 2239 - 5 * 310 / 8;
    for (var i = 0; i < 7; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }
    startingWallX = 2239 - 8 * 310 / 8;
    startingWallY = 2239 - 8 * 310 / 8;
    for (var i = 0; i < 4; i++) {
        Map2.Wall[index] = {x: startingWallX + i * 310/8, y: startingWallY};
        index++;
    }

    startingWallX = 2239 - 15 * 310 / 8;
    startingWallY = 2239 - 16 * 310 / 8;
    for (var i = 0; i < 15; i++) {
        Map2.Wall[index] = {x: startingWallX, y: startingWallY + i * 310/8};
        index++;
    }
    startingWallX = 2239 - 12 * 310 / 8;
    startingWallY = 2239 - 13 * 310 / 8;
    for (var i = 0; i < 9; i++) {
        Map2.Wall[index] = {x: startingWallX, y: startingWallY + i * 310/8};
        index++;
    }
    startingWallX = 2239 - 9 * 310/8;
    startingWallY = 2239 - 10 * 310 / 8;
    for (var i = 0; i < 3; i++) {
        Map2.Wall[index] = {x: startingWallX, y: startingWallY + i * 310/8};
        index++;
    }
    startingWallX = 2239 - 2 * 310 / 8;
    startingWallY = 2239 - 11 * 310 / 8;
    for (var i = 0; i < 10; i++) {
        Map2.Wall[index] = {x: startingWallX, y: startingWallY + i * 310/8};
        index++;
    }
    startingWallX = 2239 - 5 * 310 / 8;
    startingWallY = 2239 - 8 * 310 / 8;
    for (var i = 0; i < 3; i++) {
        Map2.Wall[index] = {x: startingWallX, y: startingWallY + i * 310/8};
        index++;
    }

    // water
    index = 0;

    // northwest lake
    startingWaterX = 375;
    startingWaterY = 500;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 8; j++) {
            Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
            index++;
        }
    }

    // eastern pond
    startingWaterX = 1853;
    startingWaterY = 1008;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
            index++;
        }
    }

    // central lake
    startingWaterX = 1100;
    startingWaterY = 1420;
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if ((j != 4 || i <= 1) && (j != 3 || i != 2) && (j != 2 || i != 2)) {
                Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
                index++;
            }
        }
    }

    //western river
    startingWaterX = 135;
    startingWaterY = 1475;
    for (var i = 0; i < 6; i++) {
        Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY};
        index++;
    }
    startingWaterX = 450;
    temp = startingWaterX;
    startingWaterY = 1538;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
            index++;
            startingWaterX += 63;
        }
        startingWaterX = temp;
    }
    startingWaterX = 825;
    startingWaterY = 1728;
    for (var i = 0; i < 5; i++) {
        Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY};
        index++;
    }

    //southwest bank
    startingWaterX = 415;
    startingWaterY = 2146;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 2; j++) {
            Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
            index++;
        }
    }

    // stone path
    index = 0;
    //where hero starts
    // Map2.StonePath[index] = {x:185, y:185};
    // index++;

    // central lake
    startingStonePathX = 1225;
    startingStonePathY = 1545;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            Map2.StonePath[index] = {x: startingStonePathX + i * 60, y: startingStonePathY + j * 60};
            index++;
        }
    }
    startingStonePathX = 1345;
    startingStonePathY = 1670;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
            Map2.StonePath[index] = {x: startingStonePathX + i * 60, y: startingStonePathY + j * 60};
            index++;
        }
    }

    //bridge across river
    Map2.StonePath[index] = {x:765, y:1728};
    index++;

    // central shrine
    startingStonePathX = 1125;
    startingStonePathY = 860;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            Map2.StonePath[index] = {x: startingStonePathX + i * 60, y: startingStonePathY + j * 60};
            index++;
        }
    }

    // main path
    startingStonePathX = 255;
    startingStonePathY = 357;
    for (var i = 0; i < 17; i++) {
        Map2.StonePath[index] = {x: startingStonePathX + i * 60, y: startingStonePathY};
        index++;
    }

    startingStonePathX = 255 + 16 * 60;
    startingStonePathY = 357 + 60;
    for (var i = 0; i < 8; i++) {
        Map2.StonePath[index] = {x: startingStonePathX, y: startingStonePathY + i * 60};
        index++;
    }

    startingStonePathX = 1321;
    startingStonePathY = 1160;
    for (var i = 0; i < 4; i++) {
        Map2.StonePath[index] = {x: startingStonePathX, y: startingStonePathY + i * 60};
        index++;
    }

    startingStonePathX = 1321 + 60;
    startingStonePathY = 1160 + 3 * 60;
    for (var i = 0; i < 14; i++) {
        Map2.StonePath[index] = {x: startingStonePathX + i * 60, y: startingStonePathY};
        index++;
    }

    startingStonePathX = 2208;
    startingStonePathY = 1340;
    for (var i = 0; i < 4; i++) {
        Map2.StonePath[index] = {x: startingStonePathX, y: startingStonePathY + i * 60};
        index++;
    }

}