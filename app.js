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
  if (input > maxNumber || maxNumber < input) {
    updateErrorMessage("Minimum cannot be greater than Maximum");
    disableGuessButton();
    minNumber = "!!";
  } else {
    updateErrorMessage("");
    if (isNaN(input)) {
      minNumber = "??";
      disableGuessButton();
    } else {
      minNumber = input;
      getRandomNumber();
      console.log("----------------");
      console.log("Random Number = " + randomNumber);
      console.log("Min = " + minNumber);
      console.log("Max = " + maxNumber);
    }
  }
  updateMessageBefore();
});

maxNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value)
  if (minNumber > input || input < minNumber) {
    updateErrorMessage("Maximum cannot be less than Minimum");
    disableGuessButton();
    maxNumber = "!!";
  } else {
    updateErrorMessage("");
    if (isNaN(input)) {
      maxNumber = "??";
      disableGuessButton();
    } else {
    maxNumber = input;
    getRandomNumber();
    console.log("----------------");
    console.log("Random Number = " + randomNumber);
    console.log("Min = " + minNumber);
    console.log("Max = " + maxNumber);
    }
  }
  updateMessageBefore();
});

guessInput.addEventListener("input", function(e) {
  var inputString = e.target.value;
  var input = parseInt(e.target.value);
  removeAttentionInputs();
  if (e.inputType === "deleteContentBackward" && inputString === "") {
    disableClearButton();
    disableGuessButton();
    updateErrorMessage("");
  } else if (isNaN(minNumber) || isNaN(maxNumber)) {
    disableClearButton();
    disableGuessButton();
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
  resetButton.classList.add('disabled');
  resetButton.setAttribute("disabled", "");
}

function updateNumberDisplay() {
  guessedNumberDisplay.textContent = guessInput.value;
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

function updateMinMaxInputs(min, max) {
  addAttentionInputs();
  minNumberInput.value = min;
  maxNumberInput.value = max;
}

function addAttentionInputs() {
  minNumberInput.classList.add("attention");
  maxNumberInput.classList.add("attention");
}

function removeAttentionInputs() {
minNumberInput.classList.remove("attention");
maxNumberInput.classList.remove("attention");
}

function updateGuessedNumberDisplay(char) {
  guessedNumberDisplay.textContent = char;
}

function updateErrorMessage(message) {
  errorMessage.textContent = message;
}

function makeGameHarder() {
  maxNumber += 10;
  minNumber -= 10;
}

function compareNumbers() {
  guessedNumber = parseInt(guessInput.value);
  if (guessButton.classList.value !== "disabled" ) {
    console.log("======= GUESS SUBMISSION =======");
    guessCount++;
    updateMessageBefore("Your last guess of");
    if (guessedNumber > randomNumber) {
      updateNumberDisplay();
      if (guessedNumber < randomNumber + 10) {
        updateMessageAfter("was too high, but you're getting warm! Try again.");
      } else {
        updateMessageAfter("was too high. Try again.");
      }
      focusElement(guessInput);
    } else if (guessedNumber < randomNumber) {
      updateNumberDisplay();
      if (guessedNumber > randomNumber - 10) {
        updateMessageAfter("was too low, but you're getting warm! Try again.");
      } else {
        updateMessageAfter("was too low. Try again.");
      }
      focusElement(guessInput);
    } else if (guessedNumber === randomNumber) {
      updateNumberDisplay();
      guessedNumberDisplay.classList.add("success");
      guessInput.setAttribute("disabled", "");
      resetButton.textContent = "Play Again";
      if (guessCount > 1) {
        updateMessageBefore("Bo0Oo0M!");
        updateMessageAfter("You got it in " + guessCount + " tries!");
      } else {
        updateMessageBefore("Wow, you got it on your first try!");
        updateMessageAfter("Are you sure you're not cheating?");
      }
      console.log("SUCCESS!!!");
      focusElement(resetButton);
      makeGameHarder();
      resetButton.classList.add("play-again");
      gamesCompleted++;
    }
    console.log("Guessed Number = " + guessedNumber);
    console.log("Random Number = " + randomNumber);
    console.log("Guess Count = " + guessCount);
    console.log("Games Completed = " + gamesCompleted);
    console.log("Min = " + minNumber);
    console.log("Max = " + maxNumber);
    disableClearButton();
    disableGuessButton();
    enableResetButton();
    guessInput.value = "";
  }
}

function resetGame() {
  console.log("======= RESET GAME =======");
  if (gamesCompleted <= 10) {
    updateMinMaxInputs(minNumber, maxNumber);
  } else {
    minNumber = 0;
    maxNumber = 100;
    updateMinMaxInputs(minNumber, maxNumber);
  }
  disableResetButton();
  guessCount = 0;
  getRandomNumber();
  updateMessageBefore();
  updateGuessedNumberDisplay("#");
  updateMessageAfter("clear");
  updateErrorMessage("");
  guessedNumberDisplay.classList.remove("success");
  guessInput.removeAttribute("disabled", "");
  resetButton.classList.remove("play-again");
  resetButton.textContent = "Reset";
  console.log("Random Number = " + randomNumber);
  console.log("Guess Count = " + guessCount);
  console.log("Guess Completed = " + gamesCompleted);
  console.log("Min = " + minNumber);
  console.log("Max = " + maxNumber);
  clearInput();
}
