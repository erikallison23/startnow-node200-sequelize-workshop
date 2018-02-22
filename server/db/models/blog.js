'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    article: DataTypes.TEXT,
    featured: DataTypes.BOOLEAN,
    published: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Blog;
};