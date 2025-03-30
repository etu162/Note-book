const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extened:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    })
})

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){//utf-8 use hoy english a read hote
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
})

app.post('/create',function(req,res){
 fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
res.redirect("/")  // file create hotei abr create theke / te chole asbe 
 })
})
app.listen(3000);