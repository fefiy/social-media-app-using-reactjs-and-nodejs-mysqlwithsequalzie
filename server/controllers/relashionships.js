const { Relationships, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const getRelationships = async (req, res) => {
  console.log("Relationshiips is working");
  // i want to follow or unfoolow I have users id  // (flowwer ) //

  try {
    // const like = await  Likes.findAll({ where: { postId: postid  }}) // tocount how many likes that the ppost get
    const relationships = await sequelize.query(
      `SELECT followerUserId FROM relationships WHERE followedUserId = ${req.query.followedUserId}`,
      { type: QueryTypes.SELECT }
    );
    console.log(relationships);
    res.status(200).json(relationships.map((rel) => rel.followerUserId));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
  // const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ${req.query.followedUserId}`;

  // console.log(postid);
  // sequelize.query(q, (err, data) => {
  //   console.log(data)
  //   if (err) return res.status(500).json(err);
  //   return res.status(200).json(data.map(relationship=>relationship.followerUserId));
  // });

  //  try{
  //  const relationships =  await Relationships.findAll({ where:{followedUserId: req.query.followedUserId }, attributes:[followerUserId]})
  //  console.log(relationships)
  //  return res.status(200).json(relationships.map(rele=> rele.followerUserId))
  //   }catch(err){
  //     return res.status(500).json(err)
  //   }
};

const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(500).json("Token is invalid");

    // the follower user id is we get it form the query
    // our user id we get it from the userinfo

    const rel = {
      followerUserId: userInfo.id,
      followedUserId: req.query.userId,
    };
    try {
      await Relationships.create(rel);
      return res.json("you succesfuly folowed");
    } catch (err) {
      return res.json(err);
    }
  });
};

const deleteRelationships = (req, res) => {
  console.log("delete realtionship is working");
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(500).json("Token is invalid");
    // followed userid
    try {
      await Relationships.destroy({
        where: {
          followerUserId: userInfo.id,
          followedUserId: req.query.userId,
        },
      });
      return res.status(200).json("unfollow");
    } catch (err) {
      return res.json(err);
    }
  });
};

module.exports = {
  getRelationships,
  addRelationships,
  deleteRelationships,
};
