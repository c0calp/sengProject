const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/static-webiste-with-node/public'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+ '/static-webiste-with-node/public/order.html'));
});

app.listen(port, ()=> {
    console.log("Server is running on "+port)
})
app.post("/send_email", function(req, response){
    var to = req.body.to;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duyicorestaurant@gmail.com',
            pass: 'eiwgicjooapbzgis'
            
        }
    });

    var mailOptions = {
        from: "duyicorestaurant@gmail.com",
        to: to,
        subject: "Your Order",
        text: "Your order has taken place. Thanks for choosing us!"
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log("Email send: " + info.response)
        }
        response.redirect("/")
    });
});

//initialize web server
