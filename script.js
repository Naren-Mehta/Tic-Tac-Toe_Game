function startGame() {
  this.disabled = true;
  let users = {
    1: "X",
    2: "O",
  };
  let playerStarted = 1;
  let currentUser = playerStarted;
  let usersSelection = {
    1: "",
    2: "",
  };

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkForTie() {
    if (usersSelection[1].length > 4 || usersSelection[2].length > 4) {
      alert("Match Tied. Please play again!");
      resetAllValues();
    }
  }

  function checkForWinner() {
    return winningCombination.some((combination) => {
      return combination.every((index) => {
        return usersSelection[currentUser].includes(index);
      });
    });
  }

  function resetAllValues() {
    usersSelection[1] = "";
    usersSelection[2] = "";
    playerStarted = playerStarted === 1 ? 2 : 1;

    for (let i = 0; i < 9; i++) {
      document.getElementById("block_" + i).value = "";
      document.getElementById("block_" + i).disabled = false;
    }
  }

  let boxes = document.getElementById("boxes");
  document.getElementById("currentUser").value = users[currentUser];

  boxes.addEventListener("click", (event) => {
    let id = event.target.id;
    let selection = id.split("_");

    if (!event.target.value) {
      document.getElementById(id).value = users[currentUser];
      usersSelection[currentUser] =
        usersSelection[currentUser] + "" + selection[1];

      setTimeout(() => {
        if (checkForWinner()) {
          alert(
            "Congratulations !! Player with " +
              users[currentUser] +
              " Won the match"
          );
          resetAllValues();
        } else {
          checkForTie();
        }

        currentUser = currentUser === 1 ? 2 : 1;
        document.getElementById("currentUser").value = users[currentUser];
      });
    }else{
        alert('Field Already selection. Please select empty box')
    }
  });
}
