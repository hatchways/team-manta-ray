const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    // if error found return
    if (result.error) {
      console.log("Joi validation : ", result.error);

      return res.status(400).json({
        error: result.error.message,
      });
    }

    // create new value properties with validated values
    if (!req.validated) {
      req.validated = {};
    }

    req.validated["body"] = result.value;

    next();
  };
};

module.exports = { validateBody };
