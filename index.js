let inputDir={x:0,y:0};
let foodSound=new Audio("foodSnd.mp3");
let gameOverSound=new Audio("Game_over.mp3");
let snakeMoveSound=new Audio("snakeMove.mp3");
let lastPaintTime=0;
let speed=9;
let score=0;
let snakeArr=[{x:13,y:15}];
food={x:6,y:7};
let highscoreval="";
let highScoreBox=document.getElementById("highScoreBox");
let easyE1=document.getElementById("easy");
let mediumE1=document.getElementById("medium");
let difficultE1=document.getElementById("difficult");




easyE1.onclick=function(){
    speed=5;
    easyE1.style.color="#c69dda";
    easyE1.style.borderBottom="solid 1px #c69dda";
    mediumE1.style="";
    difficultE1.style="";
    main(currentTime);
}
mediumE1.onclick=function(){
    speed=8;
    mediumE1.style.color="#c69dda";
    mediumE1.style.borderBottom="solid 1px #c69dda";
    easyE1.style="";
    difficultE1.style="";
    main(currentTime);
}
difficultE1.onclick=function(){
    speed=13;
    difficultE1.style.color="#c69dda";
    difficultE1.style.borderBottom="solid 1px #c69dda";
    easyE1.style="";
    mediumE1.style="";
    main(currentTime);
}


function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=currentTime;
    gameEngine();
}


function isCollid(snake){
    // if u bump into urself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if you dash to wallss
    if (snake[0].x>=25 || snake[0].x<=0 || snake[0].y>=25 || snake[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine(){
    // if snake collid
    if (isCollid(snakeArr)){
        gameOverSound.play();
        foodSound.pause();
        snakeMoveSound.pause();
        inputDir={x:0,y:0};
        alert("GAME OVER Press enter to play again.");
        snakeArr=[{x:13,y:15}];
        score=0;
    }
    // if you have eaten the food ,regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=5;
        if (score>highscoreval){
            highscoreval =score;
            localStorage.setItem("highScore",JSON.stringify(highscoreval));
            highScoreBox.innerHTML="HighScore: "+highscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=23;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    // snake move
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    // display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeE1=document.createElement("div");
        snakeE1.style.gridRowStart=e.y;
        snakeE1.style.gridColumnStart=e.x;
        if (index===0){
            snakeE1.classList.add("head");
        }else{
            snakeE1.classList.add("snake");
        }
        board.appendChild(snakeE1);
    })
    // display food
    foodE1=document.createElement("div");
    foodE1.style.gridRowStart=food.y;
    foodE1.style.gridColumnStart=food.x;
    foodE1.classList.add("food");
    board.appendChild(foodE1);
}



let highScore=localStorage.getItem("highScore");
if (highScore===null){
    highscoreval=0;
    localStorage.setItem("highScore",JSON.stringify(highscoreval));
}else{
    highscoreval=JSON.parse(highScore);
    highScoreBox.innerHTML="HighScore: "+highScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown",event=>{
    inputDir={x:0,y:1}
    snakeMoveSound.play();
    switch(event.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            // console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            // console.log("ArrowDown")
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            // console.log("ArrowLeft")
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            // console.log("ArrowRight")
            break;
        default:
            break;
    }
})