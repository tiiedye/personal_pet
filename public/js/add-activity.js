// ACTIVITIES MODAL

const activityname = $("#addActivity");
let thisId;
//  gets user_data to define thisId
$.get("/api/user_data", function(res) {
  console.log(res);
  thisId = res.id;
  console.log("thisId***", thisId);
});

//  on click savenewtask, activity will be pushed to Activity table db
<<<<<<< HEAD
 $("#savenewtask").on("click", function(event) {
   let category = $("#selectCategory option:selected").text();
   let priority = $(".form-check-input:checked").val();
   event.preventDefault();
   const activityData = {
     activityName: activityname.val().trim(),
     priority: priority,
     category: category,
     UserId: 1
   };
   console.log("********", activityData.UserId);
=======
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
>>>>>>> 2050ce15974375883c1e3e17d972aaeec413cb54

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
}

<<<<<<< HEAD
 //   function getUser(email) {
 //     $.get("/api/users", function(data) {});
 //   }
 //   async function createActivity (activityObj) {
 //     await $.get("/api/users", function(data) {
 //         users = data;
 //         indexNum = (users.length - 1)
 //     });
 //     $.post("/api/activity", {
 //         activityObj,
 //         UserId: users[indexNum].id
 //     }).then(function(data){
 //         console.log("added activity", data);
 //     });
 //   };


//  function deleteActivity(event) {
//   event.stopPropagation();
//   var id = $(this).data("id");
//   $.ajax({
//     method: "DELETE",
//     url: "/api/activity/" + id
//   }).then(function(data){
        // console.log(data)
// });
// }

=======
//$(".delete-activity").on("click", function (event) {
//event.preventDefault();
//let taskid = $(this).data("deletetask");

//$.delete("/api/activity/" + taskid)
//.then(function () {
//console.log("deleted activity id: " + taskid);
//location.reload();
//});
//});
>>>>>>> 2050ce15974375883c1e3e17d972aaeec413cb54
