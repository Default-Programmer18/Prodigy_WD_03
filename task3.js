const selectplayer = document.querySelector(".selectplayer"),
  selectXplayer = document.querySelector(".pX"),
  selectOplayer = document.querySelector("#pO"),
  playerboard = document.querySelector(".play-board"),
  cell = document.querySelectorAll(".col"),
  playersx = document.querySelector(".turnx"),
  playerso = document.querySelector(".turno"),
  winner = document.querySelector(".result"),
  wintext = document.querySelector(".win"),
  replaybtn = document.querySelector(".replay"),
  selectHuman=document.querySelector("#human"),
  selectAi=document.querySelector("#AI"),
  selectOpponentscreen=document.querySelector(".selectOpponent");
  var opponent;
var runBot = true,
  playersign;

window.onload = () => {
  for (var i = 0; i < cell.length; i++) {
    cell[i].setAttribute("onclick", "clickedBox(this)");
  }

  selectHuman.onclick = () => {
    opponent="human";
    selectOpponentscreen.classList.add("hide");
    selectplayer.classList.remove("hide")
    
  }
  selectAi.onclick = () => {
    opponent="AI";
    selectOpponentscreen.classList.add("hide");
    selectplayer.classList.remove("hide")
    
  }
  selectXplayer.onclick = () => {
    selectplayer.classList.add("hide");
    playerboard.classList.add("show");
    playersx.setAttribute("class", "turnx active");
    playerso.setAttribute("class", "turno inactive");
  };
  selectOplayer.onclick = () => {
    selectplayer.classList.add("hide");
    playerboard.classList.add("show");

    playerso.setAttribute("class", "turno active ");
    playersx.setAttribute("class", "turnx inactive ");
  };
};


function clickedBox(element) {
  if (playersx.classList.contains("active")) {
    element.innerHTML = "X";

    playersx.setAttribute("class", "turnx inactive ");
    playerso.setAttribute("class", "turno active ");
    element.setAttribute("id", "X");
    playersign = "X";
  } else if (playerso.classList.contains("active")) {
    element.innerHTML = "O";
    playersx.setAttribute("class", "turnx active ");
    playerso.setAttribute("class", "turno inactive ");
    element.setAttribute("id", "O");
    playersign = "O";
  }
  element.style.pointerEvents = "none";
  findWinner();
if(opponent=="AI"){
  let delay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, delay);}
 
}

function bot() {
  if (runBot) {
    let check = [];
    for (var i = 0; i < cell.length; i++) {
      if (cell[i].innerHTML.length == 0) check.push(i);
    }
    let randomBox = check[Math.floor(Math.random() * check.length)];
    if (check.length > 0) {
      if (playersx.classList.contains("active")) {
        cell[randomBox].innerHTML = "X";

        playersx.setAttribute("class", "turnx inactive ");
        playerso.setAttribute("class", "turno active ");

        cell[randomBox].setAttribute("id", "X");
        playersign = "X";
      } else if (playerso.classList.contains("active")) {
        cell[randomBox].innerHTML = "O";
        playersx.setAttribute("class", "turnx active ");
        playerso.setAttribute("class", "turno inactive ");
        cell[randomBox].setAttribute("id", "O");
        playersign = "O";
      }

      cell[randomBox].style.pointerEvents = "none";
      findWinner();
    }
  }
}
function getid(name) {
  return document.querySelector(".c" + name).id;
}
function check(b1, b2, b3, sign) {
  if (
    getid(b1) != null &&
    getid(b2) != null &&
    getid(b3) != null &&
    getid(b1) == sign &&
    getid(b2) == sign &&
    getid(b3) == sign
  )
    return true;
  return false;
}

function findWinner() {
  if (
    check(1, 2, 3, playersign) ||
    check(4, 5, 6, playersign) ||
    check(7, 8, 9, playersign) ||
    check(1, 5, 9, playersign) ||
    check(7, 5, 3, playersign) ||
    check(1, 4, 7, playersign) ||
    check(2, 5, 8, playersign) ||
    check(3, 6, 9, playersign)
  ) {
    runBot = false;

    setTimeout(() => {
      playerboard.classList.remove("show");
      winner.setAttribute("class", "result show");

      wintext.innerHTML = `Player-${playersign} Won...`;
    }, 500);
  }
  else if (
    getid(1) != "" &&
    getid(2) != "" &&
    getid(3) != "" &&
    getid(4) != "" &&
    getid(5) != "" &&
    getid(6) != "" &&
    getid(7) != "" &&
    getid(8) != "" &&
    getid(9) != ""

  ) {

    
    setTimeout(() => {
      playerboard.classList.remove("show");
      winner.setAttribute("class", "result show");

      wintext.innerHTML = "Match Drawn...";
    }, 500);
  }
}
replaybtn.onclick = () => {
  window.location.reload();
};
