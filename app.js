const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");
const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
mongoose.connect("mongodb+srv://admin_apratim:Apratim007MongoDB@cluster0.62tn8rp.mongodb.net/blogDB",{useNewUrlParser: true});


let postarr = [];
let postArray =[];
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";
const contactContent = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ";

const postsSchema = {
    Title:String,
    Content:String
};

const Post = mongoose.model('Post',postsSchema);


app.get('/', function (req, res) {
    Post.find({}).then(function(posts){
        res.render('home', { homePara: homeStartingContent,postArr:posts});
    }).catch(function(err){
        console.log(err);
    })
   
   
})


app.get('/contact', function (req, res) {
    res.render('contact', { contactPara: contactContent });
})
app.get('/about', function (req, res) {
    res.render('about', { aboutPara: aboutContent });
})
app.get('/compose', function (req, res) {
    res.render('compose',{});
   
})

app.post('/compose',function(req,res){
   
    const title = req.body.pTitle;
    const content = req.body.pContent;
    const post= new Post({
        Title: title,
        Content:content
    });
    post.save();
    res.redirect('/');
})

app.get('/post/:postId',function(req,res){
    
    Post.findOne({ _id:req.params.postId}).then(function(posts){
        res.render('post',{postNewTitle : posts.Title , postNewContent : posts.Content}); 
    }).catch(function(err){
        console.log(err);
    })
  
})



app.listen(7000, function () {
    console.log("Server is running at port 7000");
})