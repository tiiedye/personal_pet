var db = require("../models");

module.exports = function(app) {
    app.get("/api/activity", function(req, res) {
        db.User.findAll({
            include: [db.Activity]
        }).then(function(activityGetResult) {
            res.json(activityGetResult)
        })
    })

    app.post("/api/activity", function(req,res) {
        db.Activity.create(req.body).then(function(activityCreateResult){
            res.json(activityCreateResult)
        })
    })

    app.get("/activity", function(req, res) {
        res.render("Activity", { activities: Activity });
      });

    app.delete("/api/activity/:id", function(req,res) {
        db.Activity.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(activityDeleteResult) {
            res.json(activityDeleteResult)
        })
    })

    app.put("/api/activity/:id", function(req, res) {
        db.Activity.update({
            where: {
                id: req.params.id
            }
        }).then(function(activityUpdateResult) {
            res.json(activityUpdateResult);
        })
    })
}