var randomNumber,
  clearButton = document.getElementById("clear-btn"),
  guessButton = document.getElementById("guess-btn"),
  nextLevelButton = document.getElementById("next-level-btn"),
  resetButton = document.getElementById("reset-btn"),
  messageBefore = document.getElementById("message-before"),
  messageAfter = document.getElementById("message-after"),
  guessInput = document.getElementById("guess-input"),
  guessedNumberDisplay = document.getElementById("guessed-number"),
  errorMessage = document.getElementById("error-message"),
  minNumberInput = document.getElementById("min-number"),
  maxNumberInput = document.getElementById("max-number"),
  minNumber = 0,
  maxNumber = 100,
  guessedNumber,
  guessCount = 0,
  guessAmounts = [],
  averageGuesses = 0,
  gamesCompleted = 0;

startGame();

resetButton.addEventListener("click", function() {
  resetGame();
  focusElement(guessInput);
});

minNumberInput.addEventListener("input", function() {
  if (guessCount > 0 || gamesCompleted > 0) {
    resetGame()
  }
});

maxNumberInput.addEventListener("input", function() {
  if (guessCount > 0 || gamesCompleted > 0) {
    resetGame()
  }
});


minNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value);
  if (gamesCompleted > 0 || guessCount > 0) {
    resetGame();
  }
  if (input > maxNumber || maxNumber < input) {
    updateErrorMessage("Minimum cannot be greater than Maximum");
    disableButton(guessButton);
    minNumber = "!!";
  } else {
    updateErrorMessage("");
    if (isNaN(input)) {
      minNumber = "??";
      disableButton(guessButton);
    } else {
      minNumber = input;
      getRandomNumber();
      console.log("----------------");
      console.error("Random Number = " + randomNumber);
      console.log("Min = " + minNumber);
      console.log("Max = " + maxNumber);
    }
  }
  updateMessageBefore();
});

maxNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value);
  if (gamesCompleted > 0 || guessCount > 0) {
    resetGame();
  }
  if (minNumber > input || input < minNumber) {
    updateErrorMessage("Maximum cannot be less than Minimum");
    disableButton(guessButton);
    maxNumber = "!!";
  } else {
    updateErrorMessage("");
    if (isNaN(input)) {
      maxNumber = "??";
      disableButton(guessButton);
    } else {
      maxNumber = input;
      getRandomNumber();
      console.error("Random Number = " + randomNumber);
      console.log("Min = " + minNumber);
      console.log("Max = " + maxNumber);
    }
  }
  updateMessageBefore();
});

guessInput.addEventListener("focus", function(e) {
  guessInput.classList.remove('input-pulse');
});

guessInput.addEventListener("blur", function(e) {
  if (e.target.value !== "") {
    guessInput.classList.remove('input-pulse');
  } else {
    guessInput.classList.add('input-pulse');
  }
});

guessInput.addEventListener("input", function(e) {
  var inputString = e.target.value;
  var input = parseInt(e.target.value);
  guessInput.classList.remove('input-pulse');
  removeAttentionInputs();
  validateGuessInput(input, inputString, e);
});

guessInput.addEventListener("keyup", function(e) {
  if (e.which === 13) {
    compareNumbers();
  } else if (e.which === 27) {
    if (e.target.value !== "") {
      clearInput();
    }
  }
});

guessButton.addEventListener("click", compareNumbers);

clearButton.addEventListener("click", clearInput);

nextLevelButton.addEventListener("click", nextLevel);

function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * ((maxNumber + 1) - minNumber)) + minNumber;
}

function clearInput() {
  guessInput.value = "";
  disableButton(clearButton);
  disableButton(guessButton);
  updateErrorMessage("");
  focusElement(guessInput);
  console.log("========== ALL CLEAR! ==========");
}

function startGame() {
  resetGame();
  focusElement(guessInput);
}

function focusElement(el) {
  el.focus();
}

function enableButton(button) {
  button.classList.remove('disabled')
  button.removeAttribute("disabled", "");
}

function disableButton(button) {
  button.classList.add('disabled');
  button.setAttribute("disabled", "");
}

function updateNumberDisplay() {
  guessedNumberDisplay.textContent = parseInt(guessInput.value);
}

function updateMessageBefore(message) {
  messageBefore.textContent = message || "Pick a number from " + minNumber + " to " + maxNumber;
}

function updateMessageAfter(message) {
  if (message === "clear") {
    messageAfter.innerHTML = "&nbsp";
  } else {
    messageAfter.innerHTML = message;
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
  if (gamesCompleted > 4) {
    maxNumber += 20;
    minNumber -= 20;
  } else {
    maxNumber += 10;
    minNumber -= 10;
  }
}

function calcGuessAverage(guesses) {
  guessAmounts.push(guesses)
  var total = 0;
  for(var i = 0; i < guessAmounts.length; i++) {
    total += guessAmounts[i];
  }
  averageGuesses = (total / guessAmounts.length).toFixed(2);
  console.info("Average Guess Amount = " + averageGuesses);
}

function validateGuessInput(input, inputString, e) {
  if (e.inputType === "deleteContentBackward" && inputString === "") {
    disableButton(clearButton);
    disableButton(guessButton);
    guessButton.classList.remove("button-pulse");
    updateErrorMessage("");
  } else if (isNaN(minNumber) || isNaN(maxNumber)) {
    disableButton(clearButton);
    disableButton(guessButton);
    guessButton.classList.remove("button-pulse");
  } else if (isNaN(input) || input > maxNumber || input < minNumber) {
    enableButton(clearButton);
    disableButton(guessButton);
    guessButton.classList.remove("button-pulse");
    updateErrorMessage("Warning: Invalid Input. Pick a number from " + minNumber + " to " + maxNumber + ".");
  } else {
    enableButton(clearButton);
    enableButton(guessButton);
    guessButton.classList.add("button-pulse");
    updateErrorMessage("");
  }
}

function compareNumbers() {
  guessedNumber = parseInt(guessInput.value);
  if (guessButton.classList.value !== "disabled") {
    enableButton(resetButton);
    console.log("======= GUESS SUBMISSION =======");
    guessCount++;
    updateMessageBefore("Your last guess of");
    if (guessedNumber > randomNumber) {
      updateNumberDisplay();
      if (guessedNumber < randomNumber + 10) {
        updateMessageAfter("<span>was too high, but you're getting warm!</span><span class='bold-text'> Try again.</span>");
      } else {
        updateMessageAfter("<span>was too high.</span><span class='bold-text'> Try again.</span>");
      }
      focusElement(guessInput);
    } else if (guessedNumber < randomNumber) {
      updateNumberDisplay();
      if (guessedNumber > randomNumber - 10) {
        updateMessageAfter("<span>was too low, but you're getting warm!</span><span class='bold-text'> Try again.</span>");
      } else {
        updateMessageAfter("<span>was too low.</span><span class='bold-text'> Try again.</span>");
      }
      focusElement(guessInput);
    } else if (guessedNumber === randomNumber) {
      updateNumberDisplay();
      calcGuessAverage(guessCount);
      console.debug("SUCCESS!!!");
      console.log("Guess Count = " + guessCount);
      console.log("Amount of Guesses = " + guessAmounts);
      guessedNumberDisplay.classList.add("success");
      guessInput.setAttribute("disabled", "");
      if (guessCount > 1) {
        updateMessageBefore("Bo0Oo0M! You got it in " + guessCount + " tries!");
        updateMessageAfter("Avg guess amount: " + averageGuesses);
      } else {
        updateMessageBefore("Wow, you got it on your first try!");
        updateMessageAfter("Are you sure you're not cheating?");
      }
      nextLevelButton.classList.add("button-pulse");
      gamesCompleted++;
      enableButton(nextLevelButton);
      focusElement(nextLevelButton);
    }
    console.log("Guess Count = " + guessCount);
    console.log("Games Completed = " + gamesCompleted);
    console.error("Random Number = " + randomNumber);
    console.warn("Guessed Number = " + guessedNumber);
    disableButton(clearButton);
    disableButton(guessButton);
    guessButton.classList.remove("button-pulse");
    guessInput.value = "";
  }
}

function nextLevel() {
  console.log("======= NEXT LEVEL =======");
  makeGameHarder();
  updateMinMaxInputs(minNumber, maxNumber);
  disableButton(nextLevelButton);
  guessCount = 0;
  getRandomNumber();
  updateMessageBefore();
  updateGuessedNumberDisplay("Level " + (gamesCompleted + 1));
  updateMessageAfter("clear");
  updateErrorMessage("");
  guessedNumberDisplay.classList.remove("success");
  guessInput.removeAttribute("disabled", "");
  nextLevelButton.classList.remove("button-pulse");
  console.error("Random Number = " + randomNumber);
  console.log("Guess Count = " + guessCount);
  console.log("Guess Completed = " + gamesCompleted);
  console.log("Min = " + minNumber);
  console.log("Max = " + maxNumber);
  clearInput();
}

function resetGame() {
  console.log("======= RESET GAME =======");
  disableButton(resetButton);

  minNumber = 0;
  maxNumber = 100;
  guessCount = 0;
  gamesCompleted = 0;
  guessAmounts = [];
  updateMinMaxInputs(minNumber, maxNumber);
  disableButton(nextLevelButton);
  getRandomNumber();
  updateMessageBefore();
  updateGuessedNumberDisplay("Level " + (gamesCompleted + 1));
  updateMessageAfter("clear");
  updateErrorMessage("");
  guessedNumberDisplay.classList.remove("success");
  guessInput.removeAttribute("disabled", "");
  nextLevelButton.classList.remove("button-pulse");
  console.error("Random Number = " + randomNumber);
  console.log("Guess Count = " + guessCount);
  console.log("Amount of Guesses = " + guessAmounts);
  console.log("Guess Completed = " + gamesCompleted);
  console.log("Min = " + minNumber);
  console.log("Max = " + maxNumber);
}
