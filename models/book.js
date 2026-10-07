"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      //model columns
      //set type of value of the column, they cant be empty, and show a validation msg to not be empty
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "title cannot be empty!" } },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "author cannot be empty!" } },
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "genre cannot be empty" } },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: { msg: "year cannot be empty" } },
      },
    },
    {
      sequelize,
      modelName: "Book",
    },
  );
  return Book;
};
