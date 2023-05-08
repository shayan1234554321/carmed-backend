const validate = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
  
      if (!authorization) {
        const error = new Error("Not authorized");
        error.status = 401;
        error.code = "not_authorized";
        throw error;
      }
    next();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  validate
}