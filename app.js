const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query = req.body.CityName;
    const apikey = "c7ed11cc1334ced971df5a253dbfc208";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherdesc = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const iconadd = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>the weather is currently " + weatherdesc + "<p>");
            res.write("<h1>The temperature outside is "+temp+" degrees celcius</h1>")
            res.write("<img src = " + iconadd + ">")
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running at 3000");
});

