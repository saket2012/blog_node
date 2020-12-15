module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      displayName: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Users;
  };