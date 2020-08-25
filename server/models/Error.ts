export class ErrorHandler extends Error {
    statusCode: any;
    
    constructor(statusCode:any, message:any) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  module.exports = {
    ErrorHandler
  }