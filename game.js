const dice1 = document.querySelector('.bi-dice-5-fill');
const dice2 = document.querySelector('.bi-dice-3-fill');

const startButton = document.getElementById('start-game');
const rollButton = document.getElementById('roll-dice');
const individualButton = document.getElementById('individual-dice');
const sumButton = document.getElementById('sum-dice');
const endTurnButton = document.getElementById('end-turn');

const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');

const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const currentRoundText = document.getElementById('current-round');
const currentTurnText = document.getElementById('current-turn');

let currentTurn = 1;
let currentRound = 1;
let die1 = 0;
let die2 = 0;
let player1Points = 0;
let player2Points = 0;
let player1Total = 0;
let player2Total = 0;

startButton.addEventListener('click', () => {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();


    if (!player1Name || !player2Name) {
        alert("Please fill in both player names!");
        player1Input.focus();
        return;
    }

    currentTurnText.textContent = player1Name;
    rollButton.disabled = false;

    document.querySelector('.board').style.display = 'block';
    document.querySelector('.dice-section').style.display = 'block';
    document.querySelector('.players').style.display = 'none';
    document.querySelector('.winner').style.display = 'none';
});

function rollDie(){
    return Math.floor(Math.random() * 6) + 1;
}

rollButton.addEventListener('click', () => {
    die1 = rollDie();
    die2 = rollDie();
    dice1.className = `bi bi-dice-${die1}-fill dice`;
    dice2.className = `bi bi-dice-${die2}-fill dice`;
    const diceSum = die1 + die2;

    const die1Shut = boxes[die1] === "X";
    const die2Shut = boxes[die2] === "X";
    const sumShut = boxes[diceSum] === "X";

    individualButton.disabled = die1 === die2 || die1Shut || die2Shut;
    sumButton.disabled = diceSum > 9 || sumShut;

    endTurnButton.disabled = !(individualButton.disabled && sumButton.disabled);
    rollButton.disabled = true;
});

function shut(boxNumber) {
    const boxElement = document.getElementById(`box${boxNumber}`);
    boxElement.classList.add('shut');
    boxElement.textContent = 'X';
    boxes[boxNumber] = "X";
}

individualButton.addEventListener('click', () => {
    shut(die1);
    shut(die2);
    boxes[die1] = "X";
    boxes[die2] = "X";
    const diceSum = die1 + die2;
    boxes[0] += diceSum;
    individualButton.disabled = true;
    sumButton.disabled = true;
    rollButton.disabled = false;
    console.log('Current round points:', boxes[0]);
});

sumButton.addEventListener('click', () => {
    const diceSum = die1 + die2;
    shut(diceSum);
    boxes[diceSum] = "X";
    boxes[0] += diceSum;
    individualButton.disabled = true;
    sumButton.disabled = true;
    rollButton.disabled = false;
    console.log('Current round points:', boxes[0]);
});

function buildRow(round, points) {
    const tr = document.createElement('tr');
    tr.id = `round${round}`;
    const th = document.createElement('th');
    th.textContent = `Round ${round}`;
    const td1 = document.createElement('td');
    td1.classList.add('p1Pts');
    td1.textContent = points;
    const td2 = document.createElement('td');
    td2.classList.add('p2Pts');
    td2.textContent = '';
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);

    return tr;
}

endTurnButton.addEventListener('click', () => {
    if (currentTurn === 1) {
        player1Points = 45 - boxes[0];
        player1Total += player1Points;
        const roundRow = buildRow(currentRound, player1Points);
        const tbodyElement = document.querySelector('tbody');
        tbodyElement.insertAdjacentElement('beforeend', roundRow);

        currentTurn = 2;
        currentTurnText.textContent = `It's Player 2's turn`;
    } else {
        player2Points = 45 - boxes[0];
        player2Total += player2Points;

        const roundRowElement = document.getElementById(`round${currentRound}`);
        const player2Td = roundRowElement.querySelector('.p2Pts');
        player2Td.textContent = player2Points;

        currentTurn = 1;
        currentRound++;
        currentTurnText.textContent = `It's Player 1's turn`;
    }

    function resetBoard() {

        boxes.fill(0);

        dice1.className = 'bi bi-dice-5-fill dice';
        dice2.className = 'bi bi-dice-3-fill dice';

        rollButton.disabled = false;

        document.getElementById('sum-dice').textContent = 'Sum of Dice: 0';

        individualButton.disabled = false;
        sumButton.disabled = false;
    }
});
endTurnButton.addEventListener('click', () => {
    if (currentTurn === 1) {
        player1Points = 45 - boxes[0];
        player1Total += player1Points;
        const roundRow = buildRow(currentRound, player1Points);
        const tbodyElement = document.querySelector('tbody');
        tbodyElement.insertAdjacentElement('beforeend', roundRow);

        currentTurn = 2;
        currentTurnText.textContent = `It's Player 2's turn`;
        rollbutton.disabled = false;
    } else {
        player2Points = 45 - boxes[0];
        player2Total += player2Points;

        const roundRowElement = document.getElementById(`round${currentRound}`);
        const player2Td = roundRowElement.querySelector('.p2Pts');
        player2Td.textContent = player2Points;

        currentTurn = 1;
        currentRound++;
        currentTurnText.textContent = `It's Player 1's turn`;
    }

    resetBoard();
    currentRoundText.textContent = `Round: ${currentRound}`;
    if (currentRound > 5) {
        console.log("game over");
        rollButton.disabled = true;
        individualButton.disabled = true;
        sumButton.disabled = true;
        endTurnButton.disabled = true;
    }

    endTurnButton.disabled = true;
    rollButton.disabled = false;
});
