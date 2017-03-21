var randomNumber,
    clearButton = document.querySelector("#clear-btn"),
    guessButton = document.querySelector("#guess-btn"),
    resetButton = document.querySelector("#reset-btn"),
    messageBefore = document.querySelector("#message-before"),
    messageAfter = document.querySelector("#message-after"),
    guessInput = document.querySelector("#guess-input"),
    guessedNumberDisplay = document.querySelector("#guessed-number"),
    errorMessage = document.querySelector("#error-message"),
    minNumberInput = document.querySelector("#min-number"),
    maxNumberInput = document.querySelector("#max-number"),
    minNumber = 0,
    maxNumber = 100,
    guessedNumber,
    guessCount = 0,
    gamesCompleted = 0;

resetGame();

minNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value)
  console.log();
  if (isNaN(input)) {
    minNumber = "?";
    updateMessageBefore()
  } else {
  minNumber = input;
  resetGame();
  }
});

maxNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value)
  console.log();
  if (isNaN(input)) {
    maxNumber = "?";
    updateMessageBefore()
  } else {
  maxNumber = input;
  resetGame();
  }
});

guessInput.addEventListener("input", function(e) {
  var inputString = e.target.value;
  var input = parseInt(e.target.value);
  if (e.inputType === "deleteContentBackward" && inputString === "") {
    disableClearButton();
    disableGuessButton();
    updateErrorMessage("");
  } else if (isNaN(input) || input > maxNumber || input < minNumber) {
    enableClearButton();
    disableGuessButton();
    updateErrorMessage("Warning: Invalid Input. Pick a number from " + minNumber + " to " + maxNumber +".");
  } else {
    enableClearButton();
    enableGuessButton();
    updateErrorMessage("");
  }
});

guessInput.addEventListener("keyup", function(e) {
    if (e.which === 13) {
      compareNumbers();
    } else if (e.which === 27) {
      clearInput();
    }
});

guessButton.addEventListener("click", compareNumbers);

clearButton.addEventListener("click", clearInput);

resetButton.addEventListener("click", resetGame);

function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * ((maxNumber + 1) - minNumber)) + minNumber;
}

function clearInput() {
    guessInput.value = "";
    disableClearButton();
    disableGuessButton();
    updateErrorMessage("");
    focusElement(guessInput);
    console.log("========== ALL CLEAR! ==========");
}

function focusElement(el) {
  el.focus();
}

//Enable Buttons
function enableClearButton() {
  clearButton.classList.remove('disabled');
  clearButton.removeAttribute("disabled", "");
}
function enableGuessButton() {
  guessButton.classList.remove('disabled');
  guessButton.removeAttribute("disabled", "");
}
function enableResetButton() {
  resetButton.classList.remove('disabled');
  resetButton.removeAttribute("disabled", "");
}

// Disable Buttons
function disableClearButton() {
  clearButton.classList.add('disabled');
  clearButton.setAttribute("disabled", "");
}
function disableGuessButton() {
  guessButton.classList.add('disabled');
  guessButton.setAttribute("disabled", "");
}
function disableResetButton() {
  resetButton.classList.add('disabled')
  resetButton.setAttribute("disabled", "");
}

function updateNumberDisplay() {
  guessedNumberDisplay.textContent = guessInput.value;
}

function compareNumbers() {
  guessedNumber = parseInt(guessInput.value);
  if (guessButton.classList.value !== "disabled" ) {
    console.log("======= GUESS SUBMISSION =======");
    guessCount++;
    updateMessageBefore("Your last guess of");
    if (guessedNumber > randomNumber) {
      updateNumberDisplay()
      if (guessedNumber < randomNumber + 10) {
        updateMessageAfter("was too high, but you're getting warm! Try again.");
      } else {
        updateMessageAfter("was too high. Try again.");
      }
      focusElement(guessInput);
    } else if (guessedNumber < randomNumber) {
      updateNumberDisplay()
      if (guessedNumber > randomNumber - 10) {
        updateMessageAfter("was too low, but you're getting warm! Try again.");
      } else {
        updateMessageAfter("was too low. Try again.");
      }
      focusElement(guessInput);
    } else if (guessedNumber === randomNumber) {
      updateNumberDisplay()
      guessedNumberDisplay.classList.add("success");
      guessInput.setAttribute("disabled", "");
      resetButton.textContent = "Play Again";
      if (guessCount > 1) {
        updateMessageBefore("Bo0Oo0M!")
        updateMessageAfter("You got it in " + guessCount + " tries!");
      } else {
        updateMessageBefore("Wow, you got it on your first try!")
        updateMessageAfter("Are you sure you're not cheating?");
      }
      focusElement(resetButton);
      resetButton.classList.add("play-again");
      maxNumber += 10;
      minNumber -= 10;
      gamesCompleted++;
      console.log("SUCCESS!!!");
      messageBefore.classList.remove("attention");
    }
    console.log("Guessed Number = " + guessedNumber);
    console.log("Random Number = " + randomNumber);
    console.log("Guess Count = " + guessCount);
    console.log("Games Completed = " + gamesCompleted);
    disableClearButton();
    disableGuessButton();
    enableResetButton();
    guessInput.value = "";
  }
}

function updateMessageBefore(message) {
  messageBefore.textContent = message || "Pick a number from " + minNumber + " to " + maxNumber;
}

function updateMessageAfter(message) {
  if (message === "clear") {
    messageAfter.innerHTML = "&nbsp";
  } else {
    messageAfter.textContent = message;
  }
}

function updateMinMaxInputs() {
  minNumberInput.value = minNumber;
  maxNumberInput.value = maxNumber;
}

function updateGuessedNumberDisplay(char) {
  guessedNumberDisplay.textContent = char;
}

function updateErrorMessage(message) {
  errorMessage.textContent = message;
}

function resetGame() {
  if (minNumber > maxNumber || maxNumber < minNumber) {
    updateErrorMessage("Minimum cannot be greater than maximum");
  } else {
    console.log("======= RESET GAME =======");
    messageBefore.classList.add("attention");
    guessCount = 0;
    getRandomNumber();
    disableResetButton()
    updateMessageBefore()
    updateGuessedNumberDisplay("#");
    updateMessageAfter("clear")
    errorMessage.textContent = "";
    guessedNumberDisplay.classList.remove("success");
    guessInput.removeAttribute("disabled", "");
    resetButton.classList.remove("play-again");
    resetButton.textContent = "Reset";
    updateMinMaxInputs();
    console.log("Random Number = " + randomNumber);
    console.log("Guess Count = " + guessCount);
    clearInput();
    // focusElement(guessInput);
  }
}
