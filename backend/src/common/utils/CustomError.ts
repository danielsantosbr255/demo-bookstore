class CustomError extends Error {
  constructor(
    public override message: string,
    public statusCode: number
  ) {
    super();
  }
}

export default CustomError;
