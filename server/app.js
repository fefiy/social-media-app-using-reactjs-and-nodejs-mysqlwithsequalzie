const express = require("express")
const cors = require("cors")
const multer = require("multer")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const {Products, Reviews, Users, Posts, Comments, Stories, Relationships, Likes} = require("./models")
const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(helmet())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../afr/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  });
const PostRouter = require("./routes/Post")
const productRouter = require("./routes/productRouter")
const authRouter =require("./routes/auth")
const commentrouter = require("./routes/comment")
const likesRouter = require("./routes/likes")
const userRouter = require("./routes/user")
const relashionshiipsRouter = require('./routes/relationships')


const db = require('./models')
app.use('/api/post', PostRouter)
app.use('/api/product', productRouter)
app.use('/api/social' , authRouter)
app.use("/api/comments", commentrouter)
app.use("/api/likes", likesRouter)
app.use("/api/users", userRouter)
app.use("/api/relationships", relashionshiipsRouter)



Products.hasMany(Reviews, {
    foreignKey:"product_id",
    as:"reviews"
})
Reviews.belongsTo(Products,{
    foreignKey:"product_id",
    as:"products"
}) 

Users.hasMany(Posts , {
    foreignKey: "userId",
    as: "posts"
})

Posts.belongsTo(Users,{
    foreignKey: "userId",
    as:"user" 
})

Users.hasMany(Comments , {
    foreignKey: "comentUserId",
    as: "comments"
})
Comments.belongsTo(Users,{
    foreignKey: "comentUserId",
    as:"commentUser" 
})

Posts.hasMany(Comments , {
    foreignKey: "postUserId",
    as: "comments"
})
Comments.belongsTo(Posts,{
    foreignKey: "postUserId",
    as:"postUser" 
})


Users.hasMany(Stories , {
    foreignKey: "storyUserId",
    as: "Stories"
})
Stories.belongsTo(Users,{
    foreignKey: "storyUserId",
    as:"stroyUser" 
})

Users.hasMany(Relationships , {
    foreignKey: "followerUserId",
    as: "follower"
})

Relationships.belongsTo(Users, {
    foreignKey: "followerUserId",
    as: "follower"
})
Users.hasMany(Relationships , {
    foreignKey: "followedUserId",
    as: "followed"
})

Relationships.belongsTo(Users, {
    foreignKey: "followedUserId",
    as: "followed"
})

Users.hasMany(Likes, {
    foreignKey:"likeUserId",
    as:"likes"
})

Likes.belongsTo(Users, {
    foreignKey:"likeUserId",
    as:"likes"
})

Posts.hasMany(Likes,{
    foreignKey:"postId",
    as:"likePost"
})

Likes.belongsTo(Posts, {
    foreignKey:"postId",
    as:"likePost" 
})

db.sequelize.sync().then(() => {
    app.listen (3001, () => {
    console.log("Server running on port 3001");
    });
});




 // "test": {
  //   "username": "root",
  //   "password": "Fefu1234**",
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }