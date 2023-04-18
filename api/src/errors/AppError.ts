export default class AppError{
    statusCode: number
    message: string
    data: any
  
    constructor(statusCode = 400, message: string, data = {}){
      this.message = message
      this.statusCode = statusCode
      this.data = data
    }
  }