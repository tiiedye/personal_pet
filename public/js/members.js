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

    $.get("/api/sidekick", function(data) {
      // happinessPoints = 0
      // happinessValue = 4
      // table happinessPoints = 0
      var happinessValue = $(this.value);
      var happinessPnts =
        happinessValue + parseInt(data[0].Sidekicks[0].happinessPoints);

      $.ajax({
        type: "PUT",
        url: "/api/sidekick",
        data: { "Sidekicks.happinessPoints": happinessPnts },
      }).then(function() {
        updateImage();
        updateProgress();
      });
    });
  });

  function updateProgress() {
    $.get("/api/sidekick/", function(data) {
      $(".progressBar").attr("value", data[0].Sidekicks[0].happinessPoints);
    });
  }

  //   test jQuery to be deleted later
  $(".update-activity").on("click", function() {
    updateProgress();
  });

  function updateImg() {
    $.get("/api/sidekick", function(data) {
      console.log(data);
      thisId = data[0].Sidekicks[0].UserId;
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
