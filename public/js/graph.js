$(".graph").on("click", function() {
  var happinessValue = $(".progressBar").val();
  // var taskId = $(this).attr("data-id");

  $.post("/api/graph", { happinessPoints: happinessValue }).then(function(
    result
  ) {
    console.log(result);
  });
});

$(".graphProgress").on("click", function() {
  // var taskId = $(this).attr("data-id");

  $.get("/api/graph").then(function(result) {
    console.log(result[0].Graphs);
    var coords = [];
    for (let i = 0; i < result[0].Graphs.length; i++) {
      coords.push({ y: result[0].Graphs[i].happinessPoints });
    }
    if (coords.length < 3) {
      $("#chartContainer").text(
        "Keep up the good work! Remember to choose « Start New Day » at each log-in to save your progress!"
      );
    } else {
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "",
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: coords,
          },
        ],
      });
      chart.render();
    }
  });
});
