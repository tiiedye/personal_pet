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
        console.log(email);


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
        attachments: [{
            filename: 'homepageImage.png',
            filePath: (__dirname + '/assets/homepageImage.png'),
            cid: 'uniquelyuniquemisterunique@nodemailer.com' 
        }],
        html: "Embedded image: <img src='cid:uniquelyuniquemisterunique@nodemailer.com'/> <h1>Click here to sign-up!</h1><p><a>link</a></p>",
        // attachments: [{
        //     filename: 'Screen Shot 2020-06-09 at 8.22.04 AM.png',
        //     path: '/path/topublic/assets/Screen Shot 2020-06-09 at 8.22.04 AM.png/file',
        //     cid: 'uniquelyuniquemisterunique@nodemailer.com' 
        // }]
    };
    
    transporter.sendMail(mailOptions, function(error, data) {
        if (error) {
            cb(error, null);
        } else {
            cb(null, data)
        }
    });

}