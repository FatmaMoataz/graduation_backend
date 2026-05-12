export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const input = req[property] ?? {};
    const { error } = schema.validate(input, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};