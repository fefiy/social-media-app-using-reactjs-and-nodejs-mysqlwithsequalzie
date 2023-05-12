const { verify } = require("jsonwebtoken");
const { Comments, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize")

const getComments = async (req, res) => {
  const postid =req.query.postId;
  console.log(postid)
  try {
    const comment = await sequelize.query(
    

        `SELECT c.*, u.user_id AS userId, firstname, profilePic FROM comments
        AS c JOIN users AS u ON (u.user_id = c.comentUserId)
        WHERE c.postUserId = ${postid} ORDER BY c.createdAt DESC
        `
        ,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json(comment);
  } catch (err) {
    return res.json("something went wrong");
  }

  // const comments =    `SELECT  FROM comments As c
  //                  JOIN USERS AS u ON(u.user-id = p.userId)
  //                  where c.postUserId= ${postid} ORDER BY c.createdAt DESC`
};

const addComments = async (req, res) => {
    const token = req.cookies.accessToken

  if (!token) return res.json("user not logged in");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.json("authenticaton error");

    const com = {
      description: req.body.desc,
      comentUserId: userInfo.id,
      postUserId: req.body.postId,
    }
    try {
        await Comments.create(com)
        res.json("comment  Created succesfuly")
    } catch (err) {
      res.json("something went wrong");
    }
  });
};

const editComment = async () => {};

const deleteComment = async () => {};

module.exports = {
  deleteComment,
  addComments,
  getComments,
};
