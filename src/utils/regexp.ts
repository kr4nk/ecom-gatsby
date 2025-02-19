export function emailRegexp (string: string): boolean {
  return /\S+@\S+\.\S+/
    .test(string)
}

export function testPass (string: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/
    .test(string)
}

export function testPassForLowerCase (string: string): boolean {
  return /(?=.*[a-z])/
    .test(string)
}

export function testPassForCapital (string: string): boolean {
  return /(?=.*[A-Z])/
    .test(string)
}

export function testPassForNumber (string: string): boolean {
  return /(?=.*\d)/
    .test(string)
}
/*
export function testPassForSpecialSymbol (string: string) {
  return /(?=.*[!@#$%^&*"'?.>,<~`+=)\\(}{\][|/]+)/
    .test(string)
}
*/
export function phoneRegexp (string: string): boolean {
  return /^\+\d+/
    .test(string)
}
