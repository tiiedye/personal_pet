// ACTIVITIES MODAL

const activityname = $("#addActivity");
let thisId;
//  gets user_data to define thisId
$.get("/api/user_data", function(res) {
  thisId = res.id;
});

//  on click savenewtask, activity will be pushed to Activity table db
$("#savenewtask").on("click", function(event) {
  let category = $("#selectCategory option:selected").text();
  let priority = $(".form-check-input:checked").val();
  event.preventDefault();
  const activityData = {
    activityName: activityname.val().trim(),
    priority: priority,
    category: category,
    UserId: thisId,
  };
  console.log("********", activityData.UserId);

  createActivity(activityData);
});

//  posts added activity to user
function createActivity(activityObj) {
  $.post("/api/activity", activityObj).then(function(data) {
    console.log("added activity", data);
    $(".add-activity-footer").text("New Activity Saved!");
    // $("#activity-adder").each(function() {
    //   this.reset();
    // });
    location.reload();
  });
};

$(".delete-activity").on("click", function(event) {
  event.preventDefault();
  let activityId = $(this).data("id");
  console.log(activityId);

  deleteActivity(activityId);
});

function deleteActivity(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/activity/" + id
  })
    .then(function() {
      location.reload();
    });
};