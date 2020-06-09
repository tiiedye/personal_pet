var db = require("../models");

module.exports = function(app) {

    app.get("/api/graph", function(req, res) {
        db.User.findAll({
            include: [db.Graph]
        }).then(function(graphGetResults) {
            res.json(graphGetResults)
        })
    })
    
    app.post("/api/graph", function(req, res) {
        db.Graph.create(req.body).then(function(graphCreateResult) {
            res.json(graphCreateResult)
        })
    })


}