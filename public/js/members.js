$(document).ready(() => {

    let thisId;
    let sidekickId;
  
  
      console.log("member's script is loaded");
 
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.email);
    });

    updateInfo();

    //this function gets the current user's id and then defines the global variable thisId as the current user's ID
    //Then it grabs the current sidekick's id and stores it in the global variable sidekickID
    //Then it runs the sidekickName function, the updateImg function, and the updateQuote function
    async function updateInfo() {
       await $.get("/api/user_data", function(result) {
            thisId = result.id
        })

        await $.get("/api/sidekick", function(result) {
            for (i = 0; i < result.length; i++) {
                if (result[i].Sidekicks[0].UserId === thisId) {
                    sidekickId = result[i].Sidekicks[0].id
                    console.log(result[i].Sidekicks[0].id)
                    
                }
            }
        })

        sidekickName();
        updateImg();
        updateQuote();
    }

  //This function finds the index number of the userId of the current sidekick to grab the corresponding sidekickName
    function sidekickName() {
            $.get("/api/sidekick").then((data) => {
                var indexNum = data.findIndex(x => x.id === thisId)
                $(".sidekickName").html(data[indexNum].Sidekicks[0].sidekickName);
            });
    }

    //This matches the progress bar to the current happinessPoints
    function updateProgress() {
       $.get("/api/sidekick/").then(function(data) {
            let indexNum = data.findIndex(x => x.id === thisId)
              $(".progressBar").attr("value", data[indexNum].Sidekicks[0].happinessPoints);
  
        }); 
    }
   
  
  //This function finds the index number of the userId of the current sidekick to grab the corresponding sidekickImage
    function updateImg() {
        $.get("/api/sidekick").then(function(data) {
            let indexNum = data.findIndex(x => x.id === thisId)
                if (data[indexNum].Sidekicks[0].sidekickImage === "dog") {
                    if (data[indexNum].Sidekicks[0].happinessPoints < 3) {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Dog-Alert.png'>");
                    } else if (data[indexNum].Sidekicks[0].happinessPoints > 6) {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Dog-Happy.png'>");
                    } else {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Dog-Neutral.png'>");
                    }
                } else if (data[indexNum].Sidekicks[0].sidekickImage === "cat") {
                    if (data[indexNum].Sidekicks[0].happinessPoints < 3) {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Cat-Alert.png'>");
                    } else if (data[indexNum].Sidekicks[0].happinessPoints > 6) {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Cat-Happy.png'>");
                    } else {
                        $(".imgDiv").empty();
                        $(".imgDiv").html("<img src='assets/Cat-Neutral.png'>");
                    }
                }
        });
        
    }
  
    
  //This section of code generates a random message that will be used when the user clicks the New day button
    var startDay= ["Good Morning!!, Its a new day to be your best self", "Daily Reminder: You are amazing and there is nothing you can't do", "Its time to wake up and be great once again!!", "Sun is up and so are you, do what you can today, everything counts!!", "Stretch and get up, you can do anything you put your mind to!!", "You're awake!, remember everyday can be a great day!"]
    var endDay= ["Great Job Today!!", "You accomplished so much today, be proud of yourself!", "Time to rest, Put your mind at ease and get excited for tomorrow", "Pat yourself on the back, you did amazing today", "You did fantastic, time to sleep and get ready for a brand new day!", "You deserve the rest, another day of taking care of the most important person in your life, YOU!!"]
    var endQuote = Math.floor(Math.random() * endDay.length);
    var startQuote = Math.floor(Math.random() * startDay.length);
  
    function updateQuote() {
        $(".quote").html(endDay[endQuote]);
    }
  
    
//This states that when a complete button is clicked the bar increases, and the sidekicks happiness points are updated
//It runs the updateImg and the updateProgress function to do so
    $(".complete").on("click", function(event) {
        event.preventDefault();

        var happinessValue = $(this).attr("data-value");
        var taskId = $(this).attr("data-id");

        console.log(`this is the id ${taskId}`);
        $.get("/api/sidekick", function(data) {
            let indexNum = data.findIndex(x => x.id === thisId)
            console.log(indexNum)
            var happinessPnts = parseInt(happinessValue) + parseInt(data[indexNum].Sidekicks[0].happinessPoints);
                $.ajax({
                    type: "PUT",
                    url: "/api/sidekick",
                    data: { 'id': sidekickId, 'happinessPnts': happinessPnts }
                }).then(function() {
                    updateImg();
                    updateProgress();
                });
        });
    });

  //When the Start a new day button is clicked on, the happiness points are reset to 0.
  //The update image function and update progress function is run
    $(".resetDay").on("click", function() {
  
                  $.ajax({
                      type: "PUT",
                      url: "/api/sidekick",
                      data: { 'id': sidekickId, 'happinessPnts': 0}
                  }).then(function() {
                      updateImg();
                      updateProgress();
                  });
          });
});

