const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts =[
    {
        id : uuidv4(),
        username : "raman",
        content : " i love coding"
    },
    {
        id : uuidv4(),
        username : "abhishek",
        content : " i love cricket"
    },
    {
        id : uuidv4(),
        username : "aditya",
        content : " i love football"
    },
    {
        id : uuidv4(),
        username : "aman",
        content : " i love chess"
    }
]


app.get('/posts',(req,res)=>{

    res.render("index.ejs",{posts});
   
})

app.get('/posts/new',(req,res)=>{

    res.render("new.ejs",{posts});
})


app.get('/posts/:id',(req,res)=>{

    let {id} = req.params;
    const post =posts.find((p)=>id===p.id);

    if (!(post == undefined)) {
        res.render("show.ejs",{post});
    } else {
        res.render("alert.ejs");
    }
    

})

app.patch('/posts/:id/',(req ,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    const post =posts.find((p)=>id===p.id);
    post.content=newcontent;
     
    res.redirect("/posts");
   
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    const post =posts.find((p)=>id===p.id);
    if (!(post == undefined)) {
        res.render("edit.ejs",{post});
    } else {
        res.render("alert.ejs");
    }
    
});

app.delete('/posts/:id/',(req ,res)=>{
    let {id} = req.params;
    
   posts =posts.filter((p)=>id!==p.id);
   
     
    res.redirect("/posts");
   
})



// app.get('/posts',(req,res)=>{
//     const {username,content} = req.query;
//     posts.push({ id,username,content});

//     res.redirect("/posts");
// })



app.post('/posts',(req,res)=>{
    const {username,content} = req.body;
    let id = uuidv4();
    posts.push({ id,username,content});

    res.redirect("/posts");
})







app.listen(port, ()=>{

console.log(`post is listening : ${port}`);

});