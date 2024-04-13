import 'src/game/index'

var engine = new Engine("game/index.pck");
    engine.startGame();
    if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer