module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img : {
      type: DataTypes.STRING,
      allowNull: true,
    },
        
  });
  return Posts;
};
