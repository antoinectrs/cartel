let PARAMS = {
    state: {
        intro: true,
        variableFont: 40,
        oneUser: false,
        stateMachine: 0,
    },
    posnet: {
        positionHead: null,
        poses: [],
        model: false,
    },
    fontFam: null,
    font: {
        bodyBox: 25,
        spacing: 0,
    },
    word: [
        "une fleur aux soleil",
        //   "une fleur voulait atteindre le soleil se haussait sur sa tige j'irai dans le soleil se répétait la fleur jusqu'au jour où le vent lui fit perdre la tête"
        //   "une fleur voulait atteindre le soleil se haussait sur sa tige au détriment de sa corolle de ses feuilles et de son teint j'irai dans le soleil se répétait la fleur jusqu'au jour où le vent lui fit perdre la tête"
    ],
    textChain: [],
    wordInterval: [0],
    separateWords: null,
    wordRetriger: [],
    headType: "0",
    physics: {
        bodyDeph: 50,
        gravityForce: 1,
        //     bounds: null,
        //     engine: null,
        //     world: null,
        //     ground: null,
        //     ground2: null,
        //     letterTemplates: {},
        //     bodies:[],
        //     bodiesMaxLength:100,
        //     myWidth:null,
        //     myHeight:null,
        //     grav:null,
        //     theta:null,
        //     fps:30,
    },
    positionWord: {
        init: false,
        constraint: null,
        DynamicLenght: [],
        distCalcul: [],
        p0: {
            //x y target check setDimensionParams
            LastPosition: [],
        },
        ease: 0,
    },
    poeme: [
        ["Si les poètes étaient moins bêtes"],
        ["Et s'ils étaient moins paresseux"],
        ["Ils rendraient tout le monde heureux"],

        ["Pour pouvoir s'occuper en paix"],
        ["De leurs souffrances littéraires"],
        ["Ils construiraient des maisons jaunes"],
        ["Avec des grands jardins devant"],
        ["Et des arbres pleins de zoizeaux"],

        ["Il y aurait de grands jets d'eau"],
        ["Avec des lumières dedans"],
        ["Il y aurait de l'air tout neuf"],
        ["Parfumé de l'odeur des feuilles"],
        ["On mangerait quand on voudrait"],
        ["Et l'on travaillerait sans hâte"],
    ]

}

function setDimensionParams(myWidth, myHeight) {
    PARAMS.positionWord.p0.x = myWidth / 2;
    PARAMS.positionWord.p0.y = myHeight / 2;
}