var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'selfcaresidekick@yahoo.com',
        pass: 'personal-pet'
    }
});


module.exports = nodemailer;