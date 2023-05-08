module.exports.parseJoiError = ({ error, value }) => {
    if (error) {
      const { details } = error;
      const data = {};
      const message = details
        .map((i) => {
          i.message = i.message.replace(/['"]/g, "");
          data[i.context.key] = i.message;
          return i.message;
        })
        .join(",");
  
      let err = new Error(message);
      err.status = 405;
      throw err;
    }
    return value;
  };