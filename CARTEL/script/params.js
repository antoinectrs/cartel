let PARAMS = {
    state:{
        intro:true,
        variableFont:40,
        oneUser: false,
        stateMachine:0,
    },
    posnet: {
        positionHead: null,
        poses: [],
        model: false,
    },
    fontFam: null,
    font: {
        bodyBox:41,
        spacing: 50,
    },
    // word: [
    //     "a",
    //     "n",
    //     "t",
    //     "o",
    //     "i",
    //     "n",
    //     "e",
    //     "h",
    //     "i",
    //     "j",
    //     "k",
    //     "l",
    //     "m",
    //     "n",
    //     "o",
    //     "p",
    //     "q",
    //     "r",
    //     "s",
    //     "t",
    //     "u",
    //     "v",
    //     "w",
    //     "x",
    //     "y",
    //     "z"
    //     // "0123"
    // ],
    word: [
        "F",
        "r",
        "a",
        "n",
        "t",
        "i",
        "č",
        "e",
        "k",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
        // "0123"
    ],
    headType:"0",
    physics: {
        gravityForce:1,
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
    positionWord:{
         p0:{
           //x y target check setDimensionParams
          LastPosition:[],
         },
         ease:0,
    }
}

function  setDimensionParams (myWidth, myHeight) {
    PARAMS.positionWord.p0.x = myWidth/2;
    PARAMS.positionWord.p0.y = myHeight/2;
 }