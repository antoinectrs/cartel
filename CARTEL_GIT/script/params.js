let PARAMS = {
    debugMode: true,
    state: {
        intro: true,
        variableFont: 40,
        oneUser: false,
        stateMachine: 0,
    },
    posnet: {
        headColider:null,
        positionHead: null,
        poses: [],
        model: false,
        hand:{x1:0,y1:0},
        // someone:false,
    },
    fontFam: null,
    font: {
        bodyBox: 15,
        spacing: 0,
    },
    word: [
        // "Carte blanche a celles et ceux qui prennent soin de nous Avec la complicité de l’artiste Frantiček Klossner, des étudiantes et des étudiants en Soins infirmiers donnentlibre cours à leur créativité pour exprimer leurs expériences, émotions, espoirs et préoccupations. Leurs installations artistiques invitent à nous interroger sur les enjeux liés à la santé et aux soins aujourd’hui. Avec beaucoup d’authenticité,ces témoignages esthétiques rendent v",
        "Carte blanche a celles et ceux qui prennent soin de nous Avec la complicité de l’artiste Frantiček Klossner",
        //   "une fleur voulait atteindre le soleil se haussait sur sa tige j'irai dans le soleil se répétait la fleur jusqu'au jour où le vent lui fit perdre la tête"
        //   "une fleur voulait atteindre le soleil se haussait sur sa tige au détriment de sa corolle de ses feuilles et de son teint j'irai dans le soleil se répétait la fleur jusqu'au jour où le vent lui fit perdre la tête"
    ],
    textChain: [],
    pointArc: [],
    wordInterval: [0],
    separateWords: null,
    // wordRetriger: [],
    headType: "0",
    physics: {
        bodyDeph: 50,
        gravityForce: 0.5,
    },
    positionWord: {
        init: false,
        finish:true,
        constraint: null,
        DynamicLenght: [],
        distCalcul: [],
        //x y target check setDimensionParams
        LastPosition: [],

        ease: 0,
    },
    poeme:
        "Carte blanche à celles et ceux qui prennent soin de nous Avec la complicité de l’artiste Frantiček Klossner, des étudiantes et des étudiants en Soins infirmiers donnentlibre cours à leur créativité pour exprimer leurs expériences, émotions, espoirs et préoccupations. Leurs installations artistiques invitent à nous interroger sur les enjeux liés à la santé et aux soins aujourd’hui. Avec beaucoup d’authenticité,ces témoignages esthétiques rendent visible un engagement infirmier essentiel dans le contexte actuel.",
    lexical: {
        etude: [0, 1, 19, , 22, 27, 34, 36, 45, 48, 55, 65],
        sante: [8, 10, 13, 24, 25, 38, 52, 56, 66],
        art: [15, 32, 34, 41, 60, 63, 65],
    }

}

function setDimensionParams(myWidth, myHeight) {
    PARAMS.positionWord.x = myWidth / 2;
    PARAMS.positionWord.y = myHeight / 2;
}