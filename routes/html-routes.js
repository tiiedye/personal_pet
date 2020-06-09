
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("home");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.User.findAll({
      where: {
        email: req.user.email
      },
      include: [db.Sidekick, db.Activity],
    }).then(function(sidekickGetResults) {
      console.log("**************sidekickGetResults[0].dataValues.Activities******************")
      console.log(sidekickGetResults[0].dataValues.Activities);
      // console.log("sidekickGetResults[0].dataValues.Activities[0].activityName************");
      // console.log(sidekickGetResults[0].dataValues.Activities.activityName);
      // console.log("This underneath is .Activities.dataValues", sidekickGetResults[0].Activities.dataValues);
      let activityObject;
      // console.log(sidekickGetResults[0].Activities[0].dataValues)
      if (sidekickGetResults[0].Activities[0] === undefined) {
        console.log("there are no activities");
        activityObject = 0;
      } else {
        console.log("********this***********")
        // console.log(sidekickGetResults[0].dataValues.Activities[0].activityName);
        activityObject = {
          test: sidekickGetResults[0].dataValues.Activities
        }
        console.log("activities has stuff");
      }
      // console.log(activity);
      console.log("************************HELLO WORLD*******************")
      console.log(sidekickGetResults[0].dataValues.Sidekicks[0].dataValues)
      res.render("members", {
        sidekick: sidekickGetResults[0].dataValues.Sidekicks[0].dataValues,
        activityObject,
      });
    });

  });
};

// app.get("/members", isAuthenticated, (req, res) => {
//   db.User.findAll({
//     where: {
//       email: req.user.email
//     },
//     include: [db.Sidekick]
// }).then(function(sidekickGetResults) {
//   console.log(sidekickGetResults[0].dataValues);
//   res.render("members", sidekickGetResults[0].dataValues);
// })
// });

// else {
//   console.log("********this***********")
//   console.log(sidekickGetResults[0].dataValues.Activities[0].activityName);
//   for (i = 0; i < sidekickGetResults.length; i++){
//     activity = {
//       activityName: sidekickGetResults[i].dataValues.Activities[i].activityName
//     };
//   }
//   console.log("activities has stuff");
//   console.log(activity);
// }