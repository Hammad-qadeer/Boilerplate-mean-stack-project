const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models"); // assuming we have User and Role models defined
const User = db.user;
const Role = db.role;
const { sequelize } = require("../models/index.js")

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    const rolesQuery = `SELECT * FROM activities 
    JOIN role_activities as ra ON activities.id = ra.activity_id
    JOIN user_roles as ur ON ra.role_id = ur.role_id
    WHERE ur.user_id =${user.id}`;

    const activities = await sequelize.query(rolesQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(activities)
    
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      activities,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
  };
