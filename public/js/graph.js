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
    console.log(result);
    var coords = [];
    for (let i = 0; i < result[0].Graphs.length; i++) {
      coords.push({ y: result[0].Graphs[i].happinessPoints });
    }
    if (coords.length < 3) {
      $("#chartContainer").text(
        "Currently not enough data to show progress. Remember to choose « Start New Day » at the beginning of each session to save your progress!"
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
