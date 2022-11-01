const pool = require("../models/db");

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;
  const data = [role];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Success role created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    });
};

const createNewPermission = (req, res) => {
  const { permission } = req.body;
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
  const data = [permission];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Success permission created`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
const createNewRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  const query = `INSERT INTO role_permission (role_id,
    permission_id) VALUES ($1,$2) RETURNING *`;
  const data = [role_id, permission_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Success role_permission created`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
