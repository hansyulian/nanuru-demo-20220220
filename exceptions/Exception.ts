export class Exception extends Error {
  public type: string;
  public details: any;

  constructor(type: string, details: any = {}) {
    super(
      JSON.stringify({
        type,
        details,
      }),
    );
    this.type = type;
    this.details = details;
  }

  public toObject(): any {
    return JSON.parse(this.message);
  }
}