const { Posts, sequelize, Users, Relationships } = require("../models");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

const getPost = async (req, res) => {
  const token = req.cookies.accessToken;
  const userId = req.query.userId;
  console.log("userId", userId)
  if (!token) {
    return res.json("user Not logged in");
  }

  jwt.verify(token, "secretkey", async (err, userinfo) => {
    if (err) return res.json("invalid json error");
    try {
      const  posts = await sequelize.query(
          userId === "undefined" ?  `SELECT distinct  p.*, u.user_id AS userId, firstname, profilePic FROM posts AS p JOIN users AS u ON (u.user_id = p.userId)
          LEFT JOIN relationships AS r ON (p.userId = r. followedUserId) WHERE r.followerUserId= ${userinfo.id} OR p.userId =${userinfo.id}
          ORDER BY p.createdAt DESC` : `SELECT distinct  p.*, u.user_id AS userId, firstname, profilePic FROM posts AS p JOIN users AS u ON (u.user_id = p.userId) WHERE p.userId=${userId}`,
          { type: QueryTypes.SELECT }
        );
     
     

      return res.status(200).json(posts);
    } catch (err) {
      if (err) {
        return res.json({ msg: "something went wrong" });
      }
    }
  });
};

const addpost = async (req, res) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(404).json("user is not logged in");
  }
  jwt.verify(token, "secretkey", async (err, userinfo) => {
    if (err) return req.json("authentication Invalid");
    const po = {
      description: req.body.desc,
      img: req.body.img,
      userId: userinfo.id,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      await Posts.create(po);
      return res.status(200).json("posted sucessflly");
    } catch (err) {
      return res.json("something wont wrong");
    }
  });
};
const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    try {
      await Posts.destroy({
        where: { id: req.params.id, userId: userInfo.id },
      });
      return res.status(200).json("Post has been deleted.");
    } catch (err) {
      return res.status(403).json("You can delete only your post");
      console.log(err);
    }

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    // sequelize.query( `DELETE FROM posts WHERE id= ${req.params.id} AND userId = ${userInfo.id}`   , (err, data) => {
    //   if (err) return res.status(500).json(err);
    //   if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
    //   return res.status(403).json("You can delete only your post")
    // });
  });
};
module.exports = {
  getPost,
  addpost,
  deletePost,
};

// try{

//     const posts = await Posts.findAll({
//         include:[{
//             model:Users,
//             as:"use",
//             attributes:["user_id", "firstname"]
//         }],
//         include:[

//         ]
//     })
//    return res.json(posts)
// }
// catch(err){
//     //i also can do return res.json(err)
//     if(err){
//         return res.json({msg: "something went wrong"})
//     }
// }
