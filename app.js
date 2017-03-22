var randomNumber,
  clearButton = document.getElementById("clear-btn"),
  guessButton = document.getElementById("guess-btn"),
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

resetGame();

minNumberInput.addEventListener("input", function(e) {
  var input = parseInt(e.target.value)
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
    disableButton(clearButton);
    disableButton(guessButton);
    updateErrorMessage("");
  } else if (isNaN(minNumber) || isNaN(maxNumber)) {
    disableButton(clearButton);
    disableButton(guessButton);
  } else if (isNaN(input) || input > maxNumber || input < minNumber) {
    enableButton(clearButton);
    disableButton(guessButton);
    updateErrorMessage("Warning: Invalid Input. Pick a number from " + minNumber + " to " + maxNumber + ".");
  } else {
    enableButton(clearButton);
    enableButton(guessButton);
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
  disableButton(clearButton);
  disableButton(guessButton);
  updateErrorMessage("");
  focusElement(guessInput);
  console.log("========== ALL CLEAR! ==========");
}

function focusElement(el) {
  el.focus();
}

function enableButton(button) {
  button.classList.remove('disabled');
  button.removeAttribute("disabled", "");
}

function disableButton(button) {
  button.classList.add('disabled');
  button.setAttribute("disabled", "");
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

function calcGuessAverage(guesses) {
  guessAmounts.push(guesses)
  var total = 0;
  for(var i = 0; i < guessAmounts.length; i++) {
    total += guessAmounts[i];
  }
  averageGuesses = total / guessAmounts.length;
  console.log("Average Guess Amount = " + averageGuesses);
}

function compareNumbers() {
  guessedNumber = parseInt(guessInput.value);
  if (guessButton.classList.value !== "disabled") {
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
      console.log("SUCCESS!!!");
      console.log("Guess Count = " + guessCount);
      console.log("Amount of Guesses = " + guessAmounts);
      updateNumberDisplay();
      calcGuessAverage(guessCount);
      guessedNumberDisplay.classList.add("success");
      guessInput.setAttribute("disabled", "");
      resetButton.textContent = "Play Again";
      if (guessCount > 1) {
        updateMessageBefore("Bo0Oo0M! You got it in " + guessCount + " tries!");
        updateMessageAfter("Avg guess amount: " + averageGuesses);
      } else {
        updateMessageBefore("Wow, you got it on your first try!");
        updateMessageAfter("Are you sure you're not cheating?");
      }
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
    disableButton(clearButton);
    disableButton(guessButton);
    enableButton(resetButton);
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
  disableButton(resetButton);
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
