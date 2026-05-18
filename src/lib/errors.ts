export type StatusCode = 'UNAUTHORIZED' | 'BAD REQUEST' | 'OK';

export interface IApiResponse<T> {
  success: boolean;
  error: string | null;
  data: T;
  code: StatusCode;
}

export class AppError {
  static unauthorized(): IApiResponse<null> {
    return {
      success: false,
      error: 'Вход не выполнен',
      data: null,
      code: 'UNAUTHORIZED',
    };
  }
  static updateError(): IApiResponse<null> {
    return {
      success: false,
      error: 'Ошибка при обновлении',
      data: null,
      code: 'BAD REQUEST',
    };
  }
  static createError(): IApiResponse<null> {
    return {
      success: false,
      error: 'Ошибка при создании',
      data: null,
      code: 'BAD REQUEST',
    };
  }
  static deleteError(): IApiResponse<null> {
    return {
      success: false,
      error: 'Ошибка при удалении',
      data: null,
      code: 'BAD REQUEST',
    };
  }
  static readError(): IApiResponse<null> {
    return {
      success: false,
      error: 'Ошибка при чтении',
      data: null,
      code: 'BAD REQUEST',
    };
  }
}

export class AppSuccess {
  static success<T>(data: T): IApiResponse<T> {
    return { success: true, error: null, data: data, code: 'OK' };
  }
}
