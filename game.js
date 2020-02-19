

function Tabuleiro(id){
    this.player = id;
    this.board = document.createElement('div');
    this.logicalBoard = [
        '','','',
        '','','',
        '','',''
    ];
    this.emptySpaces = this.logicalBoard.length;

    this.init = function (){
        
        this.board.setAttribute('id', 'board');
       
        
        for(let i = 0; i < 9; i++){
            let self = this;
            let cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.setAttribute('class', 'board-space');
            cell.innerHTML="  ";
            cell.onclick = function(){

              if(this.innerHTML !== "X" && this.innerHTML !== "O"){
                  console.log('tabuleiro ',self.logicalBoard);
                  
                  let index = this.getAttribute('id');
                  self.logicalBoard[index] = self.player;
                  self.emptySpaces--;
                  self.update();
              }
              
            }
            this.board.appendChild(cell);
            
        }
        this.board.appendBefore(document.getElementById("main"));
    }

    this.update = function(){
        for(let i = 0 ; i < 9; i++ ){            
            this.board.childNodes[i].innerHTML = this.logicalBoard[i];
        }
    }

    this.checkWin = function(){
        let spaces = this.board.childNodes;
        let winner = null;
        for(let i =0; i < 7; i = i + 3){
            if( this.equals3(  
                this.logicalBoard[i], 
                this.logicalBoard[i+1],
                this.logicalBoard[i+2])){
                
                winner = this.logicalBoard[i];
            }
        }

        for(let i =0; i < 3; i++){
            if( this.equals3(  
                this.logicalBoard[i], 
                this.logicalBoard[i+3],
                this.logicalBoard[i+6])){
                
                winner = this.logicalBoard[i];
            }
        }

        if(this.equals3(
            this.logicalBoard[0],
            this.logicalBoard[4],
            this.logicalBoard[8]
        ))
        winner = this.logicalBoard[0];        
        if(this.equals3(
            this.logicalBoard[2],
            this.logicalBoard[4],
            this.logicalBoard[6]
        ))
        winner = this.logicalBoard[2];


        if(winner !==null && winner === this.player){
            alert("você ganhou!");
            this.logicalBoard = [
                '','','',
                '','','',
                '','',''
            ];
            this.update();
        }else if(winner !== null){
            alert("você perdeu");
            this.logicalBoard = [
                '','','',
                '','','',
                '','',''
            ];
            this.update();
        }
        if(emptySpaces == 0 && winner === null){
            alert("Deu velha");this.logicalBoard = [
                '','','',
                '','','',
                '','',''
            ];
            this.update();
        }

    }

    this.equals3 = function(a, b, c){
        return a == b && b == c && a != '';
    }

    Element.prototype.appendBefore = function( element ) {
        element.parentNode.insertBefore(this, element);
    }, false;

}