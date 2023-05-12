const { Likes, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const getLikes = async (req, res) => {
  const postid = req.query.postId;
  // console.log(postid);
  try {
    // const like = await  Likes.findAll({ where: { postId: postid  }}) // tocount how many likes that the ppost get
    const like = await sequelize.query(
      `SELECT likeUserId FROM likes WHERE postId=${postid}`,
      { type: QueryTypes.SELECT }
    );
    // console.log(like);
    res.status(200).json(like.map((like) => like.likeUserId));
  } catch (err) {
    res.json("something went wrong");
  }
};



const addLikes = async (req, res) => {
  const postId = req.query.postId
  
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.json("authentication error");
    
    const like = {
      likeUserId: userInfo.id,
      postId: postId,
    };

    try {
    await Likes.create(like)
    return res.json("post liked")
    } catch (err) {
      res.status(500).json("something went wrong");
    }
  });
};


const deleteLikes = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `DELETE FROM likes WHERE likeUserId = ${userInfo.id} AND postId = ${req.query.postId}`;

  try{
    await Likes.destroy({ where:{likeUserId: userInfo.id, postId:req.query.postId }})
    return res.status(200).json("Post has been disliked.")
  }catch(err){
    return res.status(500).json(err);
  }


    // sequelize.query(q, (err, data) => {
    //   if (err) return res.status(500).json(err);
    //   return res.status(200).json("Post has been disliked.");
    // });
  });
};

module.exports = {
  getLikes,
  addLikes,
  deleteLikes
};
