export function generateNumericPassword(length: number): string {
  let result = "";
  const numbers = "0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    result += numbers.charAt(randomIndex);
  }

  return result;
}

export function generateArrayNumericPasswords(
  count: number,
  length: number
): string[] {
  let arrayPasswords: string[] = [];
  for (let i = 0; i < count; i++) {
    arrayPasswords.push(generateNumericPassword(length));
  }
  return arrayPasswords;
}
