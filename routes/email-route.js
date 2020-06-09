const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anna.grace.conover@gmail.com',
        pass: 'cogsworth'
    }
});
module.exports = function(app) {
    app.post("/email", (req,res) => {   
        console.log("Data ", req.body);
        const { email } = req.body


        sendMail(email, function(err, data) {
            if (err) {
            res.status(500).json({message: "Internal error"});
            }
            else {
            res.json({ message: "message sent"})
            }
        })
    
    });
}

const sendMail = (email, cb) => {
    var mailOptions = {
        from: 'anna.grace.conover@gmail.com',
        to: email,
        subject: "A friend is inviting you to Self-Care Sidekick",
        html: "<h1>Click here to sign-up!</h1><a>link</a>"
    };
    
    transporter.sendMail(mailOptions, function(error, data) {
        if (error) {
            cb(error, null);
        } else {
            cb(null, data)
        }
    });

}