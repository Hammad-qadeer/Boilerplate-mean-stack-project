const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models"); // assuming we have User and Role models defined
const User = db.user;
const Role = db.role;
const { sequelize } = require("../models/index.js");

exports.signin = async (req, res) => {
  try {
    // const isAdminRole = req.body.role
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

    const rolesQuery = `SELECT *
    FROM activities a
    JOIN role_activities ra ON a.id = ra.activity_id
    JOIN user_roles ur ON ra.role_id = ur.role_id
    WHERE ur.user_id = ${user.id}
    AND ((ra.can_create = true) OR (ra.can_read = true) OR (ra.can_update = true) OR (ra.can_delete = true));`;

    const adminQuery = `SELECT *, 1 as can_create, 1 as can_read, 1 as can_update, 1 as can_delete FROM activities;`;

    const authoritiesQuery = `SELECT roles.id, roles.name, user_roles.role_id 
    AS 'role_id', user_roles.user_id AS 'user_id' 
    FROM roles INNER JOIN user_roles 
    ON roles.id = user_roles.role_id AND user_roles.user_id = ${user.id}`


    const role_query =`SELECT roles.id, roles.name, user_roles.role_id 
    AS 'role_id', user_roles.user_id AS 'user_id' 
    FROM roles INNER JOIN user_roles 
    ON roles.id = user_roles.role_id AND user_roles.user_id = ${user.id}`

    const role_query_result = await sequelize.query(role_query, {
      type: sequelize.QueryTypes.SELECT,
    });
    
    const activities = await sequelize.query(role_query_result[0].name === 'ADMIN' ? adminQuery : rolesQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    const authorities = await sequelize.query(authoritiesQuery, {
      type: sequelize.QueryTypes.SELECT,
    });


    return res.status(200).send({
      id: user.id,
      isActive: user.active,
      username: user.username,
      email: user.email,
      activities,
      role: authorities,
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
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
