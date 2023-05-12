module.exports = (sequelize, DataTypes) => {
    const Stories = sequelize.define("Stories", {
      img : {
        type: DataTypes.STRING,
        allowNull: true,
      },
          
    });
    return Stories;
  };
  