class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;


            // Differentiate the main player by printing
            // the name of the player on the basket. 

            if(index === player.index){
                fill("black");
                textSize(25);
                text(allPlayers[plr].name, x-25, y +25);
            }
            fill("white");
        textSize(25);
        text( "1) " + allPlayers.player1.name + ": " + allPlayers.player1.score, 100, 100);
        text( "2) " + allPlayers.player2.name + ": " + allPlayers.player2.score, 100, 200);

        

        }

        

        // Give movements for the players using arrow keys

        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance -= 10;
            player.update();
        }

        // Create and spawn fruits randomly

        if(frameCount % 30 === 0){
            fruits = createSprite(random(100, 1000), 0, 50, 50);
            fruits.velocityY = 7;
            var rand = Math.round((random(1,5)));
            switch(rand){
                case 1 : fruits.addImage("apple", fruit1_img);
                break;
                case 2: fruits.addImage("banana", fruit2_img);
                break;
                case 3: fruits.addImage("melon", fruit3_img);
                break;
                case 4: fruits.addImage("orange", fruit4_img);
                break;
                case 5: fruits.addImage("pineapple", fruit5_img);
                break;

            }
            fruitGroup.add(fruits);
        }

        if(frameCount % 100 === 0){
            bomb = createSprite(random(100,1000),0, 50, 50);
            bomb.addImage("bomb",bombImg);
            bomb.scale = 0.03   ;
            bomb.velocityY = 7;
            bombGroup.add(bomb);
        }

        if(player.index !== null){
            for(var i = 0; i < fruitGroup.length; i++){
                if(fruitGroup.get(i).isTouching(players)){
                    fruitGroup.get(i).destroy();
                    player.score += 1;
                    player.update();
                } 
            }
            
            for(var k = 0; k < bombGroup.length; k++){
                if(bombGroup.get(k).isTouching(players)){
                    if(player.score > 0){
                    bombGroup.get(k).destroy();
                    player.score -= 1;
                    player.update(); 
                }
            }
            }
        }

        if(player.score > 10){
           this.end();
        }
      

        
    }

    end(){
       game.update(2);
       fill("white")
       textSize(50);
       text("Game Over!" ,400, 300);

       fruitsGroup.setVelocityXEach(0);
       bombGroup.setVelocityXEach(0);

       fruitsGroup.setLifetimeEach(-1);
       bombGroup.setLifetimeEach(-1);
       
    }
}