let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnRabbit = true; // true = Tavşan (🐰), false = Kaplumbağa (🐢)
let count = 0;

const RABBIT = "🐰";
const TURTLE = "🐢";

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if (turnRabbit) {
            box.innerText = RABBIT;
            turnRabbit = false;
        } else {
            box.innerText = TURTLE;
            turnRabbit = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Berabere! 🤝";
    msgContainer.classList.remove("hide");
    disableBtns();
};

const resetGame = () => {
    turnRabbit = true;
    enableBtns();
    msgContainer.classList.add("hide");
    count = 0;
};

const disableBtns = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBtns = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if (winner === RABBIT) {
        msg.innerText = "🐰 Tebrikler! Kazanan: Tavşan!";
    } else {
        msg.innerText = "🐢 Tebrikler! Kazanan: Kaplumbağa!";
    }

    msgContainer.classList.remove("hide");
    disableBtns();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
