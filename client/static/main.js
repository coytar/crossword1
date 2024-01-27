String.prototype.hash = function () {
  var self = this,
    range = Array(this.length);
  for (var i = 0; i < this.length; i++) {
    range[i] = i;
  }
  return Array.prototype.map
    .call(range, function (i) {
      return self.charCodeAt(i).toString(16);
    })
    .join("");
};

var congratulatoryMessages = [
  "🎉 You're a champion! Encore! 🎉",
  "🌟 Bravo! Onwards! 🌟",
  "💫 Pure genius! Keep goin'. 💫",
  // Add more messages as desired
];

// Declare global variables
var highlightedCells = [];
var wordPositions = {};
var currentPuzzleIndex = 0;
var crosswordData = {};

function areAllWordsCorrect() {
  return crosswordData.words.every(function (word, index) {
    var wordInfo = wordPositions[index + 1];
    for (var i = 0; i < wordInfo.length; i++) {
      var cell =
        wordInfo.orientation === "horizontal"
          ? document.querySelector("#crossword-table").rows[wordInfo.y].cells[
              wordInfo.x + i
            ]
          : document.querySelector("#crossword-table").rows[wordInfo.y + i]
              .cells[wordInfo.x];
      if (
        cell.textContent.replace(/[0-9]/g, "").toUpperCase() !==
        word.answer[i].toUpperCase()
      ) {
        return false;
      }
    }
    return true;
  });
}

async function getPuzzleFromBackend(index) {
  const data = { puzzleIndex: index };
  const res = await fetch("https://crossword1be.endratek.com/getpuzzle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    let json = await res.json();
    return JSON.parse(json.data);  
  }
  return null;
}

async function loadPuzzle(index) {
  // Clear existing crossword grid and hints
  document.getElementById("crossword-grid").innerHTML = "";
  document.getElementById("hints").innerHTML = "";

  if (index >= 0) {
    crosswordData = await getPuzzleFromBackend(index);
    document.getElementById("puzzle-title").textContent = crosswordData.title;
    renderCrossword();
    currentPuzzleIndex = index;
    // Optional: Update any UI elements with the new puzzle title
    // document.getElementById('puzzle-title').textContent = crosswordData.title;
  } else {
    // Handle the scenario where all puzzles are completed
    console.log("All puzzles completed!");
  }
  // Show the special note for Puzzle 1
  var specialNote = document.getElementById("special-note");
  if (index === 15) {
    // Assuming Puzzle 2 is at index 2 in your crosswordPuzzles array {set: 15}
    specialNote.style.display = "block";
  } else {
    specialNote.style.display = "none";
  }
}

// The Rendering of Crossword Puzzle
function renderCrossword() {
  // Reset global variables
  highlightedCells = [];
  wordPositions = {};

  var grid = document.createElement("table");
  grid.id = "crossword-table";

  for (var i = 0; i < crosswordData.size; i++) {
    var row = grid.insertRow();
    for (var j = 0; j < crosswordData.size; j++) {
      var cell = row.insertCell();
      // Initialize each cell as blank or with a placeholder
      cell.textContent = ""; // or use '_' for a placeholder
    }
  }
  document.getElementById("crossword-grid").appendChild(grid);
  assignNumbersAndEventListeners(grid);
  renderHints();
}

function assignNumbersAndEventListeners(grid) {
  crosswordData.words.forEach(function (word, index) {
    var x = word.position.x;
    var y = word.position.y;
    wordPositions[index + 1] = {
      length: word.length,
      orientation: word.position.orientation,
      x: x,
      y: y,
    };
    var cell = grid.rows[y].cells[x];
    var numberOverlay = document.createElement("span");
    numberOverlay.className = "number-overlay";
    numberOverlay.textContent = index + 1;
    cell.appendChild(numberOverlay);
  });

  var cells = document.querySelectorAll("#crossword-table td");
  cells.forEach(function (cell, index) {
    cell.addEventListener("click", function () {
      clearSelection(cells);
      var clickedNumber = parseInt(
        cell.querySelector(".number-overlay")?.textContent
      );
      if (wordPositions[clickedNumber]) {
        var wordInfo = wordPositions[clickedNumber];
        highlightWord(
          grid,
          wordInfo.x,
          wordInfo.y,
          wordInfo.length,
          wordInfo.orientation
        );

        // Set focus to hidden input
        document.getElementById("hiddenInput").focus();
      }
    });
    cell.addEventListener("touchend", function () {
      document.getElementById("hiddenInput").focus(); // Add this for mobile compatibility
    });
  });
}

function clearSelection(cells) {
  cells.forEach(function (c) {
    c.style.backgroundColor = "";
  });
}

function highlightWord(grid, startX, startY, length, orientation) {
  highlightedCells = [];
  for (var i = 0; i < length; i++) {
    var highlightCell;
    if (orientation === "horizontal") {
      highlightCell = grid.rows[startY].cells[startX + i];
    } else {
      highlightCell = grid.rows[startY + i].cells[startX];
    }
    highlightCell.style.backgroundColor = "#9b2226"; // Crossword-Grid-Highlight-Red
    highlightedCells.push(highlightCell);
  }
}

function renderHints() {
  var hintList = document.getElementById("hints");
  var hintNumber = 1;
  crosswordData.words.forEach(function (word) {
    var orientation =
      word.position.orientation === "horizontal" ? "Horizontal" : "Vertical";
    var hintPara = document.createElement("p");
    var orientationSpan = document.createElement("span");
    orientationSpan.className = "orientation-color";
    orientationSpan.textContent = orientation;

    hintPara.textContent = hintNumber + ". ";
    hintPara.appendChild(orientationSpan);
    hintPara.appendChild(document.createTextNode(": " + word.hint));
    hintList.appendChild(hintPara);
    hintNumber++;
  });
}

function setUpInputHandler() {
  var currentHighlightedCellIndex = 0;

  document.addEventListener("keypress", function (event) {
    // console.log("Keypress detected:", event.key);
    var char = String.fromCharCode(event.keyCode).toUpperCase();
    if (/[a-zA-Z]/.test(char) && highlightedCells.length > 0) {
      var targetCell = highlightedCells[currentHighlightedCellIndex];

      if (targetCell) {
        // Check if the cell contains a number overlay
        var overlay = targetCell.querySelector(".number-overlay");
        if (overlay) {
          // Clear the cell if it's the first cell of a word
          targetCell.innerHTML = "";
          targetCell.appendChild(overlay);
        }

        // Update the cell with the typed character
        targetCell.textContent = char;

        // Re-insert the overlay if it exists
        if (overlay) {
          targetCell.insertBefore(overlay, targetCell.firstChild);
        }

        // Move to the next cell in the highlightedCells array
        currentHighlightedCellIndex =
          (currentHighlightedCellIndex + 1) % highlightedCells.length;

        // Check answer after the last character of the word is typed
        if (currentHighlightedCellIndex === 0) {
          // We have looped back to the start, meaning the end of the word was reached
          var wordNumber = findWordNumber(highlightedCells[0]);
          checkAnswer(wordNumber); // Call checkAnswer here
        }
      }
    }
  });
}

function findWordNumber(cell) {
  for (var number in wordPositions) {
    var wordInfo = wordPositions[number];
    if (
      cell.parentNode.rowIndex === wordInfo.y &&
      cell.cellIndex === wordInfo.x
    ) {
      return number; // Return the word number
    }
  }
  return ""; // Return an empty string if no match is found
}

function checkAnswer(wordNumber) {
  var wordInfo = wordPositions[wordNumber];
  var answer = crosswordData.words[wordNumber - 1].answer;
  var isCorrect = true;

  var entered = "";
  for (var i = 0; i < wordInfo.length; i++) {
    var cell;
    if (wordInfo.orientation === "horizontal") {
      cell =
        document.querySelector("#crossword-table").rows[wordInfo.y].cells[
          wordInfo.x + i
        ];
    } else {
      cell =
        document.querySelector("#crossword-table").rows[wordInfo.y + i].cells[
          wordInfo.x
        ];
    }
    if (cell) {
      var cellLetter = cell.textContent.replace(/[0-9]/g, "").toUpperCase();
      entered += cellLetter.toString();
    }
  }

  // console.log("Entered:", entered.hash());
  // console.log("Expected answer:", answer);

  if (entered.hash() !== answer) {
    isCorrect = false;
  }

  console.log("Is correct:", isCorrect);

  if (isCorrect) {
    highlightedCells.forEach(function (cell) {
      cell.style.backgroundColor = "#4f772d"; // Green
    });

    if (areAllWordsCorrect()) {
      var nextPuzzleIndex = currentPuzzleIndex + 1;
      var nextPuzzleKey =
        nextPuzzleIndex < crosswordPuzzles.length
          ? crosswordPuzzles[nextPuzzleIndex].progressKey
          : "Completed all puzzles!";
      var messageDuration =
        nextPuzzleIndex >= crosswordPuzzles.length ? 30 : 10; // 30 seconds for final message, 10 for others
      var countdown = messageDuration;

      var randomMessage =
        nextPuzzleIndex < crosswordPuzzles.length
          ? congratulatoryMessages[
              Math.floor(Math.random() * congratulatoryMessages.length)
            ] +
            "<br>Puzzle Key Unlocked: " +
            nextPuzzleKey
          : null;

      var countdownMessage = setInterval(function () {
        if (countdown <= 0) {
          clearInterval(countdownMessage);
          if (nextPuzzleIndex < crosswordPuzzles.length) {
            loadPuzzle(nextPuzzleIndex);
          }
        } else {
          var message =
            nextPuzzleIndex >= crosswordPuzzles.length
              ? "✨🎉 Congratulations! 🎉✨<br>🧩🏆 You're a master puzzle solver! 🧩<br> 🪁 Keep on soaring! 🪁"
              : randomMessage +
                "<br>Next puzzle will load in " +
                countdown +
                " seconds.";
          showPopup(message);
        }
        countdown--;
      }, 1000);
    }
  }
}

function submitProgressKey() {
  var enteredKey = "";
  var keyCells = document.querySelectorAll("#progress-key-grid div");
  keyCells.forEach(function (cell) {
    enteredKey += cell.textContent.toUpperCase();
  });

  for (var i = 0; i < crosswordPuzzles.length; i++) {
    if (crosswordPuzzles[i].progressKey === enteredKey.hash()) {
      loadPuzzle(i);
      document.getElementById("progress-message").textContent =
        "Puzzle loaded successfully.";
      break; // Exit the loop as we found the matching key
    } else {
      document.getElementById("progress-message").textContent =
        "Invalid Puzzle Key.";
    }
  }

  // Clear the cells after checking the key
  keyCells.forEach(function (cell) {
    cell.textContent = "";
  });
}

// Global flag to track if the progress key grid is active
var isProgressKeyActive = false;

// Timer variable
var progressKeyTimer;

function handleProgressKeyInput(event) {
  if (!isProgressKeyActive) return; // Only proceed if the progress key grid is active

  // Reset the timer on each keypress
  clearTimeout(progressKeyTimer);
  startProgressKeyTimer();

  var keyCells = document.querySelectorAll("#progress-key-grid div");
  var activeCellIndex = keyCells.findIndex(
    (cell) => cell.style.backgroundColor === "#219ebc"
  ); // Progress-Key-Colour: Blue(#219ebc) Was-Purple (#3c096c)
  if (activeCellIndex !== -1 && /[a-zA-Z]/.test(event.key)) {
    keyCells[activeCellIndex].textContent = event.key.toUpperCase();
    var nextIndex = (activeCellIndex + 1) % keyCells.length;
    handleCellInput(nextIndex);
  }
}

function startProgressKeyTimer() {
  progressKeyTimer = setTimeout(function () {
    resetProgressKeyGrid();
  }, 2000); // 2 seconds
}

document.addEventListener("DOMContentLoaded", function () {
  // Generate progress key cells
  var progressKeyGrid = document.getElementById("progress-key-grid");
  var keyCells = []; // Array to store the progress key cells

  for (var i = 0; i < 4; i++) {
    var cell = document.createElement("div");
    cell.style.cursor = "pointer";
    cell.setAttribute("data-index", i); // Set a data attribute for indexing
    keyCells.push(cell); // Add cell to the array
    progressKeyGrid.appendChild(cell);
  }

  // Function to handle cell input
  function handleCellInput(index) {
    keyCells.forEach(
      (cell, idx) =>
        (cell.style.backgroundColor = idx === index ? "#219ebc" : "")
    ); // Progress-Key-Colour: Blue(#219ebc) Was-Purple (#3c096c)

    document.addEventListener(
      "keypress",
      function onKeypress(e) {
        if (/[a-zA-Z]/.test(e.key)) {
          keyCells[index].textContent = e.key.toUpperCase();
          var nextIndex = (index + 1) % keyCells.length;
          if (nextIndex === 0) {
            // All cells are filled, submit the progress key
            submitProgressKey();
          } else {
            // Move to the next cell for input
            handleCellInput(nextIndex);
          }
        }
        document.removeEventListener("keypress", onKeypress);
      },
      { once: true }
    );
  }

  keyCells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      var currentIndex = parseInt(this.getAttribute("data-index"));
      handleCellInput(currentIndex);
      isProgressKeyActive = true; // Set the flag when a cell is clicked
      document.addEventListener("keypress", handleProgressKeyInput); // Ensure the listener is attached
      startProgressKeyTimer(); // Start the timer

      // Set focus to hidden input
      document.getElementById("hiddenInput").focus();
    });

    cell.addEventListener("touchend", function () {
      // Set focus to hidden input for mobile compatibility
      document.getElementById("hiddenInput").focus();
    });
  });

  // Load the first puzzle and set up input handlers
  loadPuzzle(0);
  setUpInputHandler();
});

// Function to reset the progress key grid and remove the keypress listener
function resetProgressKeyGrid() {
  var keyCells = document.querySelectorAll("#progress-key-grid div");
  keyCells.forEach(function (cell) {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  document.getElementById("progress-message").textContent = "";
  isProgressKeyActive = false; // Reset the flag when clicked outside
  clearTimeout(progressKeyTimer); // Clear the timer
  isProgressKeyActive = false;
  document.removeEventListener("keypress", handleProgressKeyInput); // Ensure the listener is detached
}

// Click event listener outside of the DOMContentLoaded
document.addEventListener("click", function (event) {
  if (!document.getElementById("progress-key-grid").contains(event.target)) {
    resetProgressKeyGrid();
  }
});

// Add this at the end of your script, outside of any functions
document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("congrats-popup").style.display = "none";
});

// Close the popup when clicking outside of it
window.onclick = function (event) {
  var popup = document.getElementById("congrats-popup");
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

function showPopup(message) {
  var popupContent = "<div class='congratulations-popup'>" + message + "</div>";
  var popupElement = document.createElement("div");
  popupElement.innerHTML = popupContent;
  document.body.appendChild(popupElement);

  // Automatically close the popup after 10 seconds
  setTimeout(function () {
    document.body.removeChild(popupElement);
  }, 10000);
}
