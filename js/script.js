const allLevels = [LEVEL_1/*, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5*/];
var timeout;
var timer;
var totalTime = "";
var totalSeconds = 0;

/* Start Game */

const start = document.createElement("section");
start.classList.add("start");
document.querySelector("main").appendChild(start);

const startP = document.createElement("h1");
start.appendChild(startP);
startP.innerText = "Hungry Crab\nMaze";

const startBtn = document.createElement("button");
start.appendChild(startBtn);
startBtn.classList.add("start-btn");
startBtn.innerText = "Start Game";
startBtn.addEventListener("click", function() {
    createMaze(0);
    start.style.display = "none";
});

/* Completed one level */

const wonPopup = document.createElement("div");
wonPopup.classList.add("winner");
document.querySelector("main").appendChild(wonPopup);

const p = document.createElement("p");
wonPopup.appendChild(p);
p.innerText = "Well done!\nYou completed the level in\n";

const nextBtn = document.createElement("button");
wonPopup.appendChild(nextBtn);
nextBtn.classList.add("next-level-btn");
nextBtn.innerText = "Next Level";
nextBtn.addEventListener("click", function() {
    const maze = document.querySelector(".maze-section");
    const level = parseInt(document.querySelector(".maze").getAttribute("id"));
    
    maze.parentNode.removeChild(maze);
    createMaze(level+1);
    wonPopup.removeChild(document.getElementById("time-taken"));
    wonPopup.style.display = "none";
});

const endBtn = document.createElement("button");
wonPopup.appendChild(endBtn);
endBtn.classList.add("end-game-btn");
endBtn.innerText = "End Game";
endBtn.addEventListener("click", function() {
    refresh();
    totalTime = "";

    const maze = document.querySelector(".maze-section");
    maze.parentNode.removeChild(maze);

    wonPopup.removeChild(document.getElementById("time-taken"));
    wonPopup.style.display = "none";
    start.style.display = "flex";
});

/* Completed all mazes */

const completed = document.createElement("section");
completed.classList.add("completed");
document.querySelector("main").appendChild(completed);

const compP = document.createElement("p");
completed.appendChild(compP);
compP.innerText = "Congratulations!\nYou have completed every maze in";

const restartBtn = document.createElement("button");
completed.appendChild(restartBtn);
restartBtn.classList.add("restart-btn");
restartBtn.innerText = "Restart Game";
restartBtn.addEventListener("click", function() {
    refresh();
    totalTime = "";
    const maze = document.querySelector(".maze-section");
    maze.parentNode.removeChild(maze);


    completed.style.display = "none";
    start.style.display = "flex";
    completed.removeChild(document.getElementById("resulting-time"));
});

const levelBtn = document.createElement("button");
completed.appendChild(levelBtn);
levelBtn.classList.add("level-btn");
levelBtn.innerText = "Choose Level";
levelBtn.addEventListener("click", function() {
    refresh();
    totalTime = "";

    completed.style.display = "none";
    choose.style.display = "flex";
    completed.removeChild(document.getElementById("resulting-time"));
});

/* Choose level */

const choose = document.createElement("section");
document.querySelector("main").appendChild(choose);
choose.classList.add("choose");

const chooseH2 = document.createElement("h2");
choose.appendChild(chooseH2);
chooseH2.innerText = "Levels";

const ul = document.createElement("ul");
choose.appendChild(ul);

const choiceBtns = [1, 2, 3, 4, 5, 6];

for (const lvl of choiceBtns) {
    const li = document.createElement("li");
    ul.appendChild(li);

    const button = document.createElement("button");
    li.appendChild(button);
    button.setAttribute("id", lvl);
    button.innerText = lvl;
    button.addEventListener("click", function() {
        refresh();

        const maze = document.querySelector(".maze-section");
        maze.parentNode.removeChild(maze);

    
        let num = parseInt(lvl);
        createMaze(num-1);

        choose.style.display = "none";
    });
}

const chooseBtn = document.createElement("button");
wonPopup.insertBefore(chooseBtn, endBtn);
chooseBtn.classList.add("choose-level-btn");
chooseBtn.innerText = "Choose Level";
chooseBtn.addEventListener("click", function() {
    const maze = document.querySelector(".maze-section");
    maze.parentNode.removeChild(maze);

    wonPopup.style.display = "none";
    choose.style.display = "flex";
});

/* Game Over */

const over = document.createElement("section");
over.classList.add("game-over");
document.querySelector("main").appendChild(over);

const gameOverP = document.createElement("p");
over.appendChild(gameOverP);
gameOverP.innerText = "Game Over";
gameOverP.setAttribute("id", "game-over-text");

const overP = document.createElement("p");
over.appendChild(overP);
overP.innerText = "The ice cream has melted";

const overRestart = document.createElement("button");
over.appendChild(overRestart);
overRestart.classList.add("over-restart-btn");
overRestart.innerText = "Restart Level";
overRestart.addEventListener("click", function() {
    const maze = document.querySelector(".maze-section");
    const level = parseInt(document.querySelector(".maze").getAttribute("id"));
    maze.parentNode.removeChild(maze);
    over.style.display = "none";
    createMaze(level);
});

const overEndBtn = endBtn.cloneNode(true);
over.appendChild(overEndBtn);
overEndBtn.addEventListener("click", function() {
    const maze = document.querySelector(".maze-section");
    maze.parentNode.removeChild(maze);

    over.style.display = "none";
    start.style.display = "flex";
});

/* Functions */

// Create maze

function createMaze(i) {
    totalSeconds = 0;
    timer = setInterval(setTime, 10);
    timeout = setTimeout(gameOver, 7000);

    const level = allLevels[i];
    const numColumns = level[0].length;
    const numRows = level.length;

    const mazeSection = document.createElement("section");
    document.querySelector("main").appendChild(mazeSection);
    mazeSection.classList.add("maze-section");

    const header = document.createElement("div");
    header.classList.add("maze-header");
    mazeSection.appendChild(header);

    const time = document.createElement("div");
    time.setAttribute("id", "time");
    header.appendChild(time);

    const seconds = document.createElement("label");
    time.appendChild(seconds);
    seconds.setAttribute("id", "seconds");
    seconds.innerHTML = "00";

    const colon = document.createElement("label");
    time.appendChild(colon);
    colon.innerHTML = ":";

    const msecs = document.createElement("label");
    time.appendChild(msecs);
    msecs.setAttribute("id", "milliseconds");
    msecs.innerHTML = "00";

    const title = document.createElement("h2");
    header.appendChild(title);
    title.innerText = "Level " + (i+1);

    const maze = document.createElement("div");
    mazeSection.appendChild(maze);
    maze.classList.add("maze");
    maze.setAttribute("id", i);
    maze.style.gridTemplateColumns = "repeat(" + numColumns + ", 50px)";
    maze.style.gridTemplateRows = "repeat(" + numRows + ", 50px)";


    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
            if (level[row][col] === "*") {
                const square = document.createElement("div");
                maze.appendChild(square);
                square.setAttribute("id", "wall");
            } else if (level[row][col] === ".") {
                const square = document.createElement("div");
                maze.appendChild(square);
                square.setAttribute("id", "path");
            } else if (level[row][col] === "S") {
                const start = document.createElement("div");
                maze.appendChild(start);
                start.setAttribute("id", "person");
            } else if (level[row][col] === "T") {
                const finish = document.createElement("div");
                maze.appendChild(finish);
                finish.setAttribute("id", "treasure");
            } else if (level[row][col] === "o") {
                const obst = document.createElement("div");
                maze.appendChild(obst);
                obst.setAttribute("id", "obstacle");
            }
        }
    }
    document.addEventListener("keydown", pressKey);
}

// Movement

function pressKey(e) {
    const levelNum = document.querySelector(".maze").getAttribute("id");
    const level = allLevels[levelNum];
    const numColumns = level[0].length;
    const pos = document.getElementById("person");

    if (e.keyCode === 37) {
        if (pos.previousSibling !== null && pos.previousSibling.getAttribute("id") === "path") {
            pos.id = "path";
            pos.previousSibling.id = "person";
        } else if (pos.previousSibling !== null && pos.previousSibling.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            document.removeEventListener("keydown", pressKey);
            winner();
        }
    } else if (e.keyCode === 38) {
        let place = pos;
        for (let iterate = 0; iterate < numColumns; iterate++){
            if (place.previousSibling !== null) {
               place = place.previousSibling; 
            }
        }
        if (place.getAttribute("id") === "path") {
            pos.id = "path";
            place.id = "person";
        } else if (place.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            document.removeEventListener("keydown", pressKey);
            winner();
        }
    } else if (e.keyCode === 39) {
        if (pos.nextSibling !== null && pos.nextSibling.getAttribute("id") === "path") {
            pos.id = "path";
            pos.nextSibling.id = "person";
        } else if (pos.nextSibling !== null && pos.nextSibling.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            document.removeEventListener("keydown", pressKey);
            winner();
        }
    } else if (e.keyCode === 40) {
        let place = pos;
        for (let iterate = 0; iterate < numColumns; iterate++) {
            if (place.nextSibling !== null) {
                place = place.nextSibling;
            }
        }
        if (place.getAttribute("id") === "path") {
            pos.id = "path";
            place.id = "person";
        } else if (place.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            document.removeEventListener("keydown", pressKey);
            winner();
        }
    }
}

// Won game

function winner() {
    refresh();

    const level = parseInt(document.querySelector(".maze").getAttribute("id"));
    var secs = document.getElementById("seconds").innerText;
    var ms = document.getElementById("milliseconds").innerText;
    
    document.querySelector(".maze-section").style.display = "none";

    if (secs[0] === "0") {
        secs = secs.slice(1);
    }

    if (level === allLevels.length - 1) {
        totalTime +=  secs + "." + ms + "+";
        const result = getTotalTime(totalTime);
        const resultTime = document.createElement("p");
        completed.insertBefore(resultTime, document.querySelector(".restart-btn"));
        resultTime.setAttribute("id", "resulting-time");
        resultTime.innerText = result + " seconds";

        completed.style.display = "flex";
        document.querySelector(".choose-level-btn").style.display = "block";
    } else {
        const won = document.querySelector(".winner");
        won.style.display = "flex";

        const time = document.createElement("p");
        won.insertBefore(time, document.querySelector(".next-level-btn"));
        time.setAttribute("id", "time-taken");
        time.innerText = secs + "." + ms + " seconds";
        totalTime +=  secs + "." + ms + "+";
    }
}

// Lost game 

function gameOver() {
    refresh();
    document.querySelector(".maze-section").style.display = "none";
    over.style.display = "flex";
}

// Timer

function setTime() {
    ++totalSeconds;
    document.getElementById("milliseconds").innerHTML = pad(totalSeconds % 60);
    document.getElementById("seconds").innerHTML = pad(parseInt(totalSeconds / 60)); 
  }
  
  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  function getTotalTime(str) {
    var split = str.split("+");
    split = split.slice(0, -1);
    var result = 0;

    for (let elem of split) {
        elem = parseFloat(elem);
        result += elem;
    }

    return result;
  }

function refresh() {
    clearTimeout(timeout);
    clearInterval(timer);
}
  