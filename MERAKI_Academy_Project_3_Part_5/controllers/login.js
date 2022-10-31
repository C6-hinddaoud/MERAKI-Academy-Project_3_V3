// This function checks user login credentials
const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
 const password=req.body.password
 const email= req.body.email.toLowerCase();
 const valuse=[email]
const query= `select * FROM USERS

WHERE email=$1`

/** `select * FROM USERS
INNER JOIN roles ON users.role_id = roles.id
WHERE email=$1` */

pool.query(query,valuse)

.then(async (result) => {
  console.log(result.rows[0])
  if (result.rows.length==0) {
    return res.status(404).json({
      success: false,
      message: `The email doesn't exist`,
    });
  }
  try {
    let p= result.rows[0].password
    const valid = await bcrypt.compare(password,p);
    if (!valid) {
      return res.status(403).json({
        success: false,
        message: `The password you’ve entered is incorrect`,
      });
    }
    const payload = {
      userId: result.rows[0].id,
      
      role: result.rows[0].role_id,
      country: result.rows[0].country,
    };
console.log("PA",payload)
    const options = {
      expiresIn: "60m",
    };
    const token = await jwt.sign(payload, process.env.SECRET, options);
    res.status(200).json({
      success: true,
      message: `Valid login credentials`,
      userId:result.rows[0].id,
      token: token,
      
    });
  } catch (error) {
    throw new Error(error.message);
  }
})
.catch((err) => {
  res.status(500).json({
    success: false,
    message: `Server Error`,
    err: err.message,
  });
});



};

module.exports = {
  login,
};
