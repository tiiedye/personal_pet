 // ACTIVITIES MODAL

 const activityname = $("#addActivity");
 let thisId;

//  on click savenewtask, activity will be pushed to Activity table db
 $("#savenewtask").on("click", function(event) {
   let category = $("#selectCategory option:selected").text();
   let priority = $(".form-check-input:checked").val();
   event.preventDefault();
   const activityData = {
     activityName: activityname.val().trim(),
     priority: priority,
     category: category,
     UserId: thisId
   };
   console.log("********", activityData.UserId);

   createActivity(activityData);
 });

 function createActivity(activityObj) {
     $.post("/api/activity", activityObj).then(function(data){
         console.log("added activity", data);
         $("#savenewtask").attr("data-dismiss", "modal");
     });
 };

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