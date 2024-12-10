var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var timer = setInterval(main, fps);

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var platform2 = new GameObject();
var platform3 = new GameObject();
var platform4 = new GameObject();
var platform5 = new GameObject();
var platform6 = new GameObject();
var platform7 = new GameObject();
var platform8 = new GameObject();
var platform9 = new GameObject();
var platform10 = new GameObject();
var wall = new GameObject();
var wall2 = new GameObject();
var level = new GameObject();
var pickup = new GameObject();

function main() {
    ctx.clearRect(0, 0, c.width, c.height);
    state();
}

function init() {
    state = menu;
    avatar.color = "red";
    avatar.w = 50;  // Set appropriate size
    avatar.h = 50;
    
    // Add this line to set avatar image


    level.x = 0;
    level.y = 0;

    ground.color = `green`;
    ground.w = 500;
    ground.h = c.height * .25;
    ground.y = c.height - ground.h / 2;
    ground.world = level;

    platform.w = 200;
    platform.h = 34;
    platform.color = `blue`;
    platform.world = level;

    platform2.w = 200;
    platform2.h = 24;
    platform2.color = `red`;
    platform2.world = level;
    platform2.y = 195;

    platform6.w = 500;
    platform6.h = 24;
    platform6.color = `darkblue`;
    platform6.world = level;
    platform6.y=1200;

    platform3.w=210;
platform3.h=24;
platform3.color=`green`;
platform3.world=level;
platform3.y=-85;
platform3.x=445

platform4.w=200;
platform4.h=24;
platform4.color=`yellow`;
platform4.world=level;
platform4.y=-105;
platform4.x=15;

platform5.w=80000;
platform5.h=900;
platform5.color=`red`;
platform5.world=level;
platform5.y=8000;

platform7.w=200;
platform7.h=24;
platform7.color=`green`;
platform7.world=level;
platform7.y=-245;
platform7.x=-400;

    platform8.w = 200;
    platform8.h = 24;
    platform8.color = `blue`;
    platform8.world = level;
    platform8.y = -445;
    platform8.x = -700;

    platform9.w = 200;
    platform9.h = 24;
    platform9.color = `yellow`;
    platform9.world = level;
    platform9.y = -645;
    platform9.x = -1050;

    platform10.w = 200;
    platform10.h = 24;
    platform10.color = `red`;
    platform10.world = level;
    platform10.y = -845;
    platform10.x = -800;

    wall.h = 200;
    wall.w = 34;
    wall.color = `purple`;
    wall.x = 600;
    wall.world = level;

    wall2.h = 200;
    wall2.w = 34;
    wall2.color = `purple`;
    wall2.x = 130;
    wall2.y = -124
    wall2.world = level;

    pickup.w = 50;
    pickup.h = 50;
    pickup.color = "green";
    pickup.world = level;
    pickup.x = platform10.x;
    pickup.y = platform10.y - 30;

}

init();

/*---------------Game Screens (states)----------------*/
function menu() {
        // Draw menu title
        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.fillText("The OG YT Annotated adventure", c.width/2 - 312, c.height/2 - 90);

        // Draw start button
        ctx.fillStyle = "red";
        ctx.fillRect(c.width/2 - 60, c.height/2 + 50, 120, 40);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Start Game", c.width/2 - 53, c.height/2 + 75);

        // Add temporarily to menu function
        console.log("Mouse clicked:", mouse.pressed);
        console.log("Button position:", button.x, button.y);

        if(clicked(button)) {
            state = game;
        }
        
}

function win() {
    // Add debug visualization
    //ctx.strokeStyle = "blue";
    //ctx.strokeRect(pickup.x, pickup.y, pickup.w, pickup.h);
    // ctx.strokeRect(avatar.x, avatar.y, avatar.w, avatar.h);

    if (avatar.overlaps(pickup)) {
        state = win;
        pickup.color = "transparent";
        ctx.fillStyle = "white"; // Changed to white for better visibility
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "black";
        ctx.font = "48px Arial";
        ctx.fillText("You Win!", c.width / 2 - 100, c.height / 2);

        ctx.fillStyle = "red";
        ctx.fillRect(c.width / 2 - 60, c.height / 2 + 50, 120, 40);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Restart?", c.width / 2 - 30, c.height / 2 + 75);
    }
}

function lose() {
    if (state === lose) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "white";
        ctx.font = "48px Arial";
        ctx.fillText("Game Over!", c.width / 2 - 100, c.height / 2);

        ctx.fillStyle = "red";
        ctx.fillRect(c.width / 2 - 60, c.height / 2 + 50, 120, 40);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Restart?", c.width / 2 - 30, c.height / 2 + 75);
    }
}

function game() {
    if (sp == true && avatar.canJump == true) {
        avatar.canJump = false;
        avatar.vy = -25;
    }
    if (w == true && avatar.canJump == true) {
        avatar.canJump = false;
        avatar.vy = -25;
    }
    if (up == true && avatar.canJump == true) {
        avatar.canJump = false;
        avatar.vy = -25;
    }
    if (a == true) {
        avatar.vx += -1;
    }
    if (left == true) {
        avatar.vx += -1;
    }
    if (d == true) {
        avatar.vx += 1;
    }
    if (right == true) {
        avatar.vx += 1;
    }

    avatar.vx *= .85;
    avatar.vy += 1;
    avatar.move();


    //used to move the level. 
    var offset = { x: avatar.vx, y: avatar.vy };

    while (ground.isOverPoint(avatar.bottom())) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform2.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform3.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform4.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform5.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = false;
        state = lose;
    }
    while (platform6.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform7.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform8.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform9.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (platform10.isOverPoint(avatar.bottom()) && avatar.vy >= 0) {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while (wall.isOverPoint(avatar.right()) && avatar.vx >= 0) {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }
    while (wall2.isOverPoint(avatar.left()) && avatar.vx <= 0) {
        avatar.vx = 0;
        avatar.x++;
        offset.x++;
    }

    /*-------Level movement threshold----*/
    if (avatar.x > 500 || avatar.x < 300) {
      //Level movement code
      //level.x -= offset.x;
      //avatar.x -= offset.x;
      //level.y -= offset.y;
      //avatar.y -= offset.y;
    }

    var dx = c.width / 2 - avatar.x;
    var dy = c.height / 2 - avatar.y;

    level.x += dx * .05;
    avatar.x += dx * .05;
    level.y += dy * .15;
    avatar.y += dy * .15;
    //----------------------------

    lose();

    ground.render();
    platform.render();
    platform2.render();
    platform3.render();
    platform4.render();
    platform5.render();
    platform6.render();
    platform7.render();
    platform8.render();
    platform9.render();
    platform10.render();
    wall.render();
    wall2.render();
    avatar.render('ytlogo');
    pickup.render();
    win();
}
c.addEventListener('click', function(e) {
  if (state === lose) {
      let rect = c.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      // Check if click is within restart button bounds
      if (mouseX > c.width / 2 - 60 && mouseX < c.width / 2 + 60 &&
          mouseY > c.height / 2 + 50 && mouseY < c.height / 2 + 90) {
          init();
          state = game;
      }
  }
});

c.addEventListener('click', function(e) {
  if (state === win) {
      let rect = c.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      // Check if click is within restart button bounds
      if (mouseX > c.width / 2 - 60 && mouseX < c.width / 2 + 60 &&
          mouseY > c.height / 2 + 50 && mouseY < c.height / 2 + 90) {
          init();
          state = game;
      }
  }
});
c.addEventListener('click', function(e) {
    if (state === menu) {
        let rect = c.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
  
        // Check if click is within restart button bounds
        if (mouseX > c.width / 2 - 60 && mouseX < c.width / 2 + 60 &&
            mouseY > c.height / 2 + 50 && mouseY < c.height / 2 + 90) {
            init();
            state = game;
        }
    }
  });
