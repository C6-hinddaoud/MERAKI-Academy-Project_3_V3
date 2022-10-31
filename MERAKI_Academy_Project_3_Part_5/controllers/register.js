// This function creates (new user)
const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const register =async (req, res) => {
  const{firstName,lastName,age,country,email,role_id,password}=req.body
  let pass=await bcrypt.hash(password, 10);
  let emailLoer=email.toLowerCase();
const values=[firstName,lastName,age,country,emailLoer,role_id,pass]
 
  const query=`INSERT INTO users (firstName,lastName,age,country,email,role_id,password)VALUES($1,$2,$3,$4,$5,$6,$7) returning *`

  pool.query(query,values)
  .then((result)=>{
res.status(201)
res.json({
  success: true,
  massage: "true",
  userinfo: result.rows
})

  })
  .catch((err)=>{
res.status(409)
res.json({
  success: false,
massage: "The email already exists"
})
  })
};
/**
 * If email exist

Status code: 409
Return an object with 2 keys:
success: false
message: "The email already exists"
If email doesn't exist

Status code: 201
Return an object with 2 keys:
success: true
message: "Account Created Successfully"
 */
module.exports = {
  register,
};
