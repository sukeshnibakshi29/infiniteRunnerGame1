class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    cycle1 = createSprite(100,200);
    cycle2 = createSprite(300,200);
    cycle3 = createSprite(500,200);
    cycle4 = createSprite(700,200);
    cycles = [cycle1,cycle2,cycle3,cycle4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0
      var x = 0
      var y 
   
      for(var plr in allPlayers){
       index = index+1;
       x = x + 200;
       y = displayHeight - allPlayers[plr].distance
       cycles[index-1].x = x
       cycles[index-1].y = y;

        if(index===player.index){
          cycles[index-1].shapeColor="purple"
          camera .position.x=displayWidth/2;
          camera.position.y=cycles[index-1].y 
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
