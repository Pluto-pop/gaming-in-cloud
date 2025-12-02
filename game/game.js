// Simple Breakout-style game
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

const P = {
  paddleW: 100, paddleH: 12, paddleY: canvas.height - 40,
  ballR: 8, rows: 5, cols: 9, brickW: 60, brickH: 18, brickPadding: 8
};

let paddleX = (canvas.width - P.paddleW)/2;
let ball = { x: canvas.width/2, y: P.paddleY - 10, vx: 3, vy: -3, r: P.ballR };
let bricks = [];
let left=false,right=false, score=0, lives=3;
const scoreEl = document.getElementById('score');

function initBricks(){
  bricks = [];
  const offsetTop = 40;
  const offsetLeft = (canvas.width - (P.cols * (P.brickW + P.brickPadding) - P.brickPadding))/2;
  for(let r=0;r<P.rows;r++){
    bricks[r] = [];
    for(let c=0;c<P.cols;c++){
      const x = offsetLeft + c*(P.brickW + P.brickPadding);
      const y = offsetTop + r*(P.brickH + P.brickPadding);
      bricks[r][c] = { x, y, status:1 };
    }
  }
}

function resetBall(){
  ball.x = canvas.width/2;
  ball.y = P.paddleY - 10;
  ball.vx = 3 * (Math.random() > 0.5 ? 1 : -1);
  ball.vy = -3;
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // bricks
  for(let r=0;r<P.rows;r++){
    for(let c=0;c<P.cols;c++){
      const b = bricks[r][c];
      if(b.status){
        ctx.fillStyle = `hsl(${r*30 + c*3},70%,50%)`;
        roundRect(ctx, b.x, b.y, P.brickW, P.brickH, 6, true);
      }
    }
  }

  // paddle
  ctx.fillStyle = "#6ee7b7";
  roundRect(ctx, paddleX, P.paddleY, P.paddleW, P.paddleH, 8, true);

  // ball
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
  ctx.fill();

  // HUD
  ctx.fillStyle = "#9aa6b2";
  ctx.font = "14px Arial";
  ctx.fillText("Lives: " + lives, 12, canvas.height - 12);
  ctx.fillText("Score: " + score, canvas.width - 100, canvas.height - 12);
}

function roundRect(ctx,x,y,w,h,r,fill){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
  if(fill) ctx.fill();
  else ctx.stroke();
}

function update(){
  // paddle movement
  if(left) paddleX -= 6;
  if(right) paddleX += 6;
  paddleX = Math.max(0, Math.min(canvas.width - P.paddleW, paddleX));

  // ball movement
  ball.x += ball.vx;
  ball.y += ball.vy;

  // wall collisions
  if(ball.x + ball.r > canvas.width || ball.x - ball.r < 0) ball.vx *= -1;
  if(ball.y - ball.r < 0) ball.vy *= -1;

  // paddle collision
  if(ball.y + ball.r > P.paddleY && ball.x > paddleX && ball.x < paddleX + P.paddleW){
    const hitPos = (ball.x - (paddleX + P.paddleW/2)) / (P.paddleW/2);
    ball.vx = 4 * hitPos;
    ball.vy = -Math.abs(ball.vy);
  }

  // brick collisions
  for(let r=0;r<P.rows;r++){
    for(let c=0;c<P.cols;c++){
      const b = bricks[r][c];
      if(b.status){
        if(ball.x > b.x && ball.x < b.x + P.brickW && ball.y - ball.r < b.y + P.brickH && ball.y + ball.r > b.y){
          ball.vy *= -1;
          b.status = 0;
          score += 10;
        }
      }
    }
  }

  // bottom - lose life
  if(ball.y - ball.r > canvas.height){
    lives--;
    if(lives <= 0){
      alert("Game over! Score: " + score);
      restartGame();
      return;
    } else {
      resetBall();
    }
  }

  // win check
  if(bricks.flat().every(b => b.status === 0)){
    alert("You win! Score: " + score);
    restartGame();
    return;
  }

  scoreEl.textContent = "Score: " + score;
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

function restartGame(){
  lives = 3;
  score = 0;
  initBricks();
  paddleX = (canvas.width - P.paddleW)/2;
  resetBall();
}

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft') left=true;
  if(e.key === 'ArrowRight') right=true;
});
document.addEventListener('keyup', e => {
  if(e.key === 'ArrowLeft') left=false;
  if(e.key === 'ArrowRight') right=false;
});
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  paddleX = Math.max(0, Math.min(canvas.width - P.paddleW, x - P.paddleW/2));
});

document.getElementById('restart').addEventListener('click', restartGame);

initBricks();
resetBall();
loop();
