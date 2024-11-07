// const {constants} = require('../constants');

const errorHandler = (err,req,res,next) => {
        const statusCode = res.statusCode? res.statusCode : 500;

        const response = {
            message: err.message,
            stackTrace: err.stack
        };

        switch (statusCode) {
            case 400:
                response.title = "Validation Failed";
                break;
            case 404:
                response.title = "Page Not Found";
                break;
            case 403:
                response.title = "Page Forbidden";
                break;
            case 500:
                response.title = "Host Server Error";
                break;
            default:
                response.title = "Error";
                break;
        }
    
        res.status(statusCode).json(response);
    };


module.exports = errorHandler