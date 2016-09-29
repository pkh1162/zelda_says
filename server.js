var express = require("express");

var app = express();


app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("index");
})

app.listen(process.env.PORT || 8080, function(){
    console.log("I'm listening");
})