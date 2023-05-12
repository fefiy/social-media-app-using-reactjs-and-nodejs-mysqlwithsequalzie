module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      description:{
        type: DataTypes.STRING,
        allowNull:false,
      }
       

     
    });
    return Comments;
  };
  