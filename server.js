var express = require('express');
var request =require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post("/api", function(req, res) {
	
        console.log(req.body.name);
        var options={
            uri: "http://nagarjunauniversity.ac.in/mca5semresa.php",
            method: "POST",
            form: {
                
                hno:req.body.name,
				"Submit":"Submit",
				cat:"",
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': 15,
                'Referer':'http://nagarjunauniversity.ac.in/mca5semresa.php'
            },
            
        };
        
        request(options, function(error, response, body) {
            
           var x=body.indexOf('<table id="prn" width="98%" align="center" cellpadding="2" cellspacing="2">');
           console.log(x);
           if(x!=-1){
	           	body=body.slice(x,body.length);
	            x=body.indexOf('</table>');
	            if(x!=-1){
		            body=body.slice(0,x+8);
		            //console.log(body);
		            body=body.toString();
		            body=body.replace(/[\r\n\t]/g,'');
		            //console.log(body);
		            body=body.replace('<table id="prn" width="98%" align="center" cellpadding="2" cellspacing="2">','<table class="table table-responsive">');
                    body=body.replace(/<td height="25" bgcolor="#EBF3FC">/g,'<td>');
                    body=body.replace(/<td bgcolor="#EBF3FC">/g,'<td>');
                    body=body.replace(/<td height="25" colspan="2" bgcolor="#D2E4F9">/g,'<td>');
                    body=body.replace('<td>&nbsp;</td>','');
                    body=body.replace('<table width="50%" border="0" align="center" cellpadding="2" cellspacing="2" bgcolor="#000066">','<table class="table table-responsive" border="0">');
                    body=body.replace(/<tr bgcolor="#D2E4F9">/g,'');
                    body=body.replace('<td width="64%" bgcolor="#EBF3FC"></td>','');
                     body=body.replace('<td width="36%" height="25" bgcolor="#EBF3FC"><div align="right"><strong></strong></div>','');
                     body=body.replace(/<tr bgcolor="#CCCCCC">/g,'');
                       
		            body=body.replace(/<td bgcolor="#EBF3FC" class="style54">/g,'<td>');
	              	//console.log(body);
	            }
            }
             // x=removeRows(body,req.body.name1)
            //     x=removeRows(body,req.body.name1)
            //     body=body.replace('<table class="result-forms"','<table class="table table-condensed table-hover table-responsive"');
            //     x=removeRows(body,req.body.name1)
            //     body=body.replace(/[\r\n\t]/g,'');
            //     body=body.replace('<table class="result-forms"','<table class="table table-condensed table-hover table-responsive"');
            //     x=removeRows(body,req.body.name1)
            //     //console.log(body);
            // if(body && body.indexOf('<table class="result-forms" id="companyList"')!=-1){
            //     var x=body.indexOf('<table class="result-forms" id="companyList"');
            //     body=body.slice(x,body.length);
            //     x=body.indexOf('</table>');
            //     body=body.slice(0,x+8);
            //     //console.log(body);
            
            //     body=body.toString();
            //     body=body.replace(/[\r\n\t]/g,'');
            //     body=body.replace('<table class="result-forms"','<table class="table table-condensed table-hover table-responsive"');
            //     x=removeRows(body,req.body.name1)
            //     if(x.search('</table>')!=-1){
            //         res.json(x);
            //     }else{
            //         res.json('<span><i class="fa fa-check-circle fa-2x" style="color:green"></i>&nbsp;</span><h1 style="color: green">Congratulations...!</h1><h3>Entered Company/LLP name does not exists.</h3>');
            //     }
            // }else{
            //     res.json('<span><i class="fa fa-check-circle fa-2x" style="color:green"></i>&nbsp;</span><h1 style="color: green">Congratulations...!</h1><h3>Entered Company/LLP name does not exists.</h3>');
             res.send(body);
    
            });
        
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})