let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;//playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            //playerO
            box.innerText = "O";
            turnO = false;
        }else{
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;        //for avoiding double clicking
        count++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const typeWriter = (element, text, speed = 55) => {
    element.innerText = ""; // clear old text
    let i = 0;

    const typing = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === " " ? "&nbsp;" : text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };

    typing();
};


const showWinner = (winner) => {
    typeWriter(msg, `Congratulations!, Winner is ${winner}`, 60);
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawpart = (winner) => {
    typeWriter(msg, "Game Draw! Try Again!", 60);
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    // let winnerFound = false;

    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                // winnerFound = true;
                return;
            }
        }
    }
    // if(!winnerFound) {
    //     let isDraw = true;
    //     boxes.forEach((box) => {
    //         if (box.innerText === "") {
    //             isDraw = false;
    //         }
    //     });

    //     if (isDraw) {
    //         drawpart();
    //     }
    // }        //Instead of using this comment lines, the easier way is in below.

    if(count === 9){
        drawpart();
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)