let canvas = document.getElementById("snake"); //cria a tela para jogar
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //cria a cobra como array, em formas de plano cartesiano para pintar cada coordenada
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

//cria o background do canvas
function backgroundCreator(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box); 
}

//cria a cobra
function snakeCreator(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function foodCreator(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//se algum evento acontecer, chama a função
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(startGame);
            alert('Game Over!');
        }
    }

    backgroundCreator();
    snakeCreator();
    foodCreator();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //tira o ultimo elemento do array
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
    

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
} 

let jogo = setInterval(startGame, 100);
