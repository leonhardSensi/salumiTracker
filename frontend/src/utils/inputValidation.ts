export function inputMatch(input1: string, input2: string) {
  return input1 === input2;
}

export function validatePasswordLength(input: string) {
  if (input.length === 0) {
    return false;
  }
  return input.length >= 8;
}
