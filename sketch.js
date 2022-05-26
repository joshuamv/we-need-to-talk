// bars //
var driveLevel      = 20;
var stressLevel     = 20;

var currentMemory   = 1;

var videoDuration;
var stressInterval;
var driveInterval;
var checkLevels;

// audio files //
var heartBeat = new Audio('audio/heartBeat.m4a');

var messageSent = new Audio('audio/messageOut.m4a');
var messageRecieved = new Audio('audio/messageIn.m4a');

var breatheIn = new Audio('audio/breatheIn.m4a');
var memoryIn = new Audio('audio/memoryIn.m4a');

var sayItAudio = new Audio('audio/sayIt.m4a');

var earRinging = new Audio('audio/earRinging.mp3');

var suspenseMusic = new Audio('audio/suspense.mp3');
var happyMusic = new Audio('audio/happy.mp3');

$(document).ready(function(){
  //turn subtitles white on hover
  $('#startButton').mouseover(function(){
    $('#subtitle').addClass("whiteSubtitle");
    $('#storyNumber').addClass("whiteSubtitle");    
    $('#subtitle').removeClass("redSubtitle");
    $('#storyNumber').removeClass("redSubtitle");
  });

  //turn subtitles red on mouse leave
  $('#startButton').mouseleave(function(){
    $('#subtitle').addClass("redSubtitle");
    $('#storyNumber').addClass("redSubtitle");    
    $('#subtitle').removeClass("whiteSubtitle");
    $('#storyNumber').removeClass("whiteSubtitle");
  });

  $('#tryAgainPassedOut').click(function(){
    startOver();
  });

  $('#tryAgainNoDrive').click(function(){
    startOver();
  });

  //when start is clicked animate phone entering
  $('#startButton').click(function(){
    heartBeat.play();
    startScreen.setAttribute("style", "opacity: 0;");
    phoneDiv.setAttribute("style", "transform: translateY(0%);");
    currentMemory = 1;
    setTimeout(function () {
      startScreen.setAttribute("style", "display: none;");
    }, 600);

  //after 3 seconds start dialogue
    setTimeout(function () {
      messagesIntro();
      changeDrive(250);
      changeStress(370);
      $("#driveLevel").height(driveLevel);
      $("#driveLevel").css("background-color","#5288fd");
      $("#driveLevel").css("box-shadow","0 5px 20px #5288fd67");

      //bars go up and down every second
      stressInterval =  setInterval(function () {
        ++stressLevel;
        $("#stressLevel").height(stressLevel);
      }, 380);

      driveInterval = setInterval(function () {
        --driveLevel;
        $("#driveLevel").height(driveLevel);
      }, 600);

      heartBeatInterval = setInterval(function () {
        $("#phoneDiv").addClass("phoneHighGlow");
        $("#phoneDiv").removeClass("phoneLowGlow");

        setTimeout(function () {
          $("#phoneDiv").removeClass("phoneHighGlow");
          $("#phoneDiv").addClass("phoneLowGlow");
        }, 1600);
      }, 1050);

      //check levels
      checkLevels = setInterval(function () {
        if (driveLevel<21) {
          clearInterval(driveInterval);
          driveLevel=20;
          $("#driveLevel").height(driveLevel);
          $("#driveLevel").css("background-color","#a8a8a8");
          $("#driveLevel").css("box-shadow","0 5px 20px #7f7f7f75");
          $("#stressLevel").css("background-color","#a8a8a8");
          $("#stressLevel").css("box-shadow","0 5px 20px #7f7f7f75");
          setTimeout(function () {
            clearInterval(stressInterval);
            stressLevel=20;
            $("#stressLevel").height(stressLevel);
          }, 200);
          noDrive();
        }

        if (driveLevel>499) {
          driveLevel=500;
          $("#driveLevel").height(driveLevel);
        }

        if (stressLevel > 100) {
          $("#stressLevel").css("background-color","#ff0909");
          $("#stressLevel").css("box-shadow","0 5px 20px #ff090975");
        }
        if (stressLevel < 101) {
          $("#stressLevel").css("background-color","#a8a8a8");
          $("#stressLevel").css("box-shadow","0 5px 20px #7f7f7f75");
        }

        if (stressLevel > 400) {
          //make stress bar glow red
          $("#stressBar").css("background-color","#ff090950");
          $("#stressBar").css("box-shadow","0 0px 30px #ff090935");
        }

        if (stressLevel > 450) {
          //make stress bar glow redder
          $("#stressBar").css("background-color","#ff090990");
          $("#stressBar").css("box-shadow","0 0px 100px #ff090990");
        }

        if (stressLevel < 399) {
          //take stress bar back to normal color
          $("#stressBar").css("background-color","#00000010");
          $("#stressBar").css("box-shadow","0 5px 5px #00000000");
        }

        if (stressLevel > 499) {

          clearInterval(stressInterval);
          $("#stressLevel").css("background-color","#ff0909");
          $("#stressLevel").css("box-shadow","0 5px 20px #ff090975");

          driveLevel=25;
          $("#driveLevel").height(driveLevel);
          $("#driveLevel").css("background-color","#a8a8a8");
          $("#driveLevel").css("box-shadow","0 5px 20px #7f7f7f75");
          
          stressLevel=500;
          $("#stressLevel").height(stressLevel);

          setTimeout(function () {
            //show passing out screen
            passedOut();
            clearInterval(checkLevels);
          }, 1200);
        }
      }, 200);

    }, 1000);

  });

  $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);

  $("#driveLevel").height(driveLevel);
  $("#stressLevel").height(stressLevel);

});

function changeDrive(level) {
  driveLevel = level;
  $("#driveLevel").height(driveLevel);
}

function changeStress(level) {
  stressLevel = level;
  $("#stressLevel").height(stressLevel);
}

function addDrive(level) {
  driveLevel = driveLevel + level;
  $("#driveLevel").height(driveLevel);
}

function addStress(level) {
  stressLevel = stressLevel + level;
  $("#stressLevel").height(stressLevel);
}

// // mute button click //
// muteBtn.addEventListener("click", function(event) {
//   audioBackground.pause();
//   unmuteBtn.setAttribute("style", "display: flex;");
//   muteBtn.setAttribute("style", "display: none;");
// });

// unmuteBtn.addEventListener("click", function(event) {
//   audioBackground.play();
//   muteBtn.setAttribute("style", "display: flex;");
//   unmuteBtn.setAttribute("style", "display: none;");
// });

function messagesIntro() {
  setTimeout(function () {
    $('#todayDivider').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  }, 0100);

  setTimeout(function () {
    $('#message1').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 0100);

  setTimeout(function () {
    $('#message1').removeClass("lowerMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  }, 2000);

  setTimeout(function () {
    $('#message2').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 3000);

  setTimeout(function () {
    $('#message3').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 5000);

  setTimeout(function () {
    $('#message4').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 8000);

  setTimeout(function () {
    $('#message5').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();

  }, 10000);

  setTimeout(function () {
    //show breathe button
    opacityFun("#stressContainer", "1");
    $('#stressButton').click(function(){
      breatheFun();
    });

    $('#memoryButton').click(function(){

      if (currentMemory < 5) {
        memoryFun(currentMemory);
        return;
      }else{
        console.log("over 5")
        return;
      }
    });
  }, 10800);

}

function noDrive() {
  setTimeout(function () {
    $('#gameover1').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 1000);

  setTimeout(function () {
    $('#gameover2').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 3000);

  setTimeout(function () {
    $('#gameover3').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 5000);

  setTimeout(function () {
    $('#gameover4').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 7000);

  setTimeout(function () {
    $('#gameover5').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 8500);

  setTimeout(function () {
    noDriveGameover();
  }, 12000);

}

function opacityFun(id, opacity) {
  $(id).css("opacity", opacity);
}

function breatheFun() {
  breatheIn.play();
  addDrive(-5);
  if (stressLevel > 100) {
    addStress(-200);
  }
  opacityFun("#tutorial1", 0);
  setTimeout(function () {
    opacityFun("#memoryContainer", 1);
  }, 1500);
}

function memoryFun(memoryNumber) {
  playMemory(memoryNumber);
  setTimeout(function () {
    addStress(5);
    if (driveLevel < 500) {
      addDrive(60);
    }
    opacityFun("#tutorial2", 0);    
  }, videoDuration+100);
}

function playMemory(memoryNumber) {
  memoryIn.play();

  $('#memory' + memoryNumber).removeClass("hideVideo");
  $('#memory' + memoryNumber).addClass("showVideo");  
  $('#memory' + memoryNumber).get(0).play();
  videoDuration = ($('#memory' + memoryNumber).get(0).duration)*1000;

  $('#memoryScreen').css("height", "0vh");
  $('#memoryScreen').addClass("overlayScreen");
  $('#memoryScreen').removeClass("overlayScreenHidden");

  setTimeout(function () {
    $('#memoryScreen').css("height", "103vh");
  }, 10);

  //hide memory screen after memory video stops playing
  setTimeout(function () {
    //hide all videos
    $('#memoryScreen').css("height", "0vh");
    setTimeout(function () {
      $('#memoryScreen').addClass("overlayScreenHidden");
      $('#memoryScreen').removeClass("overlayScreen");

      $('#memory1').removeClass("showVideo");
      $('#memory1').addClass("hideVideo");
      $('#memory2').removeClass("showVideo");
      $('#memory2').addClass("hideVideo");
      $('#memory3').removeClass("showVideo");
      $('#memory3').addClass("hideVideo");
      $('#memory4').removeClass("showVideo");
      $('#memory4').addClass("hideVideo");
      $('#memory5').removeClass("showVideo");
      $('#memory5').addClass("hideVideo");
      $('#memory6').removeClass("showVideo");
      $('#memory6').addClass("hideVideo");
      ++currentMemory;
      console.log(currentMemory);

      if (currentMemory === 2) {
        messages2();
        console.log(currentMemory + "messages");
        return;
      }

      if (currentMemory === 3) {
        messages3();
        console.log(currentMemory + "messages");
        return;
      }

      if (currentMemory === 4) {
        messages4();
        console.log(currentMemory + "messages");
        return;
      }

      if (currentMemory === 5) {
        messages5();
        console.log(currentMemory + "messages");
        $('#memoryButton').click(function(){
          gameWon();
          sayItAudio.play();
          console.log("game won ran");
          return;
        });
      }

      if (currentMemory > 5) {
        return;
      }
    }, 600);

  }, videoDuration - 600);
}

function messages2() {
  setTimeout(function () {
    $('#message6').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 100);
}

function messages3() {
  setTimeout(function () {
    $('#message7').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 100);
}

function messages4() {
  setTimeout(function () {
    $('#message8').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 100);
}

function messages5() {
  sayIt();
  setTimeout(function () {
    $('#message9').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 100);

  setTimeout(function () {
    $('#message10').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
  }, 2000);
}

function gameWonMessages() {
  setTimeout(function () {
    $('#gamewon1').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 100);

  setTimeout(function () {
    $('#gamewon2').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 2000);

  setTimeout(function () {
    $('#gamewon3').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageRecieved.play();
    earRinging.play();
  }, 4400);

  setTimeout(function () {
    $('#gamewon4').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    messageSent.play();
  }, 7000);

  setTimeout(function () {
    $('#gamewon5').removeClass("hiddenMessage");
    messageRecieved.play();
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);

    //passout
    $('#passedOutScreenWon').css("opacity", "0");
    $('#passedOutScreenWon').addClass("overlayScreen");
    $('#passedOutScreenWon').removeClass("overlayScreenHidden");
    setTimeout(function () {
      $('#passedOutScreenWon').css("opacity", "1");
    }, 500);

    setTimeout(function () {
      $('#passedOutScreenWon').css("opacity", "1");
      phoneDiv.setAttribute("style", "transform: translateY(5%);");
      //hide bars
      $('#driveBarContainer').css("display", "none");
      $('#stressBarContainer').css("display", "none");
    }, 5800);

  }, 9900);
}

function loveMessageIn() {
  //come back from passing out
  $('#passedOutScreenWon').css("opacity", "1");
  setTimeout(function () {
    $('#passedOutScreenWon').css("opacity", "0");
  }, 100);
  setTimeout(function () {
    $('#passedOutScreenWon').removeClass("overlayScreen");
    $('#passedOutScreenWon').addClass("overlayScreenHidden");
  }, 500);
}

function endingMessages() {
  setTimeout(function () {
    $('#ending1').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    clearInterval(heartBeatInterval);

    setTimeout(function () {
      messageRecieved.play();
    }, 100);
    setTimeout(function () {
      $('#notificationIn').removeClass("notificationHide");
      $('#notificationIn').addClass("notificationShow");
    }, 400);

    suspenseMusic.pause();
    heartBeat.pause();
    earRinging.pause();
  }, 100);

  setTimeout(function () {
    $('#ending2').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    $('#phoneDiv').removeClass("phoneFastTransition");
    $('#phoneDiv').addClass("phoneSlowTransition");
    phoneDiv.setAttribute("style", "transform: translateY(0%);");
    loveMessageIn();
    messageRecieved.play();
  }, 2200);

  setTimeout(function () {
    $('#loveText').css("background-color", "#FFC0CB");
    $("#loveText").css("box-shadow","0 5px 20px #ff98c55c");
    messageRecieved.play();
    happyMusic.play();
    $('#ending3').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    setTimeout(function () {
      pinkScreen();
    }, 8000);
  }, 4000);
}



function gameWon() {
  //hide buttons
  $('#memoryContainer').css("display", "none");
  $('#stressContainer').css("display", "none");
  //stop stress and drive from changing
  clearInterval(stressInterval);
  clearInterval(driveInterval);
  driveLevel = 480;
  stressLevel = 480;
  $("#stressLevel").height(stressLevel);
  $("#driveLevel").height(driveLevel);
  //coming out
  suspenseMusic.play();
  gameWonMessages();
  //shock state

  //acceptance messages
  setTimeout(function () {
    endingMessages();
  }, 18000);
  //fade to pink and photo of hug

}

function pinkScreen() {
  //slowly reveal pink screen
  $('#pinkGameWon').css("display", "flex");
  setTimeout(function () {
    $('#pinkGameWon').css("opacity", "1");
  }, 100);
}

function passedOut() {
  setTimeout(function () {
    $('#message6').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
    earRinging.play();
  }, 100);

  setTimeout(function () {
    $('#message7').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  }, 1500);

  setTimeout(function () {
    $('#message8').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  }, 3000);

  setTimeout(function () {
    $('#message9').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  },4500);

  setTimeout(function () {
    $('#message10').removeClass("hiddenMessage");
    $("#messagesZone").scrollTop($("#messagesZone")[0].scrollHeight);
  },6000);

  setTimeout(function () {
    $('#passedOutScreen').css("opacity", "0");
    $('#passedOutScreen').addClass("overlayScreen");
    $('#passedOutScreen').removeClass("overlayScreenHidden");
  
    setTimeout(function () {
      $('#passedOutScreen').css("opacity", "1");
    }, 10);
    setTimeout(function () {
      $('.noOpacity').css("opacity", "1");
      earRinging.pause();
      heartBeat.pause();
    }, 5000);
  },1000);
}

function noDriveGameover() {
  alert("you gave up");

}

function startOver() {
  //buggy, not working
  $('#passedOutScreen').css("opacity", "0");
  $('#noDriveScreen').css("opacity", "0");
  $('#startScreen').css("opacity", "0");

  phoneDiv.setAttribute("style", "transform: translateY(120%);");

  setTimeout(function () {
    $('#startScreen').css("display", "flex");
    $('#startScreen').css("opacity", "1");
  }, 100);

  setTimeout(function () {
    $('#noOpacity').css("opacity", "0");

    $('#passedOutScreen').addClass("overlayScreenHidden");
    $('#passedOutScreen').removeClass("overlayScreen");
  
    $('#noDriveScreen').addClass("overlayScreenHidden");
    $('#noDriveScreen').removeClass("overlayScreen");
  }, 800);
}


function sayIt() {
  $("#memoryButton").text("Say It");
  $("#memoryText").text("It's time to do it");
}