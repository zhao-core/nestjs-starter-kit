/**
 * @description 通用返回值封装，统一Http返回信息，方便统一处理。
 */
class Result extends Map<string, any> {
  // 基础返回值封装
  constructor() {
    super();
    this.set('code', 0);
    this.set('message', 'success');
    this.set('data', {});
  }

  // 封装失败返回函数
  private static errorFunc = (
    code: number | string,
    message: string,
  ): Result => {
    const r = new Result();
    r.set('code', code);
    r.set('message', message);
    return r;
  };

  /**
   * 失败返回值重载封装。
   * @param code number/string 当POJO内部传输是可当做type使用，HttpResult为请求状态码。
   * @param message POJO/HttpResult 中均为错误信息
   */
  static error(
    code?: number | string | undefined,
    message?: string | any | undefined,
  ): Result {
    if (typeof code === 'undefined' && typeof message === 'undefined')
      return this.errorFunc(
        5000,
        'Unknown exception, please contact the system administrator for more details about this issue, and we apologize that you are experiencing difficulties with our services at the moment.',
      );
    if (typeof code === 'undefined' && typeof message !== 'undefined')
      return this.errorFunc(5000, message.message ? message.message : message);
    if (typeof code !== 'undefined' && typeof message === 'undefined')
      return this.errorFunc(code, '');
    if (typeof code !== 'undefined' && typeof message !== 'undefined')
      return this.errorFunc(code, message.message ? message.message : message);
    return this.errorFunc(500, '');
  }

  // 成功返回值重载封装
  static ok = (data?: any): Result => {
    const r: Result = new Result();
    if (typeof data !== 'undefined') r.set('data', data);
    return r;
  };

  // 获取返回值code
  public getErrCode() {
    return this.get('code');
  }

  // 格式化返回值
  public transformHttpReturnResult() {
    return {
      code: this.get('code'),
      message: this.get('message'),
      data: this.get('data'),
      timestamp: Date.now(),
    };
  }

  override set(key: string, value: any): this {
    super.set(key, value);
    return this;
  }
}

export { Result };
