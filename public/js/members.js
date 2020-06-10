$(document).ready(() => {

    var thisId;
  
  
      console.log("member's script is loaded");
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.email);
    });

    var userId;
    var sidekickId
  
    function sidekickName() {
        $.get("/api/user_data", function(result) {
            userId = (parseInt(result.id) - 1)
            // console.log("this is userId")
            // console.log((parseInt(userId) + 1))
        }).then(
        $.get("/api/sidekick").then((data) => {
                console.log(data[userId]);
                $(".sidekickName").html(data[userId].Sidekicks[0].sidekickName);
            })
        )}
    sidekickName();
  
          
      $(".complete").on("click", function(event) {
          event.preventDefault();
          var happinessValue = $(this).attr("data-value");
          var taskId = $(this).attr("data-id");
          console.log(`this is the id ${taskId}`);
          $(this).addClass("line");

          $.get("/api/user_data", function(result) {
            userId = (parseInt(result.id) - 1)
            sidekickId = parseInt(result.id);
            // console.log("this is userId")
            // console.log((parseInt(userId) + 1))
        }).then(
          $.get("/api/sidekick", function(data) {
              var happinessPnts = parseInt(happinessValue) + parseInt(data[userId].Sidekicks[0].happinessPoints);
                  $.ajax({
                      type: "PUT",
                      url: "/api/sidekick",
                      data: { 'id': sidekickId, 'happinessPnts': happinessPnts }
                  }).then(function() {
                      updateImg();
                      updateProgress();
                  });
          }));
      });

      function updateProgress() {
        $.get("/api/user_data", function(result) {
            userId = (parseInt(result.id) - 1)
            // console.log("this is userId")
            // console.log((parseInt(userId) + 1))
        }).then(
          $.get("/api/sidekick/", function(data) {
              $(".progressBar").attr("value", data[userId].Sidekicks[0].happinessPoints);
  
          }))    
      };

      $.get("/api/user_data", function(result) {
          console.log("this is result")
          console.log(result)
          thisId = result.id
          console.log("this is thisId")
          console.log(thisId)
      })
  
  
      function updateImg() {
        $.get("/api/user_data", function(result) {
            userId = (parseInt(result.id) - 1)
            // console.log("this is userId")
            // console.log((parseInt(userId) + 1))
        }).then(
          $.get("/api/sidekick", function(data) {
            
      
              //gets userId so that activities can be user specific
            //   thisId = data[0].Sidekicks[0].UserId
            // console.log(data);
      
              if (data[userId].Sidekicks[0].sidekickImage === "dog") {
                  if (data[userId].Sidekicks[0].happinessPoints < 3) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Alert.png'>");
                  } else if (data[userId].Sidekicks[0].happinessPoints > 6) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Happy.png'>");
                  } else {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Dog-Neutral.png'>");
                  }
              } else if (data[userId].Sidekicks[0].sidekickImage === "cat") {
                  if (data[userId].Sidekicks[0].happinessPoints < 3) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Alert.png'>");
                  } else if (data[userId].Sidekicks[0].happinessPoints > 6) {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Happy.png'>");
                  } else {
                      $(".imgDiv").empty();
                      $(".imgDiv").html("<img src='assets/Cat-Neutral.png'>");
                  }
              }
          }));
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
        $.get("/api/user_data", function(result) {
            userId = (parseInt(result.id) - 1)
            console.log("this is userId")
            console.log((parseInt(userId) + 1))
        }).then(
          $.get("/api/sidekick", function(data) {
              var currentPoints = data[userId].Sidekicks[0].happinessPoints;
              var idOfUser = data[userId].id

              var resetPoints = (parseInt(currentPoints) * 0);
                  $.ajax({
                      type: "PUT",
                      url: "/api/sidekick",
                      data: { 'id': idOfUser, 'happinessPnts': resetPoints}
                  }).then(function() {
                      updateImg();
                      updateProgress();
                  });
          }));
      });
  });

