const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    let statusCode = err.statusCode || 500;
  
    let message = err.message || "Internal Server Error";
  
    // Invalid Mongo ObjectId
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID";
    }
  
    // Duplicate Email
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate value entered";
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  export default errorHandler;