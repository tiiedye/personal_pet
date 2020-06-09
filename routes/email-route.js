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
        // attachments: [{
        //     filename: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2197a51-7ffd-4f7a-b307-1c89e78402d9/ddz1tq0-2f3e1a13-e173-4d24-879a-a3d560abd822.png/v1/fill/w_1280,h_608,q_80,strp/screen_shot_2020_06_09_at_8_22_04_am_by_winnieveto_ddz1tq0-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02MDgiLCJwYXRoIjoiXC9mXC9mMjE5N2E1MS03ZmZkLTRmN2EtYjMwNy0xYzg5ZTc4NDAyZDlcL2RkejF0cTAtMmYzZTFhMTMtZTE3My00ZDI0LTg3OWEtYTNkNTYwYWJkODIyLnBuZyIsIndpZHRoIjoiPD0xMjgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.vOkLICa1fN9oU4cDLYCNKJmvvuJWbh4WWcKWHs_BAkw',
        //     cid: 'uniquelyuniquemisterunique@nodemailer.com' 
        // }],
        html: "Make your own Self-Care Sidekick! <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2197a51-7ffd-4f7a-b307-1c89e78402d9/ddz1tq0-2f3e1a13-e173-4d24-879a-a3d560abd822.png/v1/fill/w_1280,h_608,q_80,strp/screen_shot_2020_06_09_at_8_22_04_am_by_winnieveto_ddz1tq0-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02MDgiLCJwYXRoIjoiXC9mXC9mMjE5N2E1MS03ZmZkLTRmN2EtYjMwNy0xYzg5ZTc4NDAyZDlcL2RkejF0cTAtMmYzZTFhMTMtZTE3My00ZDI0LTg3OWEtYTNkNTYwYWJkODIyLnBuZyIsIndpZHRoIjoiPD0xMjgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.vOkLICa1fN9oU4cDLYCNKJmvvuJWbh4WWcKWHs_BAkw'/> <h1>Click here to sign-up!</h1><p><a href = http://personal-pet.herokuapp.com/>Self-Care Sidekick</a></p>",
    };
    
    transporter.sendMail(mailOptions, function(error, data) {
        if (error) {
            cb(error, null);
        } else {
            cb(null, data)
        }
    });

}