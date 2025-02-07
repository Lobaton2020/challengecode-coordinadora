export class Result {
  static ok(data: any) {
    return {
      is_error: false,
      data,
    };
  }
}
