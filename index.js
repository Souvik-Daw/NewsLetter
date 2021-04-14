//Api key -> dd661c2aaaf091f59667335736720cc0-us1
//list id -> 2eb66632b0
const express=require("express");
const bp=require("body-parser");
const bodyParser = require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var fName=req.body.fName;
    var lName=req.body.lName;
    var mail=req.body.email;

    var Data={
        members:[
            {
                email_address:mail,  
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    var jsonData=JSON.stringify(Data);
    const url="https://us1.api.mailchimp.com/3.0/lists/2eb66632b0";
    const options={
        method: "POST",
        auth: "abs:dd661c2aaaf091f59667335736720cc0-us1"
    }
    const request=https.request(url,options,function(response){
        if(response.error_count===0){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

    //console.log(fName+""+lName+""+mail);
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server is up and running!!!...")
})