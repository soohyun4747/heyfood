type AnyObject = Record<string, any>;

export function cleanObject<T extends AnyObject>(input: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in input) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) continue;

    const value = input[key];

    // 값이 undefined, null, 빈 문자열, 빈 배열, NaN일 경우 제외
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'number' && isNaN(value));

    if (!isEmpty) {
      result[key] = value;
    }
  }

  return result;
}
