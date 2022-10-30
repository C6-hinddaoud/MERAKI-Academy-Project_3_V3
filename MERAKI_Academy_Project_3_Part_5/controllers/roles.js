// This function creates new role
const { pool } = require("../models/db");
const createNewRole = (req, res) => {
  const {role}=req.body
  values=[role]
  
  const query=`INSERT INTO roles(role)VALUES($1) returning *`
  pool.query(query,values)
  .then((result)=>{
res.status(201)
res.json({
  success: true,
  massage: "Success role created",
  role: result.rows//[{role:role,id:result.id}]
})

  })
  .catch((err)=>{
res.status(500)
res.json({
  success: false,
massage: "Server error"
})
   

  })
};

// This function creates new permission
const createNewPermission = (req, res) => {
  //TODO: write your code here
};

// This function creates new role permission
const createNewRolePermission = (req, res) => {
  //TODO: write your code here
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
