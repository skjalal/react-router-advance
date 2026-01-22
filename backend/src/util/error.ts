export class NotFoundError {
  constructor(
    public readonly message: string,
    public readonly status: number = 404,
  ) {}
}

export class NotAuthError {
  constructor(
    public readonly message: string,
    public readonly status: number = 401,
  ) {}
}
