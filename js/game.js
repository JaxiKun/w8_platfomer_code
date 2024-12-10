
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var platform2 = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var wall2 = new GameObject();
var platforms = []


function init()
{
    state = menu

    avatar.color = `green`;

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width;
    ground.h = c.height*.15;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 200;
    platform.h = 24;
    platform.color = `tan`
    platform.world = level

    platform2.w = 200;
    platform2.h = 24;
    platform2.color = `orange`
    platform2.world = level
    platform2.x = 100
    // platform2.y

    platforms[0] = platform;
    platforms[1] = platform2;




    wall.h = 100;
    wall.w = 34;
    wall.color = `purple`
    wall.x = 700;
    wall.world = level

    
    wall2.h = 50;
    wall2.w = 34;
    wall2.color = `yellow`
    wall2.x = 300;
    wall2.world = level
  
}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{

}
function lose()
{

}

function game()
{
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -45;
    }

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
    }

    avatar.vx *= .85;
    avatar.vy += 1;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom()))
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(platform2.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(wall.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }
    while(wall2.isOverPoint(avatar.left()) && avatar.vx <= 0)
    {
        avatar.vx = 0;
        avatar.x++;
        offset.x++;
    }

    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    //{
        //Level movement code
        //level.x -= offset.x;
        //avatar.x -= offset.x;
        //level.y -= offset.y;
        //avatar.y -= offset.y;
    //}

    //----- Camera Code -----------//
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    
    

    ground.render();
    for(let i = 0; i<platforms.length; i++){
        while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
        {
            avatar.vy = 0;
            avatar.y--;
            offset.y--;
            avatar.canJump = true;
        }
        platforms[i].render();
    }
    platform.render();
    platform2.render()
    wall.render();
    wall2.render();
    avatar.render();
    
}



