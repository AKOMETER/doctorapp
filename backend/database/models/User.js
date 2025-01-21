const { DataTypes } = require("sequelize");
const sequelize = require("../index"); // Sequelize instance
const bcrypt = require("bcryptjs"); // Import bcrypt

// Define the User model
const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures it's a valid email
      },
    },
    googleID: DataTypes.STRING, // for Google authentication
    facebookID: DataTypes.STRING, // for Facebook authentication
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("Doctor", "Patient", "Labs"),
      defaultValue: "Patient",
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rememberToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional field
    },
    resetTokenExpiry: {
      type: DataTypes.DATE, // Use DATE type for Sequelize
      allowNull: true, // Optional field
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Before saving the user, hash the password if it has been modified
User.beforeSave(async (user, options) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
