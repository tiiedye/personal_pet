$(document).ready(() => {

    var thisId;

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  function updateImg() {
    $.get("/api/sidekick", function(data) {
      console.log(data);
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

});
