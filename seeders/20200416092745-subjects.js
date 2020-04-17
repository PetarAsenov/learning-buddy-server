"use strict";

const Subject = require("../models").subject;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subjects = await Promise.all([
      Subject.upsert({
        name: "Maths",
        image_Url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqS8I4hGyaKHR0lTlNca90ltJWlE91D2aCxp5Of5Xa57mt0Ty8&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "Coding",
        image_Url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmGtOwX5zVvIccDNchsWjkTtzAC1F9wf3a2Nh-KkBRs7i0lFQj&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "English",
        image_Url: 'http://www.universum-ks.org/blog/wp-content/uploads/2017/05/English-1-800x434.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "Dutch",
        image_Url: 'https://images.pexels.com/photos/2166591/pexels-photo-2166591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subjects", null, {});
  },
};