let servidor = new Peer("servidorvelha");
let peer = null;
let player = 0;
let vezDeQuem = true; // se true jogador da bolinha
let servConn = null;
let game = null;

function startGame(id){
    game = new Tabuleiro(id);

    game.init();

    document.addEventListener('click', function(){
        let board = document.getElementById('board');
        setTimeout(function(){
            
            servConn.send({ 
                turn: game.turn, 
                board: game.logicalBoard
            });

            game.checkWin();
        },2);
    });
}
servidor.on('open', function(id){
    console.log("server connectado");
    startGame("X");
    servidor.on('connection', function(conn){
        servConn = conn;
        conn.on('open', function(data){
           console.log(servidor.connections);
            
        });
        conn.on('error', function(err){
            console.log(err.type);
            
        });
        conn.on('data', function(data){
            update(data);
        });
    });
});



servidor.on('error', function(error){
    if(error.type === "unavailable-id"){
        console.log("inicia o player");
        let peer = new Peer();
        player = "X";    
        startGame("O");
        peer.on('open', function(id){
            console.log("player " + id);
            servConn = peer.connect('servidorvelha');

            servConn.on('open', function(data){
                console.log("connectado com sucesso");
                
                
            })

            servConn.on('data', function(data){
                update(data);
            });
        });
    }
});


function update( data ){
    console.log(data);
    
    game.turn = data.turn;
    game.logicalBoard = data.board;
    game.update();
    game.checkWin();
}