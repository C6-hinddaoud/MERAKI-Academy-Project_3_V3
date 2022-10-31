const { pool } = require("../models/db");


const createpermissions = (req, res) => {

    //const userId = req.token.userId;
   
     const{permission}=req.body
     values=[permission]
     const query=`INSERT INTO permissions(permission)VALUES($1) returning *`
   
   //console.log(userId)
   //res.json(userId)
   
   pool.query(query,values)
   
   .then((permissions) => {
     res.status(201).json({
       success: true,
       message: `permissions created`,
       permissions: permissions.rows,
     });
   })
   .catch((err) => {
     res.status(500).json({
       success: false,
       message: `Server Error`,
       err: err.message,
     });
   });
   
   };

   module.exports={createpermissions}