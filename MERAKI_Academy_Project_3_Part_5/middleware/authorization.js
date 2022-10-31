// This function checks if the user has a permission the passed permission

const authorization = (string) => {

  return (req, res, next) => {
    console.log("m",req.token.userId)
     console.log("m",req.token.role)
     // console.log("m",req.token.role.permissions)
    // if (!req.token.role_id.permissions.includes(string)) {
    //   console.log(req.token)
    //   console.log(req.token.role)
    //   console.log(req.token.role.permissions)
    //   return res.status(403).json({
    //     success: false,
    //     message: `Unauthorized`,
    //   });
    // }
    next();
  };

  };

module.exports = authorization;
