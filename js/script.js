const allLevels = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];

/* Start Game */

const start = document.createElement("section");
start.classList.add("start");
document.querySelector("main").appendChild(start);

const startP = document.createElement("h1");
start.appendChild(startP);
startP.innerText = "Maze";

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
p.innerText = "Well done, you won!";

const nextBtn = document.createElement("button");
wonPopup.appendChild(nextBtn);
nextBtn.classList.add("next-level-btn");
nextBtn.innerText = "Next Level";
nextBtn.addEventListener("click", function() {
    const maze = document.querySelector(".maze-section");
    const level = parseInt(document.querySelector(".maze").getAttribute("id"));
    
    maze.parentNode.removeChild(maze);
    createMaze(level+1);
    wonPopup.style.display = "none";
});

const endBtn = document.createElement("button");
wonPopup.appendChild(endBtn);
endBtn.classList.add("end-game-btn");
endBtn.innerText = "End Game";
endBtn.addEventListener("click", function() {
    const maze = document.querySelector(".maze");
    maze.parentNode.removeChild(maze);

    wonPopup.style.display = "none";
    start.style.display = "flex";
});

/* Completed all mazes */

const completed = document.createElement("section");
completed.classList.add("completed");
document.querySelector("main").appendChild(completed);

const compP = document.createElement("p");
completed.appendChild(compP);
compP.innerText = "Congratulations!\nYou have completed every maze";

const restartBtn = document.createElement("button");
completed.appendChild(restartBtn);
restartBtn.classList.add("restart-btn");
restartBtn.innerText = "Restart Game";
restartBtn.addEventListener("click", function() {
    completed.style.display = "none";
    start.style.display = "flex";
});

const levelBtn = document.createElement("button");
completed.appendChild(levelBtn);
levelBtn.classList.add("level-btn");
levelBtn.innerText = "Choose Level";
levelBtn.addEventListener("click", function() {
    completed.style.display = "none";
    choose.style.display = "flex";
});

/* Choose level */

const choose = document.createElement("section");
document.querySelector("main").appendChild(choose);
choose.classList.add("choose");

const chooseP = document.createElement("p");
choose.appendChild(chooseP);
chooseP.innerText = "Levels";

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
        let num = parseInt(lvl);
        createMaze(num-1);

        choose.style.display = "none";
    });
}

/* Functions */

function createMaze(i) {
    if (i >= allLevels.length) {
        completed.style.display = "flex";
    } else {
        const level = allLevels[i];
        const numColumns = level[0].length;
        const numRows = level.length;

        const mazeSection = document.createElement("section");
        document.querySelector("main").appendChild(mazeSection);
        mazeSection.classList.add("maze-section");

        const title = document.createElement("h2");
        mazeSection.appendChild(title);
        title.innerText = "Level " + (i+1);

        const maze = document.createElement("div");
        mazeSection.appendChild(maze);
        maze.classList.add("maze");
        maze.setAttribute("id", i);
        maze.style.gridTemplateColumns = "repeat(" + numColumns + ", 1fr)";
        maze.style.gridTemplateRows = "repeat(" + numRows + ", 1fr)";


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
    }
}

document.addEventListener("keydown", pressKey);

function pressKey(e) {
    const levelNum = document.querySelector(".maze").getAttribute("id");
    const level = allLevels[levelNum];
    const numColumns = level[0].length;
    const pos = document.getElementById("person");

    if (e.keyCode === 37) {
        if (pos.previousSibling && pos.previousSibling.getAttribute("id") === "path") {
            pos.id = "path";
            pos.previousSibling.id = "person";
        } else if (pos.previousSibling && pos.previousSibling.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            winner();
        }
    } else if (e.keyCode === 38) {
        let place = pos;
        for (let iterate = 0; iterate < numColumns; iterate++){
            if (place.previousSibling) {
               place = place.previousSibling; 
            }
        }
        if (place.getAttribute("id") === "path") {
            pos.id = "path";
            place.id = "person";
        } else if (place.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            winner();
        }
    } else if (e.keyCode === 39) {
        if (pos.nextSibling && pos.nextSibling.getAttribute("id") === "path") {
            pos.id = "path";
            pos.nextSibling.id = "person";
        } else if (pos.nextSibling && pos.nextSibling.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            winner();
        }
    } else if (e.keyCode === 40) {
        let place = pos;
        for (let iterate = 0; iterate < numColumns; iterate++) {
            if (place.nextSibling) {
                place = place.nextSibling;
            }
        }
        if (place.getAttribute("id") === "path") {
            pos.id = "path";
            place.id = "person";
        } else if (place.getAttribute("id") === "treasure" ) {
            pos.id = "path";
            winner();
        }
    } 
}

function winner() {
    const mazeSection = document.querySelector(".maze-section");
    const level = parseInt(document.querySelector(".maze").getAttribute("id"));
    
    if (level === allLevels.length - 1) {
        mazeSection.parentNode.removeChild(mazeSection);
        completed.style.display = "flex";
    } else {
        const popup = document.querySelector(".winner");
        popup.style.display = "flex";
    }
}