
$(document).ready(() => {

    var thisId;

    console.log("member's script is loaded");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $(".complete").on("click", function(event) {
        event.preventDefault();
        
        $.get("/api/sidekick", function(data) {
            var happinessValue = $(this.value);
            var happinessPnts = happinessValue + parseInt(data[0].Sidekicks[0].happinessPoints);
        }).then(function() {
        $.ajax({
            type: "PUT",
            url: "/api/sidekick",
            data: { 'Sidekicks.happinessPoints': happinessPnts }
        })

            updateImage();
            updateProgress();
        })
    });

    function updateProgress() {
        $.get("/api/sidekick/", function(data) {
            $(".progressBar").attr("value", 65);
        })
    }

    //   test jQuery to be deleted later
    $(".update-activity").on("click", function() {
        updateProgress();
    })

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

  let activities = [];
        let category = $("#selectCategory option:selected").text();
        // let difficulty = $(".form-check-input:checked").val();
        const activityname = $("#addActivity");

        $("#savenewtask").on("click", function (event) {
            event.preventDefault();
            const activityData = {
                activityName: activityname.val().trim(),
                priority: $(".form-check-input:checked").val(),
                category: category
            }

            console.log("********",activityData);

            createActivity(activityData);
        });

        function getUser(email) {
            $.get("/api/users", function(data) {
                
            })
        }

        function createActivity(activityObj){
            $.post("/api/activity", activityObj).done(function (data){
                console.log("post was successful!", data);
            });
            
            //$.post("/api/activity", function(data){
            //    alert("success");
            //}).then(function () {
            //    console.log("new activity added: " + activityData);
            //});
        }

});


