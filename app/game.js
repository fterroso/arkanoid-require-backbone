/* globals define, document, window */
define(['config', 'jquery', 'backbone'], function (config, $, Backbone) {
  var canvas;
  var ctx;
  var ballRadius;
  var x;
  var y;
  var dx = 2;
  var dy = -2;
  var paddleHeight;
  var paddleWidth;
  var paddleX;
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 5;
  var brickColumnCount = 3;
  var brickWidth;
  var brickHeight;
  var brickPadding;
  var brickOffsetTop;
  var brickOffsetLeft;
  var score;
  var lives;
  var gameover;
  var exitGame;
  var newLive;

  var bricks = [];

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  function collisionDetection() {
    var c;
    var r;
    for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if (config.options.get('soundsOn')) {
              $('#destruction_sound').trigger('play');
            }
            if (score == brickRowCount * brickColumnCount) {
              var playerName = prompt("You Win Dude! Please enter your name", "Player");
              updateScores(playerName, score);
            }
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    var c;
    var r;
    for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
          var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawScore() {
    ctx.font = (canvas.width * 0.03) + "px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, canvas.width * 0.03, canvas.width * 0.04);
  }

  function drawLives() {
    ctx.font = (canvas.width * 0.03) + "px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - (canvas.width * 0.13), canvas.width * 0.04);
  }

  function updateScores(playerName, playerScore) {
    console.log("config scores 1", config.scores.toJSON());
    if (config.scores.length < 5) {
      config.scores.create({
        player: playerName,
        score: playerScore
      });
    } else {
      var lastScore = config.scores.at(4);
      if (lastScore.get('score') < score) {
        config.scores.create({
          player: playerName,
          score: playerScore
        });
        lastScore.destroy();
      } else {
        config.scores.push(lastScore);
      }
    }
    console.log("config scores 2", config.scores.toJSON());

    gameover = true;
  }

  function initGame() {
    gameover = false;
    exitGame = false;
    newLive = false;
    canvas = document.getElementById("canvas_game");
    ctx = canvas.getContext("2d");
    x = canvas.width / 2;
    y = canvas.height - 30;
    score = 0;
    lives = 3;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    brickWidth = canvas.width * 0.15;
    brickHeight = canvas.height * 0.06;
    brickPadding = canvas.width * 0.03;
    brickOffsetTop = canvas.height * 0.09;
    brickOffsetLeft = canvas.width * 0.06;

    paddleHeight = canvas.height * 0.03;
    paddleWidth = canvas.width * 0.15;
    paddleX = (canvas.width - paddleWidth) / 2;

    ballRadius = canvas.width * 0.02;

    dx = 2;
    dy = -2;

    var c;
    var r;
    for (c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: 1
        };
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newLive = false;
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        if (config.options.get('soundsOn')) {
          $('#collision_sound').trigger('play');
        }
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          if (config.options.get('soundsOn')) {
            $('#gameover_sound').trigger('play');
          }
          var playerName = prompt("Sorry Dude! You lost! Please enter your name", "Player");
          updateScores(playerName, score);
        } else {
          newLive = true;
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    if (!gameover && !exitGame) {
      if (newLive) {
        if (config.options.get('soundsOn')) {
          $('#lost_sound').trigger('play');
        }
        window.setTimeout(function () {
          window.requestAnimationFrame(draw);
        }, 800);
      } else {
        window.requestAnimationFrame(draw);
      }
    }else if(gameover){
      Backbone.history.navigate('',true);
    }
  }

  function finishGame(){
    exitGame= true;
  }

  var gameEngine = {
    init: initGame,
    runGame: draw,
    finish: finishGame
  };
  return gameEngine;
});
