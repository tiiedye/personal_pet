var db = require("../models");

module.exports = function(app) {
    app.get("api/activity", function(req, res) {
        db.User.findAll({
            include: [db.Activity]
        }).then(function(activityResult) {
            res.json(activityResult)
        })
    })
}