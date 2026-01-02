export class NotFoundError {
  constructor(
    public readonly message: string,
    public readonly status: number = 404
  ) {}
}
