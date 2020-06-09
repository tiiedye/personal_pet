$(document).ready(() => {

    var thisId;
  
  
      console.log("member's script is loaded");
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.email);
    });
  
    function sidekickName() {
        $.get("/api/sidekick").then((data) => {
  
            $(".sidekickName").html(data[0].Sidekicks[0].sidekickName);
        })
    }
    sidekickName();
  
          
      $(".complete").on("click", function(event) {
          event.preventDefault();
          var happinessValue = $(this).attr("data-value");
          var taskId = $(this).attr("data-id");
          $.get("/api/sidekick", function(data) {
              var happinessPnts = parseInt(happinessValue) + parseInt(data[0].Sidekicks[0].happinessPoints);
                  $.ajax({
                      type: "PUT",
                      url: "/api/sidekick",
                      data: { 'id': taskId, 'happinessPnts': happinessPnts }
                  }).then(function() {
                      updateImg();
                      updateProgress();
                  });
          });
      });
  
      function updateProgress() {
          $.get("/api/sidekick/", function(data) {
              $(".progressBar").attr("value", data[0].Sidekicks[0].happinessPoints);
  
          })
      
      };
  
  
      function updateImg() {
          $.get("/api/sidekick", function(data) {
            console.log(data);
      
              //gets userId so that activities can be user specific
              thisId = data[0].Sidekicks[0].UserId
      
              if (data[0].Sidekicks[0].sidekickImage === "dog") {
                  if (data[0].Sidekicks[0].happinessPoints < 30) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Alert.png'>");
                  } else if (data[0].Sidekicks[0].happinessPoints > 60) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Happy.png'>");
                  } else {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Neutral.png'>");
                  }
              } else if (data[0].Sidekicks[0].sidekickImage === "cat") {
                  if (data[0].Sidekicks[0].happinessPoints < 30) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Alert.png'>");
                  } else if (data[0].Sidekicks[0].happinessPoints > 60) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Happy.png'>");
                  } else {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Neutral.png'>");
                  }
              }
          });
      }
  
    updateImg();
  
      var startDay= ["Good Morning!!, Its a new day to be your best self", "Daily Reminder: You are amazing and there is nothing you can't do", "Its time to wake up and be great once again!!", "Sun is up and so are you, do what you can today, everything counts!!", "Stretch and get up, you can do anything you put your mind to!!", "You're awake!, remember everyday can be a great day!"]
      var endDay= ["Great Job Today!!", "You accomplished so much today, be proud of yourself!", "Time to rest, Put your mind at ease and get excited for tomorrow", "Pat yourself on the back, you did amazing today", "You did fantastic, time to sleep and get ready for a brand new day!", "You deserve the rest, another day of taking care of the most important person in your life, YOU!!"]
      var endQuote = Math.floor(Math.random() * endDay.length);
      var startQuote = Math.floor(Math.random() * startDay.length);
  
      function updateQuote() {
          $(".quote").html(endDay[endQuote]);
      }
  
      updateQuote();
  
      $(".resetDay").on("click", function() {
          $.get("/api/sidekick", function(data) {
              var currentPoints = data[0].Sidekicks[0].happinessPoints;
              var userId = data[0].id
  
              var resetPoints = (parseInt(currentPoints) * 0);
                  $.ajax({
                      type: "PUT",
                      url: "/api/sidekick",
                      data: { 'id': userId, 'happinessPnts': resetPoints}
                  }).then(function() {
                      updateImg();
                      updateProgress();
                  });
          });
      });
  });
