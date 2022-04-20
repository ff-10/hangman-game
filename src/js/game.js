const words = [
    "quick",
    "gold",
    "money",
    "moon",
    "eacamp",
    "smart"
]

let wins = 0,
    loses = 0,
    choices = 9,
    word = [],
    hiddens = [],
    lettersHistory = [];

const domSide = {
    wins: document.querySelector('.wins'),
    loses: document.querySelector('.loses'),
    letterHistory: document.querySelector('.letterHistory'),
    choices: document.querySelector('.choices'),
    secWord: document.querySelector('.secWord'),
    gifContainer: document.querySelector('.loseGif'),
    gifImg: document.querySelector('.loseGif > img'),

    updateWins(score) {
        this.wins.innerHTML = score;
    },
    updateLoses(score) {
        this.loses.innerHTML = score;
    },
    updateLetters(array) {
        this.letterHistory.innerHTML = array.join(" ").toUpperCase();
    },
    updateChoices(choice) {
        this.choices.innerHTML = choice;
    },
    updateSecWord(arr) {
        this.secWord.innerHTML = arr.join(" ");
    },
    checkWin(bool) {
        const win = (img) => {
            this.gifImg.src = `./src/images/${img}.gif`;
            this.gifContainer.style.opacity = 1;
            setTimeout(() => (this.gifContainer.style.opacity = 0), 3000);
        }
        bool === true ? win('win') : win('lose');
    }
}


const setWord = () => (words[Math.floor(Math.random() * words.length)].split(""));
word = setWord();

const init = () => {
    domSide.updateWins(wins);
    domSide.updateLoses(loses);
    domSide.updateWins(wins);
    domSide.updateLetters(lettersHistory);
    domSide.updateChoices(choices);
}

function pipeUndercores() {
    for (let idx in word) {
        idx = "_";
        hiddens.push(idx);
    }
    domSide.updateSecWord(hiddens);
}

init();

pipeUndercores();

const letterEdgeCase = (letter) => ("abcdefghijklmnopqrstuvwxyz".includes(letter));
const letterRepeatEdgeCase = (letter) => (lettersHistory.includes(letter));

const check = (player) => {
    if (letterEdgeCase(player)) {
        let sameLettersIdxs = [];
        if (letterRepeatEdgeCase(player)) {
            return;
        }
        lettersHistory.push(player);

        if (word.indexOf(player) !== -1) {
            const checkSameLetters = (letter) => {
                for (let idx in word) {
                    if (letter === word[idx]) {
                        sameLettersIdxs.push(idx);
                        continue;
                    }
                }
            }
            checkSameLetters(player);

            if (sameLettersIdxs.length <= 1) {
                let idx = word.indexOf(player);
                hiddens[idx] = player;
                domSide.updateSecWord(hiddens);
            } else {
                for (let num of sameLettersIdxs) {
                    hiddens[+num] = player;
                }
                domSide.updateSecWord(hiddens);

            }
        } else {
            choices--;
            domSide.updateChoices(choices);
            domSide.updateLetters(lettersHistory);
        }

        if (hiddens.join("") === word.join("")) {
            wins++;
            domSide.checkWin(true);
            setTimeout(() => (newGame()), 2300);
        } else if (choices === 0) {
            loses++;
            domSide.updateSecWord(word);
            domSide.checkWin(false);
            setTimeout(() => (newGame()), 2300);
        }
    }
}

window.onkeydown = (e) => (check(e.key));

const newGame = () => {
    word = setWord();
    choices = 9;
    lettersHistory = [];
    hiddens = [];
    domSide.updateWins(wins);
    domSide.updateLoses(loses);
    domSide.updateWins(wins);
    domSide.updateLetters(lettersHistory);
    domSide.updateChoices(choices);
    pipeUndercores();
    domSide.updateSecWord(hiddens);
}