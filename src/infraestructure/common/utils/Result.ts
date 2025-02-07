export class Result {
  static ok(data: any) {
    return {
      isError: false,
      data,
    };
  }
}
