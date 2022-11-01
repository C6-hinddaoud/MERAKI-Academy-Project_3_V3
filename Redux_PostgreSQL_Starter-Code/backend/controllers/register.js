const pool = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  const data = [
    firstName,
    lastName,
    age,
    country,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Account Created Successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    });
};

module.exports = {
  register,
};
