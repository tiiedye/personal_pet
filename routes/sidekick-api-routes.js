var db = require("../models");

module.exports = function(app) {
    app.get("/api/sidekick", function(req, res) {
        db.User.findAll({
            include: [db.Sidekick]
        }).then(function(sidekickGetResults) {
            res.json(sidekickGetResults)
        })
    })
    
    app.post("/api/sidekick", function(req, res) {
        db.Sidekick.create(req.body).then(function(sidekickCreateResult) {
            res.json(sidekickCreateResult)
        })
    })

    app.put("/api/sidekick", function(req,res) {
        console.log(req.body)
        db.Sidekick.update({
            happinessPoints: req.body.happinessPnts
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbSidekick) {
            res.json(dbSidekick);
        });
    });
}