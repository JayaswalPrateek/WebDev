'use strict';
let humanScore = 0, computerScore = 0;
const TOTAL_ROUNDS = 5;
let currentRound = 0;
const rock = "rock", paper = "paper", scissors = "scissors";
const legalChoices = [rock, paper, scissors];
const resultBox = document.getElementById("results");
const scoreBoard = document.getElementById("scoreboard");

document.getElementById('buttonContainer').addEventListener("click", e => {
    const humanChoice = e.target.id;
    if (!legalChoices.includes(humanChoice)) return;

    document.body.style.backgroundColor = "white";
    resultBox.style.fontSize = "32px";
    const getComputerChoice = () => legalChoices[Math.floor(Math.random() * legalChoices.length)];
    const computerChoice = getComputerChoice();

    let color;
    if (humanChoice === computerChoice) {
        humanScore++;
        computerScore++;
        resultBox.textContent="We Drawed! Let's Try Again!";
        color = "grey";
    }
    else if ((humanChoice === rock && computerChoice === scissors) ||
        (humanChoice === paper && computerChoice === rock) ||
        (humanChoice === scissors && computerChoice === paper)) {
        humanScore++;
        resultBox.textContent=`You win! ${humanChoice} beats ${computerChoice}, Keep going!`;
        color = "lightgreen";
    }
    else {
        computerScore++;
        resultBox.textContent=`You lose! ${computerChoice} beats ${humanChoice}, Try Again!`;
        color = "red";
    }
    scoreBoard.textContent=`Human: ${humanScore} VS Computer: ${computerScore}`;
    if (++currentRound < TOTAL_ROUNDS) {
        document.body.style.backgroundColor = color;
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 400)
    }
    if (currentRound === TOTAL_ROUNDS) {
        if (humanScore > computerScore) {
            color = "lightgreen";
            resultBox.textContent = `You Won By ${humanScore - computerScore}`;
        } else if (humanScore < computerScore) {
            color = "red";
            resultBox.textContent = `You Lost By ${computerScore-humanScore}`;
        }
        else {
            color = "grey";
            resultBox.textContent = "We Drawed";
        }
        document.body.style.backgroundColor = color;
        resultBox.style.fontSize = "40px";
        humanScore = computerScore = currentRound = 0;
    }
});