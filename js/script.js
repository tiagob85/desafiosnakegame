/*Variaveis*/
let canvas = document.getElementById("snake");
console.log("Canvas : "+ canvas);
let context = canvas.getContext("2d");
let velocidade = document.getElementById("speed");
let fundo = document.getElementById("container");
let modotheme = document.getElementById("modo");
let titulojogo = document.getElementById("titulojogo");
let labelvelocidade = document.getElementById("labelcontrol");
let colorsnake = "green";
let colorblock = "#0066ff";
let drawFoodColor = "red";

let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

/*desenha o quadro*/
function criarBG() {
    context.fillStyle = colorblock;
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = colorsnake;
        context.fillRect(snake[i].x, snake[i].y, box, box);        
    }
}

function drawFood() {
    context.fillStyle = drawFoodColor;//"red";
    context.fillRect(food.x, food.y, box, box);
}

function setupGame(){
    if (modotheme.value == '0') {
        fundo.style.background = "#cccc00";
        titulojogo.style.color = "black";
        labelvelocidade.style.color = "black";
        colorsnake = "green";
    }else{
        fundo.style.background = "#262626";
        fundo.style.border = "1px solid white";
        titulojogo.style.color = "white";
        labelvelocidade.style.color = "white";
        colorsnake = "#e6e6e6";
        colorblock = "black";
        drawFoodColor = "#4d4d4d";
    }
}

document.addEventListener('keydown',update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right")  snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left")  snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down")  snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (let i = 1 ; i< snake.length; i++){
        if(snake[0].x == snake[i].x &&snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('GAME OVER !!');
            window.location.reload();
        }
    }
    //metodo de carregamento de configurações.
    setupGame();
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, velocidade.value);

