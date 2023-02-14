interface requestOptions {
  header?: object
  dataType?: string
  responseType?: string
  timeout?: number
}

class Request {
  private readonly options: requestOptions

  constructor() {
    this.options = {
      header: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      responseType: 'text',
      timeout: 60000
    }
  }

  public get(url: string, data?: object, options?: requestOptions) {
    const config = {
      ...this.options,
      url,
      data,
      method: 'GET',
      ...options
    }
    this.request(config as UniApp.RequestOptions)
  }

  public post(url: string, data: object, options?: requestOptions) {
    const config = {
      ...this.options,
      url,
      data,
      method: 'POST',
      ...options
    }
    this.request(config as UniApp.RequestOptions)
  }

  private request(config: UniApp.RequestOptions) {
    uni.request(config)
  }
}

const request = new Request()

export default request
