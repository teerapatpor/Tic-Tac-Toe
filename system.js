// 3x3 size = 1100

var current = "O";
var everChoose = [];
var position = [];
var check = false;
var count = 0;
var oldHistory = "";
var lock = false;
var replay = [];
function table(number) {
  if (!check) {
    for (var i = 0; i < number; i++) {
      position.push([]);
    }
    check = true;
  }
}
function player(ID) {
  var origin = ID.split(" ");
  var number = document.getElementById("number").value;
  table(number);
  if (!everChoose.includes(ID) && !lock) {
    everChoose.push(ID);
    count++;
    oldHistory =
      oldHistory +
      `<button class="btn btn-secondary" id="history" style="position: absolute;right: 0;margin-right:10px;margin-top:${
        count * 40
      }px" onClick="replayMatch(replay,${count})" >turn: ${count}</button>`;
    document.getElementById("history").innerHTML = oldHistory;
    if (current === "X") {
      replay.push({ position: ID, symbol: "O" });
      position[parseInt(origin[0])][parseInt(origin[1])] = 0;
      draw = `<div style='font-size:${
        700 - (number - 3) * 70
      }%;text-align:center'>O</div>`;
      document.getElementById(`${ID}`).innerHTML = draw;
      current = "O";
      document.getElementById(`turn`).innerHTML = `<div >ตาของผู้เล่น X</div>`;
    } else {
      replay.push({ position: ID, symbol: "X" });
      position[parseInt(origin[0])][parseInt(origin[1])] = 1;
      draw = `<div style='font-size:${
        700 - (number - 3) * 70
      }%;text-align:center'>X</div>`;
      document.getElementById(`${ID}`).innerHTML = draw;
      current = "X";
      document.getElementById(`turn`).innerHTML = `<div >ตาของผู้เล่น O</div>`;
    }
  }
  if (everChoose.length >= 3) {
    var checkEnd = true;
    // horizontal line check-----
    for (var i = 0; i < position.length; i++) {
      for (var j = 0; j < position.length - 1; j++) {
        if (position[i][j] !== position[i][j + 1]) {
          checkEnd = false;
        } else {
          if (position[i][j] === undefined || position[i][j + 1] === undefined)
            checkEnd = false;
        }
      }
      if (checkEnd) {
        if (position[i][j] === 0) {
          document.getElementById("result").innerHTML =
            "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ O ชนะ</label>";
        } else {
          document.getElementById("result").innerHTML =
            "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ X ชนะ</label>";
        }
        window.scrollTo(0, 0);
        lock = true;
        break;
      } else {
        checkEnd = true;
      }
    }
    // ----------------------------
    // vertical line check---------
    var checkCol = true;
    for (var i = 0; i < position.length; i++) {
      if (position[i].length === 0) checkCol = false;
    }
    if (checkCol) {
      for (var i = 0; i < position.length; i++) {
        for (var j = 0; j < position.length - 1; j++) {
          if (position[j][i] !== position[j + 1][i]) {
            checkEnd = false;
          } else {
            if (
              position[j][i] === undefined ||
              position[j + 1][i] === undefined
            )
              checkEnd = false;
          }
        }
        if (checkEnd) {
          if (position[i][j] === 0) {
            document.getElementById("result").innerHTML =
              "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ O ชนะ</label>";
          } else {
            document.getElementById("result").innerHTML =
              "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ X ชนะ</label>";
          }
          window.scrollTo(0, 0);
          lock = true;
          break;
        } else {
          checkEnd = true;
        }
      }
    }
    // ----------------------------
    // cross line left to right check
    for (var i = 0; i < position.length - 1; i++) {
      for (var j = i; j < position.length - 1; j++) {
        if (position[i][j] !== position[i + 1][j + 1]) {
          checkEnd = false;
        } else {
          if (
            position[i][j] === undefined ||
            position[i + 1][j + 1] === undefined
          )
            checkEnd = false;
        }
        break;
      }
    }
    if (checkEnd) {
      if (position[1][1] === 0) {
        document.getElementById("result").innerHTML =
          "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ O ชนะ</label>";
      } else {
        document.getElementById("result").innerHTML =
          "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ X ชนะ</label>";
      }
      window.scrollTo(0, 0);
      lock = true;
    } else {
      checkEnd = true;
    }
    // ----------------------------
    // cross line right to left check
    for (var i = 0; i < position.length - 1; i++) {
      for (var j = position.length - 1 - i; j >= 0; j--) {
        if (i + j === position.length - 1) {
          if (position[i][j] !== position[i + 1][j - 1]) {
            checkEnd = false;
          } else {
            if (
              position[i][j] === undefined ||
              position[i + 1][j - 1] === undefined
            )
              checkEnd = false;
          }
          break;
        }
      }
    }
    if (checkEnd) {
      if (position[1][1] === 0) {
        document.getElementById("result").innerHTML =
          "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ O ชนะ</label>";
      } else {
        document.getElementById("result").innerHTML =
          "<label class='bg-primary text-white' style='width:30%'>ผู้ใช้ X ชนะ</label>";
      }
      window.scrollTo(0, 0);
      lock = true;
    } else {
      checkEnd = true;
    }
  }
  if (everChoose.length === number * number) {
    document.getElementById("result").innerHTML =
      "<label class='bg-primary text-white' style='width:30%'>เสมอ</label>";
  }
}

// replay
function replayMatch(data, val) {
  var number = document.getElementById("number").value;
  if (count !== number * number && !lock) {
    alert("ต้องเล่นให้จบถึงจะดูประวัติได้");
  } else {
    for (var i = 0; i < number; i++) {
      for (var j = 0; j < number; j++) {
        document.getElementById(`${i} ${j}`).innerHTML = "";
      }
    }
    for (var i = 0; i < val; i++) {
      if (data[i].symbol === "X") {
        document.getElementById(
          `${data[i].position}`
        ).innerHTML = `<div style='font-size:${
          700 - (number - 3) * 70
        }%;text-align:center'>X</div>`;
      } else {
        document.getElementById(
          `${data[i].position}`
        ).innerHTML = `<div style='font-size:${
          700 - (number - 3) * 70
        }%;text-align:center'>O</div>`;
      }
    }
  }
}
