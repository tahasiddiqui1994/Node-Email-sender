var fs = require('fs');
var path = require('path') ;
module.exports = function(app, transport) {

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/send',function(req,res){

    	req.query.filePath = req.query.filePath.substring(1) ;
    	console.log(req.query.filePath) ;

    	if(req.query.filePath == ''){
			var mailOptions = {
			   	to : req.query.to,
			   	subject : req.query.subject,
			   	text : req.query.text,
			}
    	}
    	else{
			var mailOptions = {
			   	to : req.query.to,
			   	subject : req.query.subject,
			   	text : req.query.text,
			   	attachments : [{
			   		filename : path.basename(req.query.filePath),
			   		path: req.query.filePath
			   	}]
			}
    	}

		console.log(mailOptions);

		transport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(response);
				console.log(error);
				res.end("error");
			}
			else{
				console.log("Message sent: " + response.message);
				res.end("sent");
			}
		});
	});
};