const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());


//step 1
const connect = () => {
    return mongoose.connect(" mongodb://127.0.0.1:27017/test");
};

//step 2

// users mongoose
const userSchema = new mongoose.Schema({

    first_name : { type: String , required: true},
    last_name : { type: String , required: false},
    email : { type: String , required: true, unique: true},
    gender : { type: String , required: false , default: 'Male' },
    age : { type: Number , required: true}
}, {
    versionKey : false,
    timestamps : true,
}
);
 
//step 3 
const User = mongoose.model('users' , userSchema);  // collection name , schema name



// post mongooes 

const postSchema = new mongoose.Schema({
    
    title : { type : String , required : true},
    body : { type : String , required : true },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },
    tag_ids : [
             { 
                type : mongoose.Schema.Types.ObjectId,
                ref : 'tags',
                required : true,
            }
        ]
 } , 
{ 
    versionKey : false,
    timestamps : true,
    
}
); 

const Post = mongoose.model( 'posts' , postSchema );

 // comment Mongoose  => Post and comments are one to one relationship 

 const commentSchema = new mongoose.Schema({

    body : { type : String , required : true },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },
    post_id : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'posts', 
        required : true,
    },
 },{
    versionKey : false,
    timestamps : true,
    }
 );

 const Comment = mongoose.model( 'comments' , commentSchema );

 // tag Mongoose => post and tags are on Many to Many Relationship


 const tagSchema = new mongoose.Schema({

    name : { type : String , required : true },

 },
 {
    versionKey : false,
    timestamps : true,
 }
);

 const Tag = mongoose.model( 'tags' , tagSchema ) ;


//------------------- USER CRUD  ----------------------------
 
//post

app.post('/users' , async (req, res) => {
    //thenable

    try {
        const users = await User.create( req.body );
        return res.status( 201 ).send( users ); 
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


// get 

app.get('/users' , async (req, res) => {
    //thenable

    try {
        const users = await User.find().lean().exec();
        return res.status( 201 ).send( users ); 
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});

//get single

app.get('/users/:id' , async (req, res) => {
    //thenable

    let idd = req.params.id

    try {
        const users = await User.findById( idd ).lean().exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


//patch

app.patch('/users/:id' , async (req, res) => {
    //thenable
    let idd =  req.params.id 
    try {
        
        const users = await User.findByIdAndUpdate(idd , req.body , { new : true  } ).exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


// delete users

app.delete('/users/:id' , async (req, res) => {
    //thenable
    let idd =  req.params.id 
    try {
        const users = await User.findByIdAndDelete( idd ).lean().exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});



// ---------------------- TAG CRUD  ----------------------------


app.post('/tags'  , async( req, res) => {

    try{

        const tags = await Tag.create(req.body);
        return res.status(201).send(tags);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/tags' , async( req,res )=> {

    try{

        const tags = await Tag.find().lean().exec();
        return res.send(tags);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/tags/:id' , async( req ,res ) => {
    try{

        const tags = await Tag.findById(req.params.id).lean().exec();
        return res.send(tags);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.patch('/tags/:id' , async( req ,res ) => {
    try{

        const tags = await Tag.findByIdAndUpdate(req.params.id , req.body , { new : true }).lean().exec();
        return res.send(tags);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.delete('/tags/:id' , async( req ,res ) => {
    try{

        const tags = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.send(tags);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})



// --------------------------- POST CRUD  --------------------------


app.post('/posts'  , async( req, res) => {

    try{

        const posts = await Post.create(req.body);
        return res.status(201).send(posts);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/posts' , async( req,res )=> {

    try{

        const posts = await Post.find().lean().exec();
        return res.send(posts);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/posts/:id' , async( req ,res ) => {
    try{

        const posts = await Post.findById(req.params.id).lean().exec();
        return res.send(posts);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.patch('/posts/:id' , async( req ,res ) => {
    try{

        const posts = await Post.findByIdAndUpdate(req.params.id , req.body , { new : true }).lean().exec();
        return res.send(posts);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.delete('/posts/:id' , async( req ,res ) => {
    try{

        const posts = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.send(posts);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})




// ---------------------- COMMENT CRUD ---------------------------------


app.post('/comments'  , async( req, res) => {

    try{

        const comments = await Comment.create(req.body);
        return res.status(201).send( comments );

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/comments' , async( req,res )=> {

    try{

        const comments = await Comment.find().lean().exec();
        return res.send(comments);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
});

app.get('/comments/:id' , async( req ,res ) => {
    try{

        const comments = await Comment.findById(req.params.id).lean().exec();
        return res.send(comments);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.patch('/comments/:id' , async( req ,res ) => {
    try{

        const comments = await Comment.findByIdAndUpdate(req.params.id , req.body , { new : true }).lean().exec();
        return res.send(comments);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})

app.delete('/comments/:id' , async( req ,res ) => {
    try{

        const comments = await Comment.findByIdAndDelete(req.params.id).lean().exec();
        return res.send(comments);

    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' });
    }
})




app.listen(2345, async function () {
    await connect();
    console.log('listening on port 2345')
})