type DefaultResponse = ResponseProps & {
  status: boolean
}

type ResponseProps = {
  message: string
  data?: any
}

class ResponseService {
  response({ status, message, data }: DefaultResponse): DefaultResponse {
    return {
      status,
      message,
      data,
    }
  }

  success(data: ResponseProps): DefaultResponse {
    return this.response({
      status: true,
      ...data,
    })
  }

  failure(data: ResponseProps): DefaultResponse {
    return this.response({
      status: false,
      ...data,
    })
  }
}

export default new ResponseService()
