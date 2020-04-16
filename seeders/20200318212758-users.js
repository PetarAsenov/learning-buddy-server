"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

/**
 * - importing the User model here to seed data
 * - that way createdAt and updatedAt are added for us
 */

const User = require("../models").user;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * using User.upsert & Promise.all to create users
     *
     * why:
     *
     * - allows us to run "npx sequelize-cli db:seed:all" multiple times
     * - without having to drop the database
     * - it also allows us to harcode the email and id we want
     * - we can now use these ids to seed related data in other seed files
     *
     * how .upsert works
     * - if a user with this email and id doesn't exist: create it
     * - if a user with this email and id does exist: update that user
     * - since we want to create multiple users this way we use Promise.all
     *
     * if you still get a: "ERROR: Validation error", while running this seed
     * - you might have a user with a different id that you're trying to give the same email
     * - you might have a user with a different email that you're trying to assign the same id
     *
     * how to solve the above error:
     *
     * - make sure the combination of id and email in this file are unique
     * - get rid of any duplicates by dropping the db, creating it again, migrating and seeding
     *
     * You can do this using:
     * npx sequelize-cli db:drop
     * npm run initdev (creates db, migrates & seeds)
     *
     */
    const users = await Promise.all([
      User.upsert({
        id:1,
        name: "testuser",
        email: "test@test.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I am a test teacher',
        // role: 'teacher'
      }),
      User.upsert({
        id:2,
        name: "dummy",
        email: "dummy@dummy.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I am a dummy teacher',
        // role: 'teacher'
      }),
      User.upsert({
        id:3,
        name: "Maths teacher",
        email: "math@math.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I am a maths teacher',
        // role: 'teacher'
      }),
      User.upsert({
        id:4,
        name: "Crazy kid",
        email: "kid@kid.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I have a lot of free time',
        // role: 'student'
      }),
      User.upsert({
        id:5,
        name: "Smart pupil",
        email: "pupil@pupil.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I am the smartest',
        // role: 'student'
      }),
      User.upsert({
        id:6,
        name: "Donald",
        email: "donald@donald.com",
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
        // image_Url: '',
        // description: 'I know everything',
        // role: 'student'
      })
    ]);

    console.log(`SEEDED: ${users.length} users`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
