/**
 * Typing large quantities of JSON to fill a big rectangle of tiles takes a long time,
 * so it should be done here.
 */
function buildMapData() {
    buildDebugMap();
    buildStartMap();
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
}