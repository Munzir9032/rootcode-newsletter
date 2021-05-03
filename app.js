const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public')); //to include our static files eg:css ,img

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});
app.post('/', (req, res) => {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data);
    const url = " https://us1.api.mailchimp.com/3.0/lists/d089a90bb7";
    const options = {
        method: 'POST',
        auth: "munzir:82788e6fb4102965e6ad25b3ba90a7cf-us1"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
            app.post('/', (requ, resp) => {

            })
        }
        response.on('data', function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function() {
    console.log('listening the port at 3000');
})


//82788e6fb4102965e6ad25b3ba90a7cf-us1


// list id
// d089a90bb7