const { Users, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const getUser = async (req, res) => {
  console.log("its WOrking");
  try {
    const user = await Users.findOne({ where: { user_id: req.params.userId } });
    const sended = {
      userName: user.userName,
      profilePic: user.profilePic,
      email: user.email,
      firstname: user.firstname,
      city: user.city,
      coverPic: user.coverPic,
      website: user.website,
      id: user.user_id,
    };

    return res.status(200).json(sended);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  const accepted =  [
   req.body.name,
   req.body.city,
   req.body.website,
   req.body.coverPic,
   req.body.profilePic,
 ]

 console.log(accepted)
  if (!token) return res.status(404).json("not authenticated");
  console.log("update user is working");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//    if (err) return res.status(403).json("Token is not valid!");

//    const q =  `UPDATE  users SET firstname=${req.body.name}, city=${req.body.city}, website=${req.body.website}, profilePic= ${req.body.profilePic},coverPic= ${req.body.coverPic} WHERE user_id=${userInfo.id}`
//    sequelize.query(
//      q,
//      (err, data) => {
//        if (err) res.status(500).json(err);
//        if (data.affectedRows > 0) return res.json("Updated!");
//        return res.status(403).json("You can update only your post!");
//      }
//    );
//  });
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.json("invalid token");
    try {
      await sequelize.query(
        `UPDATE  users SET firstname=${req.body.name}, city=${req.body.city}, website=${req.body.website}, profilePic= ${req.body.profilePic},coverPic= ${req.body.coverPic} WHERE user_id=${userInfo.id}`,
      //   { type: QueryTypes.UPDATE }
      );
      return res.status(201).json("successfuly updated")
    } catch (err) {
      return res.json(err); 
    }

    //  "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

    // try{
    //   await  Users.update(
    //    {
    //       firstname:req.body.name,
    //       city: req.body.city,
    //       website: req.body.website,
    //       profilePic: req.body.profilePic,
    //       coverPic: req.body.coverPic

    //    },
    //    {
    //       where:{user_id: userInfo.id}
    //    }
    //  )
    //  return res.status(200).json("updated sucessfuly")
   // }catch(err){
    //  return res.status(500).json(err)
   // }
  });
};

module.exports = {
  getUser,
  updateUser,
};
