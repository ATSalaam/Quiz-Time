class Quiz {
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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
  question.hide();
  background("Yellow");
  textSize(30);
  text("Quiz Result", 170, 60)

  Contestant.getContestantInfo();
    if(allContestants !== undefined){
      fill("Blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are highlighted in green color!", 130,230);
      var display_position = 250;
    }
    for(var plr in allContestants){
      display_position+=20;
      var correctAns = "2"
      if (correctAns === allContestants[plr].answer){
        fill("Green")
        text(allContestants[plr].name + ": " + allContestants[plr].answer + " choose the correct answer",150, display_position );
      }else{
      fill("red");
      text(allContestants[plr].name + ": " + allContestants[plr].answer + " choose the wrong answer", 150, display_position);
      }
    }
  }
}
