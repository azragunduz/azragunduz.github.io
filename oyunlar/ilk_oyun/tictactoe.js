let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn")
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn0=true;
let count=0;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];
boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        console.log("box was clicked!");
        if(turn0){
            box.innerText="O";
            
            turn0=false;

        } else {
            box.innerText="X";
            turn0=true;
        }
        box.disabled = true;
        count++;
        let isWinner=checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
msg.innerText="game was draw!"
msgContainer.classList.remove("hide");
disableBtns();
}


const resetGame=()=>{
    turn0=true;
    enableBtns();
    msgContainer.classList.add("hide");
    count=0;

}

const disableBtns= ()=>{
    for(let box of boxes){
        box.disabled=true;

    }
};

const enableBtns= ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner=(winner)=>{
    msg.innerText=`Congratulations,winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
}

const checkWinner= ()=>{
    for(let patterns of winPatterns){
        let pos1Val=boxes[patterns[0]].innerText;
        let pos2Val=boxes[patterns[1]].innerText;
        let pos3Val=boxes[patterns[2]].innerText;
        if (pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("Winner",pos1Val)
                showWinner(pos1Val);
            }
        }
        
    }
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);