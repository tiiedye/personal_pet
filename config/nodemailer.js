var nodemailer = require('nodemailer');


function passEmail(email, )
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anna.grace.conover@gmail.com',
        pass: 'cogsworth'
    }
});


module.exports = nodemailer;