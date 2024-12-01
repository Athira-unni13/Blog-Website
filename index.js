import bodyParser from "body-parser";
import express from "express";
import {v4 as uuidv4} from "uuid";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
let blogPost =[];

app.get("/", (req,res) =>{
  res.render("index.ejs",{blogPost : blogPost});
})
app.get("/home", (req,res) =>{
  res.render("index.ejs",{blogPost : blogPost});
})
app.get("/create", (req,res) =>{
  res.render("partials/create.ejs");
})
app.post("/submit", (req,res) =>{
  const Btitle = req.body["Title"];
  const Bcontent = req.body["Content"];
 
  blogPost.unshift({id:uuidv4(), title :Btitle,content:Bcontent});
  res.redirect("/home");

})
app.post("/delete:id",(req,res) =>{
  const postid = req.params.id;
  const postindex = blogPost.findIndex(post => post.id === postid);
  blogPost.splice(postindex,1);
  res.redirect("/home");
})
app.post("/blog:id",(req,res) =>{
  const postid = req.params.id;
  const post = blogPost.find(post => postid === post.id);
  if(post){
    res.render("partials/blog.ejs",{post : post});
  }
  else{
    res.status(404).send("Not found");
  }
})
app.get("/blogpost",(req,res) =>{
  res.render("partials/blogpost.ejs");
})
app.post("/edit:id",(req,res) =>{
  const postid = req.params.id;
  const post = blogPost.find(post => post.id === postid);
  if(post){
    res.render("partials/edit.ejs",{post : post});
  }
  else{
    res.status(404).send("Post not found");
  }

})
app.post("/update:id",(req,res)=>{
  const postid = req.params.id;
  const updatedTitle = req.body["Title"];
  const updatedContent = req.body["Content"];
  const postindex = blogPost.findIndex(post => post.id === postid);
  blogPost[postindex].title = updatedTitle;
  blogPost[postindex].content = updatedContent;
  res.redirect("/home");
})
app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
})
