var randomNumber,
    clearButton = document.querySelector("#clear-btn"),
    guessButton = document.querySelector("#guess-btn"),
    resetButton = document.querySelector("#reset-btn"),
    messageBefore = document.querySelector("#message-before"),
    messageAfter = document.querySelector("#message-after"),
    guessInput = document.querySelector("#guess-input"),
    guessedNumberDisplay = document.querySelector("#guessed-number"),
    minNumber = 1,
    maxNumber = 100,
    guessedNumber,
    guessCount = 0;

startGame();



guessInput.addEventListener("input", function(e) { // Validate Input
  var input = e.target;
  // console.log(e);
  console.log("input value = " + input.value);
  console.log("input valueAsNumber = " + input.valueAsNumber);
  if (e.inputType === "deleteContentBackward" && input.value === "") {
    disableButtons();
    guessInput.classList.remove('error');
  } else if (input.valueAsNumber > maxNumber || input.valueAsNumber < minNumber) {
    enableButtons();
    guessButton.classList.add('disabled');
    guessButton.setAttribute("disabled", "");
    guessInput.classList.add('error');
    clearButton.classList.remove('disabled');
  } else {
    enableButtons();
    guessInput.classList.remove('error');
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
  if (guessInput.value !== "") {
    guessInput.value = "";
    disableButtons();
    guessInput.classList.remove('error');
    focusElement(guessInput);
    console.log("========== ALL CLEAR! ==========");

  }
}

function focusElement(el) {
  el.focus();
}

function disableButtons() {
  guessButton.classList.add('disabled');
  guessButton.setAttribute("disabled", "");
  clearButton.classList.add('disabled');
  clearButton.setAttribute("disabled", "");
}

function enableButtons() {
  guessButton.classList.remove('disabled');
  guessButton.removeAttribute("disabled", "");
  clearButton.classList.remove('disabled');
  clearButton.removeAttribute("disabled", "");
}

function updateNumberDisplay() {
  guessedNumberDisplay.textContent = guessInput.valueAsNumber;
}

function compareNumbers() {
  guessedNumber = guessInput.valueAsNumber;
  if (guessButton.classList.value !== "disabled" ) {
    console.log("======= GUESS SUBMISSION =======");
    guessCount++;
    messageBefore.textContent = "Your last guess was"
    if (guessedNumber > randomNumber) {
      updateNumberDisplay()
      if (guessedNumber < randomNumber + 10) {
        messageAfter.textContent = "Too high, but getting warm! Try again."
      } else {
        messageAfter.textContent = "That's too high. Try again."
      }
      focusElement(guessInput);
    } else if (guessedNumber < randomNumber) {
      updateNumberDisplay()
      if (guessedNumber > randomNumber - 10) {
        messageAfter.textContent = "Too low, but getting warm! Try again."
      } else {
        messageAfter.textContent = "That's too low. Try again."
      }
      focusElement(guessInput);
    } else if (guessedNumber === randomNumber) {
      updateNumberDisplay()
      guessedNumberDisplay.classList.add("success")
      guessInput.setAttribute("disabled", "")
      resetButton.textContent = "Play Again";
      if (guessCount > 1) {
        messageAfter.textContent = "BOOM! You got it in " + guessCount + " tries!"
      } else {
        messageAfter.textContent = "Wow, you got it on your first try! Are you sure you're not cheating?"
      }
      resetButton.classList.add("ready")
      focusElement(resetButton);
      console.log("SUCCESS!");
    }
    console.log("Guessed Number = " + guessedNumber);
    console.log("Random Number = " + randomNumber);
    console.log("Guess Count = " + guessCount);
    disableButtons();
    resetButton.classList.remove('disabled');
    resetButton.removeAttribute("disabled", "");
    guessInput.value = "";
  }
}

function startGame() {
  getRandomNumber();
  resetGame();
}

function resetGame() {
  if (guessCount > 0) {
    getRandomNumber();
    console.log("============ RESET =============");
  } else {
    console.log("=========== NEW GAME ===========");
  }
  guessCount = 0;
  resetButton.classList.add('disabled')
  resetButton.setAttribute("disabled", "");
  messageBefore.textContent = "Pick a number from";
  guessedNumberDisplay.textContent = minNumber + "-" + maxNumber;
  messageAfter.innerHTML = "&nbsp";
  guessedNumberDisplay.classList.remove("success");
  guessInput.removeAttribute("disabled", "");
  resetButton.classList.remove("ready");
  resetButton.textContent = "Reset";
  console.log("Random Number = " + randomNumber);
  console.log("Guess Count = " + guessCount);
  clearInput();
  focusElement(guessInput);
}
