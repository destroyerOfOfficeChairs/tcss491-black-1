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

    for (var i = 0; i < mapWidth; i++) {
        for (var j = 0; j < mapHeight; j++) {
            Map2.Grass1[index] = {x: i * 32, y: j * 32};
            index++;
        }
    }

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

    index = 0;
    startingWaterX = 375;
    startingWaterY = 500;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 8; j++) {
            Map2.Water[index] = {x: startingWaterX + i * 63, y: startingWaterY + j * 63};
            index++;
        }
    }

}