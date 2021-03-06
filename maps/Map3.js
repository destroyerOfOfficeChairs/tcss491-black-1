var Map3 = {
    Grass1: [],

    StonePath: [],

    Wall: [],

    Water: [],

    Rock: [
        // 4th quadrant
        {x:265, y:935}, {x:252, y:857}, {x:190, y:914}, {x:639, y:1318}, {x:544, y:1405}, {x:262, y:1314}, {x:473, y:1012},
        {x:686, y:848},

    //3rd quadrant
    {x:933, y:1085}, {x:1346, y:1083},

    //2nd quadrant
    {x:850, y:685}, {x:1406, y:606}, {x:1406, y:688},

    {x:1240, y:180}, {x:1340, y:180},
    // {x:1290, y:230}, {x:1390, y:230},
    {x:1240, y:280}, {x:1340, y:280},

    //first quadrant
    {x:282, y:180}, {x:478, y:183}, {x:689, y:224}, {x:530, y:330}, {x:314, y:303}, {x:181, y:454}, {x:434, y:541}, {x:629, y:499},
    {x:517, y:686}, {x:278, y:613}, {x:378, y:390}, {x:471, y:427}, {x:457, y:630}, {x:630, y:668}, {x:662, y:612}, {x:622, y:354},
    {x:606, y:135}, {x:401, y:239}, {x:202, y:150}, {x:130, y:295}, {x:248, y:376}, {x:320, y:490}, {x:180, y:544}, {x:130, y:630}

    ],

    Tree: [{x:130, y:1042}, {x:568, y:954}, {x:536, y:1192}, {x:333, y:1176}, {x:297, y:1017}, {x:222, y:1195}, {x:418, y:1369},
        {x:453, y:1045}, {x:489, y:849}],

    Bush: [{x:605, y:1163}, {x:368, y:1306}, {x:166, y:1212}, {x:228, y:1012}, {x:437, y:936}, {x:672, y:1246}, {x:481, y:1217}],

    Key: [{x:892, y:1180}],

    Lock: [{x:405, y:790}, {x:765, y:1110}, {x:1125, y:750}, {x:765, y:395},
    {x:1093, y:263}],

    Box: [
    //4th quadrant
    {x:137, y:1321, item:"key"}, {x:243, y:1131, item:"coin"}, {x:610, y:1065, item:"potion"}, {x:615, y:1401, item:"coin"}, 
    {x:655, y:1401, item:"coin"}, {x:583, y:856, item:"key"},

    //3rd quadrant
    {x:1397, y:860, item:"coin"}, {x:860, y:860, item:"coin"}, {x:859, y:976, item:"potion"}, {x:1397, y:976, item:"coin"}, {x:863, y:1394, item:"coin"},
    {x:1396, y:1394, item:"crystal"}, {x:863, y:1279}, {x:1400, y:1284, item:"coin"}, {x:849, y:1086, item:"coin"}, {x:1408, y:1084},
    
    //2nd quadrant
    {x:850, y:608, item:"key"}, {x:1393, y:139}, {x:166, y:139, item:"potion"}, {x:1399, y:442},

    //1st quadrant
    {x:130, y:130, item:"coin"}, {x:338, y:227}, {x:496, y:131, item:"key"}, {x:646, y:159, item:"coin"}, {x:571, y:265}, {x:421, y:307, item:"potion"}, {x:213, y:357},
    {x:508, y:450, item: "coin"}, {x:616, y:590}, {x:367, y:602, item:"potion"}, {x:202, y:620}, {x:146, y:239, item:"coin"}, {x:530, y:540}, {x:238, y:538}, {x:274, y:480},
    {x:521, y:623, item:"coin"}, {x:654, y:444, item:"potion"}, {x:386, y:143}, {x:317, y:685}, {x:140, y:680}

    ],
    
    Coin: [
        //4th quandrant
        {x:245, y:910}, {x:353, y:924}, {x:474, y:951}, {x:647, y:982}, {x:626, y:895}, {x:637, y:1193}, {x:342, y:1380},
        {x:293, y:1193}, {x:357, y:1113}, {x:147, y:993}, {x:147, y:876}, {x:369, y:1042}, {x:535, y:1064},

        //3rd quadrant
        {x:1253, y:868}, {x:1063, y:913}, {x:937, y:982}, {x:1091, y:982}, {x:1314, y:982}, {x:1190, y:1036}, {x:1192, y:1277},
        {x:936, y:1345},

        //2nd quadrant
        {x:950, y:230}, {x:1000, y:230}, {x:1050, y:230}, 
        {x:950, y:280}, {x:1050, y:280}, 
        {x:950, y:330}, {x:1000, y:330}, {x:1050, y:330},

        {x:867, y:324}, {x:867, y:225}, {x:867, y:145}, {x:949, y:148}, {x:1050, y:148},

        {x:1300, y:192}, {x:1300, y:239}, {x:1300, y:290}, {x:1250, y:239}, {x:1349, y:239},

        //1st quadrant
        {x:269, y:260}, {x:378, y:347}, {x:141, y:505}, {x:213, y:685}, {x:399, y:652}, {x:598, y:639}, {x:687, y:527},
        {x:585, y:412}, {x:627, y:231}, {x:315, y:140}, {x:409, y:477}, {x:290, y:541}
    ],

    Crystal: [{x:1000, y:280}],

    Portal: [{x:760, y:755}]
}