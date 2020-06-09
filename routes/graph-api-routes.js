var db = require("../models");

module.exports = function(app) {

    app.get("/api/graph", function(req, res) {
        console.log(req.user)
        db.User.findAll({
            where:{
                email: req.user.email
            },
            include: [db.Graph]
        }).then(function(graphGetResults) {
            console.log(graphGetResults)
            res.json(graphGetResults)
        })
    })
    
    app.post("/api/graph", function(req, res) {
        var obj={happinessPoints: req.body.happinessPoints, UserId: req.user.id}
        db.Graph.create(obj).then(function(graphCreateResult) {
            res.json(graphCreateResult)
        })
    })


}