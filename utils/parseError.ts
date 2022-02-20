import { CustomError } from 'CustomTypes';

export function parseError(err: Error): CustomError {
  const message = err.message;
  try {
    const { type, details } = JSON.parse(message);
    return {
      type,
      details,
      message,
    };
  } catch (err2) {
    return {
      type: message,
      details: {},
      message,
    };
  }
}
