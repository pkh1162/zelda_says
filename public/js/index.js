$(function(){
    
    
    $('[data-toggle="tooltip"]').tooltip({
  "title" : "Ganondorf taken from http://piq.codeus.net/u/gilamasan",
  "placement" : "auto"
}); 

var myAudio1 = document.getElementById("sound1");
var myAudio2 = document.getElementById("sound2");
var myAudio3 = document.getElementById("sound3");
var myAudio4 = document.getElementById("sound4");
var myAudio5 = document.getElementById("sound5");
var myAudio6 = document.getElementById("sound6");
var myAudio7 = document.getElementById("sound7");

 var buttonColour = {
   "1": ["#000", "red"],
   "2": ["#000", "green"],
   "3": ["#000", "yellow"],
   "4": ["#000", "#E57B28"],
   "5": ["#000", "#9528E5"],
   "6": ["#000", "white"],
   "7": ["#000", "white"]
 }
 
 $("#squares").hide();

 var seqArray = [];
 var choiceArray = [];
 var currentCount = 1;
 var beatButtonPresses = 0;
 var buttonPressCount = 0;
 var inGame = false;

 function getSequence() {
   for (var i = 0; i < 20; i++) {
     var r = Math.floor(Math.random() * 5) + 1;
     seqArray.push(r);
   }

 }

 $(".beat").on("click", function(event) {
   var beatPressed = $(event.target).attr("id").slice(-1);
   if ($(".play").hasClass("playing")) {
     // Don't do anything, as computer running through beat sequence
   } else {
     //Play correct beat.
     choiceArray.push(parseInt(beatPressed));
     getCorrectBeat(beatPressed);
   }

 })

 
 $("#onOff").on("click", function(){
   if ($(".play").hasClass("gameOn")){
     $(".contains").toggleClass("ocarinaState");
     $("#strict").removeClass("strictMode");
     $(".play").removeClass("gameOn");
     clearPicks();
     seqArray=[];
     choiceArray = [];
     beatButtonPresses = 0;
     buttonPressCount = 0;
     inGame = false;
     
   }
   else {
     $(".play").addClass("gameOn");
     $(".contains").toggleClass("ocarinaState");

     seqArray=[];
     choiceArray = [];
     currentCount = 1;
     beatButtonPresses = 0;
     buttonPressCount = 0;
     $(".play").removeClass("playing");
     $("#inputWait").removeClass("waiting");
   }
   
 });
 

 function initialiseNewGame() {
   seqArray = [];
   getSequence();
   //$("#display").html(seqArray); prints sequence to page
   console.log("started");
   playGame(seqArray);

   console.log("finsihed");
 }
 
 
 $("#startGame").on("click", function() { 
   if ($(".play").hasClass("gameOn")){
    if(!inGame){
        inGame = true;
        initialiseNewGame();  
    }
    else{
       
    }
   }
   // $(".play").toggleClass("playing");
 });

$("#strict").on("click", function(){
 
  if ($(".play").hasClass("gameOn")){
    $("#strict").toggleClass("strictMode");
  
  if($(".play").hasClass("strict")){
    $(".play").removeClass("strict");
  }
  else{
    $(".play").addClass("strict");  
  }  
  }
  
  
})

 function playGame(gameSeq) {
   $(".play").addClass("playing");
   var stopper = 0;

   var timer1 = setInterval(function() {
     
    // if (!reset){
        var beat = getCorrectBeat(gameSeq[stopper]);
     //console.log("stopper = " + stopper + "- seq = " + gameSeq[stopper]);

        stopper++;

        if (stopper == currentCount) {
            $(".play").removeClass("playing");
            clearInterval(timer1);
            $("#inputWait").addClass("waiting");

        }  
   //  }
     

   }, 1475)

 }

 function getCorrectBeat(number) {
   if($(".play").hasClass("gameOn")){
     
     if (number == 1) {
     myAudio1.play();
     changeColour("1");
   } else if (number == 2) {
     myAudio2.play();
     changeColour("2");
   } else if (number == 3) {
     myAudio3.play();
     changeColour("3");
   } else if (number == 4) {
     myAudio4.play();
     changeColour("4");
   } else if (number == 5) {
     myAudio5.play();
     changeColour("5");
   } else if (number == 6) {
     myAudio6.play();
     changeColour("6");
   } else if (number == 7) {
     myAudio7.play();
     changeColour("7");
   } else {
     //Do nothing I guess. This situation shouldn't arise anyway.
   }
   if ($("#inputWait").hasClass("waiting")) {
     buttonPressCount++;
     choiceArray.push(number);
     getPlayerInput(number);
   }
     
   }
   
 }

function clearPicks(){
  $("#wrongPick, #rightPick").html("");
}


 function getPlayerInput(number) {
   if (seqArray[beatButtonPresses] != number) {
     console.log("wrong pick");
     clearPicks();
     $("#wrongPick").html("<img class='img-responsive' src='/img/ganondorf.png'/>");
     
     beatButtonPresses = 0;
     buttonPressCount = 0;     
     $("#inputWait").removeClass("waiting");
    
     if ($(".play").hasClass("strict")){
       currentCount = 1;
     }
     playGame(seqArray);

   } else if (seqArray[beatButtonPresses] == number) {
     console.log("right pick");
      clearPicks();
     $("#rightPick").html("<img class='img-responsive' src='/img/link.png'/>");
     beatButtonPresses++;
     
     if (buttonPressCount == currentCount) {
       if(buttonPressCount == 20){
         alert("You won the game");
         
         seqArray = [];
         choiceArray = [];
         beatButtonPresses = 0;
         buttonPressCount = 0;
         currentCount = 1;
         $("#inputWait").removeClass("waiting");         
        // initialiseNewGame();
       }
       else {
       beatButtonPresses = 0;
       buttonPressCount = 0;
       currentCount++;
       $("#inputWait").removeClass("waiting");
       setTimeout(function(){
            playGame(seqArray);    
       }, 500);
         
       }
       
     }

   } else {
     console.log("no idea");
   }

 }



 function changeColour(buttonNumber) {
   var originalColour = buttonColour[buttonNumber][0];
   var highlightedColour = buttonColour[buttonNumber][1];
   setTimeout(function() {
     $("#soundBtn" + buttonNumber).css("background-color", originalColour);
   }, 1350);
   $("#soundBtn" + buttonNumber).css("background-color", highlightedColour);
 }
    
    
    
    
    
    
    
})